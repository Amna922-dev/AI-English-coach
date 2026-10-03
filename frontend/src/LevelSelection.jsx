import { useEffect, useState } from "react"

function LevelSelection({ selectedLevel, onLevelChange }) {
  const [currentLevel, setCurrentLevel] = useState(
    selectedLevel || "Beginner"
  )

  useEffect(() => {
    if (selectedLevel) {
      setCurrentLevel(selectedLevel)
    }
  }, [selectedLevel])

  const levels = [
    {
      name: "Beginner",
      icon: "🌱",
      description: "Start with basic English skills",
    },
    {
      name: "Intermediate",
      icon: "📈",
      description: "Improve your communication skills",
    },
    {
      name: "Advanced",
      icon: "🚀",
      description: "Master advanced English",
    },
  ]

  const handleSelect = (level) => {
    setCurrentLevel(level)
    onLevelChange?.(level)
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Choose Your English Level
        </h2>

        <p className="text-slate-500 mt-2">
          Select your current level so AI can prepare suitable exercises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {levels.map((level) => (
          <button
            key={level.name}
            onClick={() => handleSelect(level.name)}
            className={`text-left p-6 rounded-2xl border-2 transition ${
              currentLevel === level.name
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
            }`}
          >

            <div className="text-4xl mb-4">
              {level.icon}
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              {level.name}
            </h3>

            <p className="text-slate-500 mt-2">
              {level.description}
            </p>

            {currentLevel === level.name && (
              <p className="text-blue-600 font-semibold mt-4">
                ✓ Selected
              </p>
            )}

          </button>
        ))}

      </div>

      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">

        <p className="text-blue-700">
          Your selected level is{" "}
          <strong>{currentLevel}</strong>.
          AI exercises will be generated for this level.
        </p>

      </div>

    </section>
  )
}

export default LevelSelection