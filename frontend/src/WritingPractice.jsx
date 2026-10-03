import { useEffect, useState } from "react"

function WritingPractice({
  aiResult,
  level,
  onNewPractice,
}) {
  const [writing, setWriting] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const [task, setTask] = useState({
    title: "AI Writing Practice",
    topic: "",
    instructions: "",
    recommendedLength: "",
    focus: "",
  })

  // ==========================================
  // PARSE AI WRITING TASK
  // ==========================================

  useEffect(() => {
    if (!aiResult) {
      setTask({
        title: "AI Writing Practice",
        topic: "",
        instructions: "",
        recommendedLength: "",
        focus: "",
      })

      return
    }

    const text = String(aiResult)
      .replace(/\r/g, "")
      .trim()

    const getValue = (label) => {
      const regex = new RegExp(
        `${label}:\\s*([\\s\\S]*?)(?=\\n[A-Z][A-Z ]+:|$)`,
        "i"
      )

      const match = text.match(regex)

      return match ? match[1].trim() : ""
    }

    const title =
      getValue("TITLE") ||
      getValue("TOPIC TITLE") ||
      "AI Writing Practice"

    const topic =
      getValue("TOPIC") ||
      getValue("WRITING TOPIC") ||
      ""

    const instructions =
      getValue("INSTRUCTIONS") ||
      getValue("TASK") ||
      ""

    const recommendedLength =
      getValue("RECOMMENDED LENGTH") ||
      getValue("LENGTH") ||
      ""

    const focus =
      getValue("FOCUS") ||
      getValue("FOCUS ON") ||
      ""

    setTask({
      title,
      topic,
      instructions,
      recommendedLength,
      focus,
    })

    setWriting("")
    setSubmitted(false)
  }, [aiResult])

  // ==========================================
  // SUBMIT WRITING
  // ==========================================

  const handleSubmit = () => {
    if (!writing.trim()) {
      return
    }

    setSubmitted(true)
  }

  // ==========================================
  // TRY AGAIN
  // ==========================================

  const handleTryAgain = () => {
    setWriting("")
    setSubmitted(false)

    if (onNewPractice) {
      onNewPractice()
    }
  }

  // ==========================================
  // WORD COUNT
  // ==========================================

  const wordCount = writing.trim()
    ? writing.trim().split(/\s+/).length
    : 0

  // ==========================================
  // LEVEL BASED RECOMMENDED WORD COUNT
  // ==========================================

  const defaultMinimumWords =
    level === "Beginner"
      ? 30
      : level === "Intermediate"
      ? 80
      : 120

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
            ✍️
          </div>

          <h1 className="text-4xl font-bold text-slate-800">
            Writing Practice
          </h1>

          <p className="mt-3 text-slate-500">
            Practice writing with your AI English Coach.
          </p>

        </div>


        {/* =====================================
            MAIN CARD
        ====================================== */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">


          {/* Header */}

          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-3">

              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center text-2xl">
                📝
              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-800">
                  {task.title}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Level:{" "}
                  <strong className="text-purple-600">
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
              AI TOPIC
          ====================================== */}

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">

            <p className="text-sm font-semibold text-purple-700 mb-2">
              Your AI Writing Topic
            </p>

            <p className="text-xl font-semibold text-slate-800">
              {task.topic || "Write about the given topic."}
            </p>

          </div>


          {/* =====================================
              INSTRUCTIONS
          ====================================== */}

          {task.instructions && (

            <div className="mt-5 bg-slate-50 border border-slate-200 rounded-xl p-5">

              <p className="font-semibold text-slate-800">
                📌 Instructions
              </p>

              <p className="text-slate-600 mt-2 leading-7 whitespace-pre-line">
                {task.instructions}
              </p>

            </div>

          )}


          {/* =====================================
              RECOMMENDED LENGTH
          ====================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">

              <p className="text-sm font-semibold text-blue-700">
                Recommended Length
              </p>

              <p className="text-slate-700 mt-1">
                {task.recommendedLength ||
                  `${defaultMinimumWords}+ words`}
              </p>

            </div>


            {/* Focus */}

            <div className="bg-green-50 border border-green-100 rounded-xl p-4">

              <p className="text-sm font-semibold text-green-700">
                Focus On
              </p>

              <p className="text-slate-700 mt-1">
                {task.focus ||
                  "Grammar, vocabulary, and clear sentences"}
              </p>

            </div>

          </div>


          {/* =====================================
              WRITING AREA
          ====================================== */}

          <textarea
            value={writing}
            onChange={(e) => {
              setWriting(e.target.value)
              setSubmitted(false)
            }}
            placeholder="Start writing your answer here..."
            rows="10"
            className="w-full mt-6 px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-slate-700 leading-7"
          />


          {/* =====================================
              WORD COUNT
          ====================================== */}

          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-2">

            <span className="text-sm text-slate-500">
              Word count:{" "}
              <strong className="text-slate-700">
                {wordCount}
              </strong>
            </span>

            <span className="text-sm text-slate-400">
              Recommended: {defaultMinimumWords}+ words
            </span>

          </div>


          {/* =====================================
              SUBMIT BUTTON
          ====================================== */}

          <button
            onClick={handleSubmit}
            disabled={!writing.trim()}
            className={`mt-6 px-7 py-3 rounded-xl font-semibold transition ${
              writing.trim()
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            Submit Writing ✓
          </button>


          {/* =====================================
              SUBMITTED RESULT
          ====================================== */}

          {submitted && (

            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6">

              <div className="flex items-center gap-3">

                <div className="text-3xl">
                  🎉
                </div>

                <div>

                  <p className="text-green-700 text-xl font-bold">
                    Writing Submitted!
                  </p>

                  <p className="text-slate-600 mt-1">
                    You wrote{" "}
                    <strong>
                      {wordCount}
                    </strong>{" "}
                    words.
                  </p>

                </div>

              </div>


              {/* Basic feedback */}

              <div className="mt-5 bg-white rounded-xl p-5 border border-green-100">

                <p className="font-semibold text-slate-800">
                  Practice Feedback
                </p>

                <ul className="mt-3 space-y-2 text-slate-600">

                  <li>
                    ✓ Keep your sentences clear and easy to understand.
                  </li>

                  <li>
                    ✓ Check your grammar and punctuation.
                  </li>

                  <li>
                    ✓ Use suitable vocabulary for your level.
                  </li>

                  <li>
                    ✓ Organize your ideas into logical sentences.
                  </li>

                </ul>

              </div>


              {/* Score */}

              <div className="mt-5">

                <p className="text-purple-700 font-semibold">
                  Writing Practice Progress
                </p>

                <div className="w-full bg-slate-200 rounded-full h-3 mt-2">

                  <div
                    className="bg-purple-600 h-3 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        (wordCount / defaultMinimumWords) * 100,
                        100
                      )}%`,
                    }}
                  />

                </div>

                <p className="text-sm text-slate-500 mt-2">
                  {wordCount >= defaultMinimumWords
                    ? "Great! You reached the recommended length."
                    : `Try to reach at least ${defaultMinimumWords} words.`}
                </p>

              </div>


              {/* =================================
                  NEW AI WRITING TASK
              ================================== */}

              <button
                onClick={handleTryAgain}
                className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
              >
                Generate New Writing Task 🔄
              </button>

            </div>

          )}

        </div>

      </div>

    </section>
  )
}

export default WritingPractice