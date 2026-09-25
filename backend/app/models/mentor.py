from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.core.database import Base

class DoubtStatus(str, enum.Enum):
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    RESOLVED = "RESOLVED"

class ResolutionType(str, enum.Enum):
    CHAT = "Chat"
    LIVE_SESSION = "Live session"
    SOLUTION = "Solution explanation"
    CODE_REVIEW = "Code review"
    RESOURCES = "Resources"
    CHALLENGE = "Challenge task"

class MentorProfile(Base):
    __tablename__ = "mentor_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    is_active_mentor = Column(Boolean, default=True)
    rating = Column(Float, default=5.0)
    projects_helped = Column(Integer, default=0)
    issues_resolved = Column(Integer, default=0)
    response_rate = Column(Float, default=95.0)  # Percentage, e.g. 94.0
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="mentor_profile")

class ProjectDoubt(Base):
    __tablename__ = "project_doubts"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    project_name = Column(String(255), nullable=False)
    category = Column(String(100), default="Backend Development")
    problem_title = Column(String(255), nullable=False)
    technology_stack = Column(String(255), nullable=False)  # e.g. "FastAPI + React"
    description = Column(Text, nullable=False)
    repository_url = Column(String(255), nullable=True)
    attachments = Column(Text, nullable=True)  # JSON or text links
    status = Column(String(50), default=DoubtStatus.OPEN)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    student = relationship("User", foreign_keys=[student_id])
    sessions = relationship("MentorshipSession", back_populates="doubt", cascade="all, delete-orphan")

class MentorshipSession(Base):
    __tablename__ = "mentorship_sessions"

    id = Column(Integer, primary_key=True, index=True)
    doubt_id = Column(Integer, ForeignKey("project_doubts.id", ondelete="CASCADE"), nullable=False)
    mentor_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    student_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    resolution_type = Column(String(100), default=ResolutionType.CHAT)
    mentor_notes = Column(Text, nullable=True)
    rating = Column(Float, nullable=True)
    feedback = Column(Text, nullable=True)
    is_resolved = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    doubt = relationship("ProjectDoubt", back_populates="sessions")
    mentor = relationship("User", foreign_keys=[mentor_id])
    student = relationship("User", foreign_keys=[student_id])
