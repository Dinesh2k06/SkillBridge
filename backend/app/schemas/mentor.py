from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class MentorRecommendationOut(BaseModel):
    mentor_id: int
    full_name: str
    organization_name: Optional[str] = None
    department_name: Optional[str] = None
    match_percentage: float  # e.g. 96.0 for 96% Match
    matched_skills: List[str] = []
    rating: float = 5.0
    response_rate: float = 95.0
    issues_resolved: int = 0

class MentorProfileOut(BaseModel):
    id: int
    user_id: int
    full_name: str
    organization_name: Optional[str] = None
    rating: float
    projects_helped: int
    issues_resolved: int
    response_rate: float
    skills: List[str] = []

    class Config:
        from_attributes = True

class DoubtCreate(BaseModel):
    project_name: str
    category: Optional[str] = "Backend Development"
    problem_title: str
    technology_stack: str
    description: str
    repository_url: Optional[str] = None
    attachments: Optional[str] = None

class DoubtOut(BaseModel):
    id: int
    student_id: int
    student_name: str
    project_name: str
    category: str
    problem_title: str
    technology_stack: str
    description: str
    repository_url: Optional[str] = None
    attachments: Optional[str] = None
    status: str
    created_at: datetime
    recommended_mentors: List[MentorRecommendationOut] = []

    class Config:
        from_attributes = True

class SessionCreate(BaseModel):
    doubt_id: int
    mentor_id: int
    resolution_type: Optional[str] = "Chat"
    mentor_notes: Optional[str] = None

class SessionOut(BaseModel):
    id: int
    doubt_id: int
    mentor_id: int
    student_id: int
    mentor_name: str
    student_name: str
    resolution_type: str
    mentor_notes: Optional[str] = None
    rating: Optional[float] = None
    feedback: Optional[str] = None
    is_resolved: bool
    created_at: datetime

    class Config:
        from_attributes = True
