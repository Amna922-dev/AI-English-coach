import crewai.llms.cache as crew_cache
import crewai.agents.crew_agent_executor as executor

crew_cache.mark_cache_breakpoint = lambda msg: msg
executor.mark_cache_breakpoint = lambda msg: msg

from crew import english_coach_crew


result = english_coach_crew.kickoff(
    inputs={
        "level": "Beginner"
    }
)

print("\n==============================")
print("AI ENGLISH COACH RESULT")
print("==============================\n")

print(result)