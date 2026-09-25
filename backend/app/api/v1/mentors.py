from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db, get_current_user
from app.models.user import User, UserSkill, SkillType
from app.models.mentor import MentorProfile
from app.schemas.mentor import MentorProfileOut
from app.services.matching_service import MatchingService

router = APIRouter(prefix="/mentors", tags=["Student Mentor System"])

@router.get("/", response_model=List[MentorProfileOut])
def discover_mentors(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Discover active student mentors in network.
    """
    allowed_org_ids = MatchingService.get_allowed_org_ids_for_user(db, current_user.profile) if current_user.profile else []

    query = db.query(MentorProfile).join(User).filter(
        User.id != current_user.id,
        User.is_active == True,
        MentorProfile.is_active_mentor == True
    )

    if allowed_org_ids:
        query = query.filter(User.profile.has(organization_id=allowed_org_ids))

    mentors = query.all()
    res = []
    for m in mentors:
        u = m.user
        m_skills = db.query(UserSkill).filter(
            UserSkill.user_id == u.id,
            UserSkill.skill_type == SkillType.CAN_TEACH
        ).all()
        skill_names = [us.skill.name for us in m_skills if us.skill]

        res.append(MentorProfileOut(
            id=m.id,
            user_id=u.id,
            full_name=u.full_name,
            organization_name=u.profile.organization.name if u.profile and u.profile.organization else "SkillBridge",
            rating=m.rating,
            projects_helped=m.projects_helped,
            issues_resolved=m.issues_resolved,
            response_rate=m.response_rate,
            skills=skill_names
        ))
    return res
