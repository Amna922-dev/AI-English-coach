import { useEffect, useState } from "react"

function GrammarPractice({
  aiResult,
  level,
  onNewQuiz,
}) {
  const [grammar, setGrammar] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  // ==========================================
  // PARSE AI GRAMMAR RESULT
  // ==========================================

  useEffect(() => {
    if (!aiResult) {
      setGrammar(null)
      setSelectedAnswer("")
      setSubmitted(false)
      setError("")
      return
    }

    try {
      const text = String(aiResult)
        .replace(/\r/g, "")
        .trim()

      const getField = (label, nextLabels) => {
        const escapedLabels = nextLabels
          .map((item) =>
            item.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&"
            )
          )
          .join("|")

        const regex = new RegExp(
          `${label}:\\s*([\\s\\S]*?)(?=\\n(?:${escapedLabels}):|$)`,
          "i"
        )

        const match = text.match(regex)

        return match
          ? match[1].trim()
          : ""
      }

      const topic = getField("TOPIC", [
        "RULE",
        "QUESTION",
      ])

      const rule = getField("RULE", [
        "QUESTION",
      ])

      const question = getField("QUESTION", [
        "A",
        "B",
        "C",
        "D",
        "ANSWER",
        "EXPLANATION",
      ])

      const optionA = getField("A", [
        "B",
        "C",
        "D",
        "ANSWER",
        "EXPLANATION",
      ])

      const optionB = getField("B", [
        "C",
        "D",
        "ANSWER",
        "EXPLANATION",
      ])

      const optionC = getField("C", [
        "D",
        "ANSWER",
        "EXPLANATION",
      ])

      const optionD = getField("D", [
        "ANSWER",
        "EXPLANATION",
      ])

      const answerMatch = text.match(
        /ANSWER:\s*([ABCD])/i
      )

      const explanationMatch = text.match(
        /EXPLANATION:\s*([\s\S]*?)$/i
      )

      const answer = answerMatch
        ? answerMatch[1].toUpperCase()
        : ""

      const explanation = explanationMatch
        ? explanationMatch[1].trim()
        : ""

      if (
        !topic ||
        !rule ||
        !question ||
        !optionA ||
        !optionB ||
        !optionC ||
        !optionD ||
        !answer
      ) {
        throw new Error(
          "AI grammar format is incomplete."
        )
      }

      setGrammar({
        topic,
        rule,
        question,
        options: {
          A: optionA,
          B: optionB,
          C: optionC,
          D: optionD,
        },
        correctAnswer: answer,
        explanation,
      })

      setSelectedAnswer("")
      setSubmitted(false)
      setError("")
    } catch (err) {
      console.error(
        "Grammar parser error:",
        err
      )

      console.log(
        "AI Grammar Result:",
        aiResult
      )

      setGrammar(null)

      setError(
        "The AI grammar exercise was generated, but its format could not be read correctly."
      )
    }
  }, [aiResult])

  // ==========================================
  // SUBMIT ANSWER
  // ==========================================

  const handleSubmit = () => {
    if (!selectedAnswer) {
      return
    }

    setSubmitted(true)
  }

  // ==========================================
  // TRY AGAIN
  // ==========================================

  const handleTryAgain = () => {
    setSelectedAnswer("")
    setSubmitted(false)
    setGrammar(null)
    setError("")

    if (onNewQuiz) {
      onNewQuiz()
    }
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <section className="py-10">

        <div className="max-w-4xl mx-auto">

          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">

            <div className="text-4xl mb-4">
              ⚠️
            </div>

            <h2 className="text-2xl font-bold text-red-700">
              Unable to prepare grammar quiz
            </h2>

            <p className="text-red-600 mt-2">
              {error}
            </p>

            <button
              onClick={handleTryAgain}
              className="mt-5 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Generate New Quiz
            </button>

          </div>

        </div>

      </section>
    )
  }

  // ==========================================
  // NO RESULT
  // ==========================================

  if (!grammar) {
    return null
  }

  const isCorrect =
    selectedAnswer === grammar.correctAnswer

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="py-10">

      <div className="max-w-4xl mx-auto">

        {/* =====================================
            HEADER
        ====================================== */}

        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            📝
          </div>

          <h1 className="text-4xl font-bold text-slate-800">
            Grammar Practice
          </h1>

          <p className="mt-3 text-slate-500">
            Practice grammar and improve your sentence structure.
          </p>

        </div>


        {/* =====================================
            MAIN CARD
        ====================================== */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">


          {/* Header */}

          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-3">

              <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center text-2xl">
                ✏️
              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-800">
                  AI Grammar Practice
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Level:{" "}
                  <strong className="text-orange-600">
                    {level || "Beginner"}
                  </strong>
                </p>

              </div>

            </div>

            <div className="text-3xl">
              🤖
            </div>

          </div>


          {/* =====================================
              GRAMMAR TOPIC
          ====================================== */}

          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">

            <p className="text-sm font-semibold text-orange-700">
              Grammar Topic
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mt-2">
              {grammar.topic}
            </h3>

          </div>


          {/* =====================================
              GRAMMAR RULE
          ====================================== */}

          <div className="mt-5 bg-slate-50 border border-slate-200 rounded-xl p-5">

            <p className="font-semibold text-slate-800">
              📖 Grammar Rule
            </p>

            <p className="text-slate-600 mt-2 leading-7 whitespace-pre-line">
              {grammar.rule}
            </p>

          </div>


          {/* =====================================
              QUESTION
          ====================================== */}

          <div className="mt-8">

            <p className="text-sm font-semibold text-orange-600">
              Quick Grammar Check
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-2">
              {grammar.question}
            </h2>


            {/* Options */}

            <div className="mt-6 space-y-3">

              {Object.entries(
                grammar.options
              ).map(([letter, option]) => (

                <button
                  key={letter}
                  onClick={() => {

                    if (submitted) {
                      return
                    }

                    setSelectedAnswer(letter)
                    setSubmitted(false)
                  }}
                  disabled={submitted}
                  className={`w-full text-left p-4 rounded-xl border-2 transition ${
                    selectedAnswer === letter
                      ? "border-orange-600 bg-orange-50"
                      : "border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50"
                  } ${
                    submitted
                      ? "cursor-default"
                      : "cursor-pointer"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                        selectedAnswer === letter
                          ? "border-orange-600 bg-orange-100 text-orange-700"
                          : "border-slate-300 text-slate-500"
                      }`}
                    >
                      {letter}
                    </div>

                    <span className="text-slate-700">
                      {option}
                    </span>

                  </div>

                </button>

              ))}

            </div>


            {/* =================================
                SUBMIT
            ================================== */}

            {!submitted && (

              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className={`mt-6 px-7 py-3 rounded-xl font-semibold transition ${
                  selectedAnswer
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed"
                }`}
              >
                Submit Answer ✓
              </button>

            )}


            {/* =================================
                RESULT
            ================================== */}

            {submitted && (

              <div
                className={`mt-6 rounded-xl p-6 border ${
                  isCorrect
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >

                {isCorrect ? (

                  <>
                    <p className="text-green-700 text-xl font-bold">
                      ✓ Correct Answer!
                    </p>

                    <p className="text-green-600 mt-2">
                      Excellent! You selected the grammatically correct answer.
                    </p>

                    <p className="text-green-700 font-bold mt-3">
                      Score: 100%
                    </p>
                  </>

                ) : (

                  <>
                    <p className="text-red-700 text-xl font-bold">
                      ✗ Incorrect Answer
                    </p>

                    <p className="text-red-600 mt-2">
                      Review the grammar rule and explanation.
                    </p>

                    <p className="text-slate-700 mt-3">

                      <span className="font-semibold">
                        Correct answer:
                      </span>{" "}

                      {grammar.correctAnswer}.{" "}
                      {grammar.options[
                        grammar.correctAnswer
                      ]}

                    </p>
                  </>

                )}


                {/* Explanation */}

                {grammar.explanation && (

                  <div className="mt-4 bg-white rounded-xl p-4">

                    <p className="font-semibold text-slate-800">
                      Explanation
                    </p>

                    <p className="text-slate-600 mt-2">
                      {grammar.explanation}
                    </p>

                  </div>

                )}

              </div>

            )}


            {/* =================================
                NEW QUIZ
            ================================== */}

            {submitted && (

              <button
                onClick={handleTryAgain}
                className="mt-5 bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-900 transition"
              >
                Generate New Grammar Quiz 🔄
              </button>

            )}

          </div>

        </div>

      </div>

    </section>
  )
}

export default GrammarPractice