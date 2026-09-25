from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.core.database import Base

class OrgType(str, enum.Enum):
    COLLEGE_UNIVERSITY = "College / University"
    ORGANIZATION = "Organization"
    OTHER_INSTITUTION = "Other Institution"

class NetworkScopeEnum(str, enum.Enum):
    MY_ORGANIZATION = "My Organization"
    SELECTED_ORGANIZATIONS = "Selected Organizations"
    OPEN_NETWORK = "Open Network"

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True, index=True)
    code = Column(String(50), nullable=False, unique=True, index=True)
    org_type = Column(String(100), default=OrgType.COLLEGE_UNIVERSITY)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    departments = relationship("Department", back_populates="organization", cascade="all, delete-orphan")
    users = relationship("UserProfile", back_populates="organization")

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)

    organization = relationship("Organization", back_populates="departments")
    users = relationship("UserProfile", back_populates="department")

class ApprovedExternalOrg(Base):
    __tablename__ = "approved_external_orgs"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    external_org_id = Column(Integer, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
