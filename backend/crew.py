
from crewai import Crew, Process

from agents import (
    reading_agent,
    writing_agent,
    vocabulary_agent,
    grammar_agent,
)

from tasks import (
    reading_task,
    writing_task,
    vocabulary_task,
    grammar_task,
)


def get_crew(area):
    if area == "Reading":
        return Crew(
            agents=[reading_agent],
            tasks=[reading_task],
            process=Process.sequential,
            verbose=True,
        )

    if area == "Writing":
        return Crew(
            agents=[writing_agent],
            tasks=[writing_task],
            process=Process.sequential,
            verbose=True,
        )

    if area == "Vocabulary":
        return Crew(
            agents=[vocabulary_agent],
            tasks=[vocabulary_task],
            process=Process.sequential,
            verbose=True,
        )

    if area == "Grammar":
        return Crew(
            agents=[grammar_agent],
            tasks=[grammar_task],
            process=Process.sequential,
            verbose=True,
        )

    raise ValueError(f"Unknown learning area: {area}")


print("AI English Coach Crew loaded successfully")
