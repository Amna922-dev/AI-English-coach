import { useEffect, useState } from "react"

function ReadingPractice({ aiResult, level, onNewQuiz }) {
  const [quiz, setQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!aiResult) {
      setQuiz(null)
      setError("")
      return
    }

    try {
      const text = String(aiResult)
        .replace(/\r/g, "")
        .trim()

      // =========================
      // PASSAGE
      // =========================

      const passageMatch = text.match(
        /PASSAGE:\s*([\s\S]*?)(?=\n\s*QUESTION\s*1:)/i
      )

      if (!passageMatch) {
        throw new Error("Passage not found")
      }

      const passage = passageMatch[1].trim()

      // =========================
      // QUESTIONS
      // =========================

      const questionMatches = [
        ...text.matchAll(
          /QUESTION\s*(\d+):\s*([\s\S]*?)(?=\n\s*QUESTION\s*\d+:|\s*$)/gi
        ),
      ]

      if (questionMatches.length < 5) {
        throw new Error(
          `Expected 5 questions but found ${questionMatches.length}`
        )
      }

      const questions = questionMatches.slice(0, 5).map((match) => {
        const block = match[2].trim()

        // Question text
        const questionMatch = block.match(
          /^([\s\S]*?)(?=\n\s*A:\s*)/i
        )

        // Options
        const optionA = block.match(
          /(?:^|\n)\s*A:\s*(.*?)(?=\n\s*B:\s*)/is
        )

        const optionB = block.match(
          /(?:^|\n)\s*B:\s*(.*?)(?=\n\s*C:\s*)/is
        )

        const optionC = block.match(
          /(?:^|\n)\s*C:\s*(.*?)(?=\n\s*D:\s*)/is
        )

        const optionD = block.match(
          /(?:^|\n)\s*D:\s*(.*?)(?=\n\s*ANSWER:\s*)/is
        )

        // Correct answer
        const answerMatch = block.match(
          /ANSWER:\s*([ABCD])/i
        )

        // Explanation
        const explanationMatch = block.match(
          /EXPLANATION:\s*([\s\S]*)$/i
        )

        if (
          !questionMatch ||
          !optionA ||
          !optionB ||
          !optionC ||
          !optionD ||
          !answerMatch
        ) {
          throw new Error(
            `Question ${match[1]} format is incomplete`
          )
        }

        return {
          question: questionMatch[1].trim(),

          options: {
            A: optionA[1].trim(),
            B: optionB[1].trim(),
            C: optionC[1].trim(),
            D: optionD[1].trim(),
          },

          correctAnswer: answerMatch[1].toUpperCase(),

          explanation: explanationMatch
            ? explanationMatch[1].trim()
            : "This answer is supported by the reading passage.",
        }
      })

      // =========================
      // SAVE QUIZ
      // =========================

      setQuiz({
        passage,
        questions,
      })

      setCurrentQuestion(0)
      setAnswers({})
      setSubmitted(false)
      setError("")
    } catch (err) {
      console.error("Reading parser error:", err)
      console.log("AI Result:", aiResult)

      setQuiz(null)

      setError(
        "The AI exercise was generated, but the quiz format could not be read correctly."
      )
    }
  }, [aiResult])

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8">

        <div className="text-4xl mb-4">
          ⚠️
        </div>

        <h3 className="text-xl font-bold text-red-700">
          Unable to prepare the quiz
        </h3>

        <p className="text-red-600 mt-2">
          {error}
        </p>

      </div>
    )
  }

  if (!quiz) {
    return null
  }

  const question = quiz.questions[currentQuestion]

  const totalQuestions = quiz.questions.length

  const selectedAnswer = answers[currentQuestion]

  // =========================
  // ANSWER
  // =========================

  const handleAnswer = (option) => {
    if (submitted) {
      return
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: option,
    }))
  }

  // =========================
  // NEXT
  // =========================

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(
        (previous) => previous + 1
      )
    }
  }

  // =========================
  // PREVIOUS
  // =========================

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) => previous - 1
      )
    }
  }

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = () => {
    setSubmitted(true)
  }

  // =========================
  // TRY AGAIN
  // =========================

  const handleTryAgain = () => {
    setQuiz(null)
    setCurrentQuestion(0)
    setAnswers({})
    setSubmitted(false)
    setError("")

    if (onNewQuiz) {
      onNewQuiz()
    }
  }

  // =========================
  // SCORE
  // =========================

  const score = quiz.questions.reduce(
    (total, item, index) => {
      return (
        total +
        (answers[index] === item.correctAnswer ? 1 : 0)
      )
    },
    0
  )

  // =========================
  // RESULT SCREEN
  // =========================

  if (submitted) {
    return (
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            🎉
          </div>

          <p className="text-sm text-blue-600 font-semibold">
            Reading Practice Complete
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            Your Score: {score} / {totalQuestions}
          </h2>

          <p className="text-slate-500 mt-2">
            Level: {level}
          </p>

        </div>

        {/* Answer Review */}

        <div className="space-y-6">

          {quiz.questions.map((item, index) => {

            const userAnswer = answers[index]

            const isCorrect =
              userAnswer === item.correctAnswer

            return (
              <div
                key={index}
                className={`rounded-xl border p-5 ${
                  isCorrect
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >

                <div className="flex items-start gap-3">

                  <span className="font-bold text-slate-700">
                    {index + 1}.
                  </span>

                  <p className="font-semibold text-slate-800">
                    {item.question}
                  </p>

                </div>

                <div className="mt-3 text-sm">

                  <p>
                    <span className="font-semibold">
                      Your answer:
                    </span>{" "}

                    {userAnswer
                      ? `${userAnswer}. ${item.options[userAnswer]}`
                      : "Not answered"}
                  </p>

                  <p className="mt-1">

                    <span className="font-semibold">
                      Correct answer:
                    </span>{" "}

                    {item.correctAnswer}.{" "}
                    {item.options[item.correctAnswer]}

                  </p>

                  <p className="mt-2 text-slate-600">

                    <span className="font-semibold">
                      Explanation:
                    </span>{" "}

                    {item.explanation}

                  </p>

                </div>

              </div>
            )
          })}

        </div>

        {/* Try Again */}

        <div className="mt-8 text-center">

          <button
            onClick={handleTryAgain}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Try Again
          </button>

        </div>

      </section>
    )
  }

  // =========================
  // QUIZ SCREEN
  // =========================

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

      {/* Header */}

      <div className="mb-8">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-blue-600 font-semibold">
              AI Reading Practice
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-1">
              Reading Comprehension
            </h2>

          </div>

          <div className="text-4xl">
            📖
          </div>

        </div>

        {/* Progress */}

        <div className="mt-5 flex items-center justify-between text-sm">

          <span className="text-slate-500">

            Level:{" "}

            <strong className="text-blue-600">
              {level}
            </strong>

          </span>

          <span className="font-semibold text-slate-700">

            Question {currentQuestion + 1} /{" "}
            {totalQuestions}

          </span>

        </div>

        <div className="w-full bg-slate-200 rounded-full h-2 mt-3">

          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{
              width: `${
                ((currentQuestion + 1) /
                  totalQuestions) *
                100
              }%`,
            }}
          />

        </div>

      </div>

      {/* Passage */}

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">

        <h3 className="text-lg font-bold text-slate-800 mb-3">
          Reading Passage
        </h3>

        <p className="text-slate-700 leading-8 whitespace-pre-line">
          {quiz.passage}
        </p>

      </div>

      {/* Question */}

      <div>

        <h3 className="text-xl font-bold text-slate-800">
          {question.question}
        </h3>

        {/* Options */}

        <div className="mt-5 space-y-3">

          {Object.entries(question.options).map(
            ([letter, text]) => (

              <button
                key={letter}
                onClick={() =>
                  handleAnswer(letter)
                }
                className={`w-full text-left p-4 rounded-xl border-2 transition ${
                  selectedAnswer === letter
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                }`}
              >

                <span className="font-bold text-blue-600 mr-3">
                  {letter}.
                </span>

                <span className="text-slate-700">
                  {text}
                </span>

              </button>

            )
          )}

        </div>

      </div>

      {/* Navigation */}

      <div className="mt-8 flex items-center justify-between">

        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`px-5 py-3 rounded-xl font-semibold ${
            currentQuestion === 0
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
          }`}
        >
          ← Previous
        </button>

        {currentQuestion < totalQuestions - 1 ? (

          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`px-6 py-3 rounded-xl font-semibold ${
              !selectedAnswer
                ? "bg-blue-200 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next Question →
          </button>

        ) : (

          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`px-6 py-3 rounded-xl font-semibold ${
              !selectedAnswer
                ? "bg-green-200 text-white cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Submit Quiz ✓
          </button>

        )}

      </div>

    </section>
  )
}

export default ReadingPractice