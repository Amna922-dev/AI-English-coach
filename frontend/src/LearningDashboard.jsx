function LearningDashboard({ onSelectArea }) {
  const learningAreas = [
    {
      title: "Reading",
      icon: "📖",
      description:
        "Improve your reading skills with AI-powered passages and questions.",
      color: "bg-blue-50",
      iconColor: "bg-blue-100",
    },
    {
      title: "Writing",
      icon: "✍️",
      description:
        "Practice writing and get personalized AI feedback.",
      color: "bg-purple-50",
      iconColor: "bg-purple-100",
    },
    {
      title: "Vocabulary",
      icon: "📚",
      description:
        "Learn new words, meanings, examples, and useful phrases.",
      color: "bg-green-50",
      iconColor: "bg-green-100",
    },
    {
      title: "Grammar",
      icon: "📝",
      description:
        "Practice grammar rules through personalized exercises.",
      color: "bg-orange-50",
      iconColor: "bg-orange-100",
    },
  ]

  return (
    <section className="py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800">
          Your Learning Dashboard
        </h1>

        <p className="mt-3 text-slate-500">
          Choose a skill and start improving your English.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learningAreas.map((area) => (
          <button
            key={area.title}
            onClick={() => onSelectArea(area.title)}
            className={`${area.color} p-7 rounded-2xl border border-slate-200 text-left hover:shadow-lg hover:-translate-y-1 transition`}
          >
            <div
              className={`${area.iconColor} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl`}
            >
              {area.icon}
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mt-5">
              {area.title}
            </h2>

            <p className="text-slate-600 mt-2">
              {area.description}
            </p>

            <div className="mt-5 text-blue-600 font-semibold">
              Start Practice →
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default LearningDashboard