from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.core.database import Base

class ExchangeStatus(str, enum.Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    COMPLETED = "COMPLETED"

class SkillExchangeRequest(Base):
    __tablename__ = "skill_exchange_requests"

    id = Column(Integer, primary_key=True, index=True)
    requester_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    target_user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    can_teach_skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    want_to_learn_skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    session_type = Column(String(100), default="30-minute interactive session")
    notes = Column(Text, nullable=True)
    status = Column(String(50), default=ExchangeStatus.PENDING)
    rating = Column(Float, nullable=True)
    feedback = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    requester = relationship("User", foreign_keys=[requester_id])
    target_user = relationship("User", foreign_keys=[target_user_id])
    can_teach_skill = relationship("Skill", foreign_keys=[can_teach_skill_id])
    want_to_learn_skill = relationship("Skill", foreign_keys=[want_to_learn_skill_id])

class SkillMatch(Base):
    __tablename__ = "skill_matches"

    id = Column(Integer, primary_key=True, index=True)
    user_a_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    user_b_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    skill_a_teaches_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    skill_b_teaches_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    match_score = Column(Float, default=1.0)
    is_reciprocal = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user_a = relationship("User", foreign_keys=[user_a_id])
    user_b = relationship("User", foreign_keys=[user_b_id])
    skill_a_teaches = relationship("Skill", foreign_keys=[skill_a_teaches_id])
    skill_b_teaches = relationship("Skill", foreign_keys=[skill_b_teaches_id])
