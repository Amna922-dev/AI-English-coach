import { useState } from "react"
import LevelSelection from "./LevelSelection"
import LearningDashboard from "./LearningDashboard"
import ReadingPractice from "./ReadingPractice"
import WritingPractice from "./WritingPractice"
import VocabularyPractice from "./VocabularyPractice"
import GrammarPractice from "./GrammarPractice"

function App() {
  const [selectedArea, setSelectedArea] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("Beginner")
  const [aiResult, setAiResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // ==========================================
  // GENERATE AI EXERCISE
  // ==========================================

  const generateExercise = async (area, level = selectedLevel) => {
    setAiResult("")
    setError("")
    setLoading(true)

    try {
      const sessionId = `${area}-${level}-${Date.now()}`

      const response = await fetch(
        "http://127.0.0.1:8001/generate-exercise",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            level: level,
            area: area,
            session_id: sessionId,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to generate AI exercise.")
      }

      const data = await response.json()

      if (!data.result) {
        throw new Error("No AI result received.")
      }

      setAiResult(data.result)
      setError("")
    } catch (err) {
      console.error("AI Exercise Error:", err)

      setAiResult("")
      setError(
        "Unable to generate the AI exercise. Please make sure the backend is running."
      )
    } finally {
      setLoading(false)
    }
  }

  // ==========================================
  // SELECT LEARNING AREA
  // ==========================================

  const handleSelectArea = async (area) => {
    setSelectedArea(area)
    setError("")
    setAiResult("")

    setTimeout(() => {
      document
        .getElementById("practice-section")
        ?.scrollIntoView({
          behavior: "smooth",
        })
    }, 100)

    await generateExercise(area, selectedLevel)
  }

  // ==========================================
  // CHANGE ENGLISH LEVEL
  // ==========================================

  const handleLevelChange = async (level) => {
    setSelectedLevel(level)
    setError("")
    setAiResult("")

    // If user has already selected Reading/Writing/
    // Vocabulary/Grammar, generate fresh exercise
    // for the newly selected level.
    if (selectedArea) {
      await generateExercise(selectedArea, level)
    }
  }

  // ==========================================
  // GENERATE NEW PRACTICE
  // ==========================================

  const handleNewPractice = async () => {
    if (!selectedArea) {
      return
    }

    setError("")
    setAiResult("")

    await generateExercise(
      selectedArea,
      selectedLevel
    )
  }

  // ==========================================
  // START LEARNING BUTTON
  // ==========================================

  const scrollToLevelSelection = () => {
    document
      .getElementById("level-selection")
      ?.scrollIntoView({
        behavior: "smooth",
      })
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================
          HEADER
      ====================================== */}

      <header className="bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-bold text-blue-600">
              AI English Coach
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Your personal AI-powered English learning platform
            </p>

          </div>

          <button
            onClick={scrollToLevelSelection}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Start Learning
          </button>

        </div>

      </header>


      {/* =====================================
          MAIN
      ====================================== */}

      <main className="max-w-7xl mx-auto px-6 py-10">


        {/* =====================================
            WELCOME SECTION
        ====================================== */}

        <section className="mb-10">

          <h2 className="text-3xl font-bold text-slate-800">
            Improve Your English 🚀
          </h2>

          <p className="text-slate-600 mt-2">
            Practice, learn, and grow with your AI English Coach.
          </p>

          <p className="text-sm text-blue-600 mt-3 font-medium">
            Current Level: {selectedLevel}
          </p>

        </section>


        {/* =====================================
            QUICK LEARNING AREAS
        ====================================== */}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Reading */}

          <button
            onClick={() => handleSelectArea("Reading")}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition text-left"
          >

            <div className="text-4xl mb-4">
              📖
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              Reading
            </h3>

            <p className="text-slate-500 mt-2">
              Improve your reading skills with AI-guided practice.
            </p>

            <div className="text-blue-600 font-semibold mt-4">
              Start Reading →
            </div>

          </button>


          {/* Writing */}

          <button
            onClick={() => handleSelectArea("Writing")}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition text-left"
          >

            <div className="text-4xl mb-4">
              ✍️
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              Writing
            </h3>

            <p className="text-slate-500 mt-2">
              Practice writing and receive intelligent feedback.
            </p>

            <div className="text-blue-600 font-semibold mt-4">
              Start Writing →
            </div>

          </button>


          {/* Vocabulary */}

          <button
            onClick={() => handleSelectArea("Vocabulary")}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition text-left"
          >

            <div className="text-4xl mb-4">
              📚
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              Vocabulary
            </h3>

            <p className="text-slate-500 mt-2">
              Learn useful words and build your vocabulary.
            </p>

            <div className="text-blue-600 font-semibold mt-4">
              Start Vocabulary →
            </div>

          </button>


          {/* Grammar */}

          <button
            onClick={() => handleSelectArea("Grammar")}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition text-left"
          >

            <div className="text-4xl mb-4">
              📝
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              Grammar
            </h3>

            <p className="text-slate-500 mt-2">
              Understand grammar through personalized exercises.
            </p>

            <div className="text-blue-600 font-semibold mt-4">
              Start Grammar →
            </div>

          </button>

        </section>


        {/* =====================================
            LEVEL SELECTION
        ====================================== */}

        <section
          id="level-selection"
          className="mt-10"
        >

          <LevelSelection
            selectedLevel={selectedLevel}
            onLevelChange={handleLevelChange}
          />

        </section>


        {/* =====================================
            LEARNING DASHBOARD
        ====================================== */}

        <section className="mt-10">

          <LearningDashboard
            onSelectArea={handleSelectArea}
          />

        </section>


        {/* =====================================
            AI PRACTICE SECTION
        ====================================== */}

        <section
          id="practice-section"
          className="mt-10"
        >


          {/* ===================================
              LOADING
          ==================================== */}

          {loading && (

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">

              <div className="text-5xl mb-4">
                🤖
              </div>

              <h3 className="text-xl font-semibold text-slate-800">
                AI is preparing your exercise...
              </h3>

              <p className="text-slate-500 mt-2">
                Creating a fresh {selectedLevel} level{" "}
                {selectedArea} practice.
              </p>

              <div className="mt-5 text-blue-600 font-medium">
                Please wait a moment...
              </div>

            </div>

          )}


          {/* ===================================
              ERROR
          ==================================== */}

          {!loading && error && (

            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">

              <div className="text-3xl mb-3">
                ⚠️
              </div>

              <h3 className="font-bold text-lg">
                Something went wrong
              </h3>

              <p className="mt-2">
                {error}
              </p>

              <button
                onClick={handleNewPractice}
                className="mt-5 bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Try Again
              </button>

            </div>

          )}


          {/* ===================================
              READING PRACTICE
          ==================================== */}

          {!loading &&
            !error &&
            selectedArea === "Reading" &&
            aiResult && (

              <ReadingPractice
                aiResult={aiResult}
                level={selectedLevel}
                onNewQuiz={handleNewPractice}
              />

            )}


          {/* ===================================
              WRITING PRACTICE
          ==================================== */}

          {!loading &&
            !error &&
            selectedArea === "Writing" &&
            aiResult && (

              <WritingPractice
                aiResult={aiResult}
                level={selectedLevel}
                onNewPractice={handleNewPractice}
              />

            )}


          {/* ===================================
              VOCABULARY PRACTICE
          ==================================== */}

          {!loading &&
            !error &&
            selectedArea === "Vocabulary" &&
            aiResult && (

              <VocabularyPractice
                aiResult={aiResult}
                level={selectedLevel}
                onNewQuiz={handleNewPractice}
              />

            )}


          {/* ===================================
              GRAMMAR PRACTICE
          ==================================== */}

          {!loading &&
            !error &&
            selectedArea === "Grammar" &&
            aiResult && (

              <GrammarPractice
                aiResult={aiResult}
                level={selectedLevel}
                onNewQuiz={handleNewPractice}
              />

            )}


          {/* ===================================
              INITIAL PRACTICE COMPONENTS
          ==================================== */}

          {!loading &&
            !error &&
            !aiResult &&
            selectedArea === "Reading" && (

              <ReadingPractice
                level={selectedLevel}
                onNewQuiz={handleNewPractice}
              />

            )}

          {!loading &&
            !error &&
            !aiResult &&
            selectedArea === "Writing" && (

              <WritingPractice
                level={selectedLevel}
                onNewPractice={handleNewPractice}
              />

            )}

          {!loading &&
            !error &&
            !aiResult &&
            selectedArea === "Vocabulary" && (

              <VocabularyPractice
                level={selectedLevel}
                onNewQuiz={handleNewPractice}
              />

            )}

          {!loading &&
            !error &&
            !aiResult &&
            selectedArea === "Grammar" && (

              <GrammarPractice
                level={selectedLevel}
                onNewQuiz={handleNewPractice}
              />

            )}

        </section>

      </main>

    </div>
  )
}

export default App