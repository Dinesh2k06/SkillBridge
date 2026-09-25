from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.core.database import Base
from app.models.organization import NetworkScopeEnum

class UserRole(str, enum.Enum):
    STUDENT = "Student"
    STUDENT_MENTOR = "Student Mentor"
    ORGANIZATION_ADMIN = "Organization Admin"
    PLATFORM_ADMIN = "Platform Admin"

class SkillType(str, enum.Enum):
    CAN_TEACH = "CAN_TEACH"
    WANT_TO_LEARN = "WANT_TO_LEARN"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default=UserRole.STUDENT)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    skills = relationship("UserSkill", back_populates="user", cascade="all, delete-orphan")
    goals = relationship("UserGoal", back_populates="user", cascade="all, delete-orphan")
    mentor_profile = relationship("MentorProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    year = Column(String(50), nullable=True)  # e.g., "1st Year", "2nd Year", "3rd Year", "4th Year"
    section = Column(String(50), nullable=True)
    network_scope = Column(String(50), default=NetworkScopeEnum.MY_ORGANIZATION)
    bio = Column(Text, nullable=True)
    github_url = Column(String(255), nullable=True)
    portfolio_url = Column(String(255), nullable=True)
    contribution_points = Column(Integer, default=0)
    xp_level = Column(Integer, default=1)
    
    user = relationship("User", back_populates="profile")
    organization = relationship("Organization", back_populates="users")
    department = relationship("Department", back_populates="users")

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    category = Column(String(100), default="General")
    created_at = Column(DateTime, default=datetime.utcnow)

    user_skills = relationship("UserSkill", back_populates="skill")

class UserSkill(Base):
    __tablename__ = "user_skills"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    skill_id = Column(Integer, ForeignKey("skills.id", ondelete="CASCADE"), nullable=False)
    skill_type = Column(String(50), nullable=False)  # CAN_TEACH or WANT_TO_LEARN
    proficiency = Column(String(50), default="Intermediate")  # Beginner, Intermediate, Advanced
    is_verified = Column(Boolean, default=False)

    user = relationship("User", back_populates="skills")
    skill = relationship("Skill", back_populates="user_skills")

class UserGoal(Base):
    __tablename__ = "user_goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    goal_text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="goals")
