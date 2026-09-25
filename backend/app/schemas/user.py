from pydantic import BaseModel
from typing import Optional, List

class SkillOut(BaseModel):
    id: int
    name: str
    category: str
    skill_type: str
    proficiency: str
    is_verified: bool

    class Config:
        from_attributes = True

class ProfileUpdate(BaseModel):
    bio: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    network_scope: Optional[str] = None
    year: Optional[str] = None

class ProfileOut(BaseModel):
    id: int
    user_id: int
    full_name: str
    email: str
    role: str
    organization_id: Optional[int] = None
    organization_name: Optional[str] = None
    department_id: Optional[int] = None
    department_name: Optional[str] = None
    year: Optional[str] = None
    section: Optional[str] = None
    network_scope: str
    bio: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    contribution_points: int
    xp_level: int
    skills_can_teach: List[SkillOut] = []
    skills_want_to_learn: List[SkillOut] = []
    is_mentor: bool = False
    mentor_rating: Optional[float] = 5.0

    class Config:
        from_attributes = True
