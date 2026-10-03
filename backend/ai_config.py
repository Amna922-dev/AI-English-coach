from dotenv import load_dotenv
from crewai import LLM

load_dotenv()

llm = LLM(
    model="groq/openai/gpt-oss-20b",
    temperature=0.7,
)

print("AI English Coach LLM loaded successfully")