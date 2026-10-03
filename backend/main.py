from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import crewai.llms.cache as crew_cache
import crewai.agents.crew_agent_executor as executor
import uuid

crew_cache.mark_cache_breakpoint = lambda msg: msg
executor.mark_cache_breakpoint = lambda msg: msg

from crew import get_crew


app = FastAPI(title="AI English Coach API")


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
        "http://127.0.0.1:5176",
        "http://127.0.0.1:5177",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# REQUEST MODEL
# =========================

class ExerciseRequest(BaseModel):
    level: str = "Beginner"
    area: str = "Reading"
    session_id: str = ""


# =========================
# HOME
# =========================

@app.get("/")
def home():
    return {
        "message": "AI English Coach backend is running!"
    }


# =========================
# HEALTH CHECK
# =========================

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# =========================
# GENERATE AI EXERCISE
# =========================

@app.post("/generate-exercise")
def generate_exercise(request: ExerciseRequest):

    # Create a unique session if frontend does not provide one
    session_id = request.session_id or str(uuid.uuid4())

    print("\n==============================")
    print("NEW AI EXERCISE REQUEST")
    print("==============================")
    print(f"Level: {request.level}")
    print(f"Area: {request.area}")
    print(f"Session ID: {session_id}")
    print("==============================\n")

    crew = get_crew(request.area)

    result = crew.kickoff(
        inputs={
            "level": request.level,
            "session_id": session_id,
        }
    )

    return {
        "level": request.level,
        "area": request.area,
        "session_id": session_id,
        "result": str(result),
    }