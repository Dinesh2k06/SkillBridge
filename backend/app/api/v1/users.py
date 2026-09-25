from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.models.user import User, UserProfile, UserSkill, SkillType
from app.schemas.user import ProfileOut, ProfileUpdate, SkillOut

router = APIRouter(prefix="/users", tags=["Users & Profiles"])

@router.get("/profile", response_model=ProfileOut)
def get_user_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = current_user.profile
    org_name = profile.organization.name if profile and profile.organization else "SkillBridge Network"
    dept_name = profile.department.name if profile and profile.department else "General"

    skills_can_teach = []
    skills_want_to_learn = []
    for us in current_user.skills:
        if not us.skill:
            continue
        s_out = SkillOut(
            id=us.skill.id,
            name=us.skill.name,
            category=us.skill.category,
            skill_type=us.skill_type,
            proficiency=us.proficiency,
            is_verified=us.is_verified
        )
        if us.skill_type == SkillType.CAN_TEACH:
            skills_can_teach.append(s_out)
        else:
            skills_want_to_learn.append(s_out)

    is_mentor = current_user.mentor_profile.is_active_mentor if current_user.mentor_profile else False
    mentor_rating = current_user.mentor_profile.rating if current_user.mentor_profile else 5.0

    return ProfileOut(
        id=profile.id if profile else 0,
        user_id=current_user.id,
        full_name=current_user.full_name,
        email=current_user.email,
        role=current_user.role,
        organization_id=profile.organization_id if profile else None,
        organization_name=org_name,
        department_id=profile.department_id if profile else None,
        department_name=dept_name,
        year=profile.year if profile else "1st Year",
        section=profile.section if profile else "A",
        network_scope=profile.network_scope if profile else "My Organization",
        bio=profile.bio if profile else "",
        github_url=profile.github_url if profile else "",
        portfolio_url=profile.portfolio_url if profile else "",
        contribution_points=profile.contribution_points if profile else 0,
        xp_level=profile.xp_level if profile else 1,
        skills_can_teach=skills_can_teach,
        skills_want_to_learn=skills_want_to_learn,
        is_mentor=is_mentor,
        mentor_rating=mentor_rating
    )

@router.put("/profile", response_model=ProfileOut)
def update_profile(
    up_data: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = current_user.profile
    if not profile:
        profile = UserProfile(user_id=current_user.id)
        db.add(profile)

    if up_data.bio is not None:
        profile.bio = up_data.bio
    if up_data.github_url is not None:
        profile.github_url = up_data.github_url
    if up_data.portfolio_url is not None:
        profile.portfolio_url = up_data.portfolio_url
    if up_data.network_scope is not None:
        profile.network_scope = up_data.network_scope
    if up_data.year is not None:
        profile.year = up_data.year

    db.commit()
    db.refresh(profile)
    return get_user_profile(current_user=current_user, db=db)
