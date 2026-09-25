from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.schemas.auth import UserRegister, UserLogin, Token, UserOut
from app.schemas.user import ProfileOut
from app.services.auth_service import AuthService
from app.models.user import User, UserProfile, UserSkill, SkillType
from app.schemas.user import SkillOut

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(reg_data: UserRegister, db: Session = Depends(get_db)):
    user = AuthService.register_user(db, reg_data)
    token = AuthService.authenticate_user(db, UserLogin(email=reg_data.email, password=reg_data.password))
    return token

@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    return AuthService.authenticate_user(db, login_data)

@router.post("/login/form", response_model=Token)
def login_form(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return AuthService.authenticate_user(db, UserLogin(email=form_data.username, password=form_data.password))

@router.get("/me", response_model=ProfileOut)
def get_me(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
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
