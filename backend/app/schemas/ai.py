from pydantic import BaseModel
from typing import Optional, List

class DoubtAnalysisRequest(BaseModel):
    problem_title: str
    technology_stack: str
    description: str

class DoubtAnalysisOut(BaseModel):
    category: str  # e.g., "Backend Development"
    technology: str  # e.g., "FastAPI"
    topic: str  # e.g., "Authentication"
    required_skills: List[str]  # e.g., ["FastAPI", "JWT"]
    recommended_mentor_type: str  # e.g., "Backend Mentors"

class SkillExtractionRequest(BaseModel):
    text: str

class SkillExtractionOut(BaseModel):
    extracted_skills: List[str]
