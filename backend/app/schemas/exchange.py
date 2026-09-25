from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.schemas.user import SkillOut

class ExchangeCreate(BaseModel):
    target_user_id: int
    can_teach_skill_id: int
    want_to_learn_skill_id: int
    session_type: Optional[str] = "30-minute interactive session"
    notes: Optional[str] = None

class ExchangeStatusUpdate(BaseModel):
    status: str  # ACCEPTED, REJECTED, COMPLETED
    rating: Optional[float] = None
    feedback: Optional[str] = None

class ExchangeUserSummary(BaseModel):
    id: int
    full_name: str
    organization_name: Optional[str] = None
    department_name: Optional[str] = None

class ExchangeOut(BaseModel):
    id: int
    requester_id: int
    target_user_id: int
    requester: ExchangeUserSummary
    target_user: ExchangeUserSummary
    can_teach_skill: SkillOut
    want_to_learn_skill: SkillOut
    session_type: str
    notes: Optional[str] = None
    status: str
    rating: Optional[float] = None
    feedback: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ReciprocalMatchOut(BaseModel):
    user_id: int
    full_name: str
    organization_name: Optional[str] = None
    department_name: Optional[str] = None
    year: Optional[str] = None
    can_teach_skill: str
    wants_to_learn_skill: str
    match_score: float = 1.0
    network_distance: str = "Same Organization"  # "Same Organization", "Approved Network", "Open Network"
