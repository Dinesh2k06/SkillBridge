from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    organization_id: Optional[int] = None
    department_id: Optional[int] = None
    year: Optional[str] = "1st Year"
    section: Optional[str] = "A"
    skills_can_teach: List[str] = []
    skills_want_to_learn: List[str] = []
    network_scope: str = "My Organization"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    full_name: str
    role: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    is_active: bool

    class Config:
        from_attributes = True
