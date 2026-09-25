from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class LessonOut(BaseModel):
    id: int
    module_id: int
    title: str
    content_text: Optional[str] = None
    video_url: Optional[str] = None
    duration_minutes: int
    order: int

    class Config:
        from_attributes = True

class CourseModuleOut(BaseModel):
    id: int
    course_id: int
    title: str
    order: int
    lessons: List[LessonOut] = []

    class Config:
        from_attributes = True

class CourseOut(BaseModel):
    id: int
    title: str
    description: str
    category: str
    price: float
    is_premium: bool
    thumbnail_url: Optional[str] = None
    total_modules: int = 0
    modules: List[CourseModuleOut] = []

    class Config:
        from_attributes = True

class EnrollmentOut(BaseModel):
    id: int
    user_id: int
    course_id: int
    course_title: str
    status: str
    progress_percentage: float
    created_at: datetime

    class Config:
        from_attributes = True
