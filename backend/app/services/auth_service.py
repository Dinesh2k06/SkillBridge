from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user import User, UserProfile, Skill, UserSkill, UserRole, SkillType
from app.models.organization import Organization, Department
from app.schemas.auth import UserRegister, UserLogin, Token
from app.core.security import hash_password, verify_password, create_access_token

class AuthService:
    @staticmethod
    def register_user(db: Session, reg_data: UserRegister) -> User:
        existing = db.query(User).filter(User.email == reg_data.email).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is already registered"
            )

        # Create user
        hashed = hash_password(reg_data.password)
        user = User(
            email=reg_data.email,
            hashed_password=hashed,
            full_name=reg_data.full_name,
            role=UserRole.STUDENT
        )
        db.add(user)
        db.flush()

        # Create profile
        profile = UserProfile(
            user_id=user.id,
            organization_id=reg_data.organization_id,
            department_id=reg_data.department_id,
            year=reg_data.year,
            section=reg_data.section,
            network_scope=reg_data.network_scope
        )
        db.add(profile)

        # Process skills user can teach
        for skill_name in reg_data.skills_can_teach:
            skill_name_clean = skill_name.strip()
            if not skill_name_clean:
                continue
            skill = db.query(Skill).filter(Skill.name.ilike(skill_name_clean)).first()
            if not skill:
                skill = Skill(name=skill_name_clean, category="General")
                db.add(skill)
                db.flush()
            
            user_skill = UserSkill(
                user_id=user.id,
                skill_id=skill.id,
                skill_type=SkillType.CAN_TEACH,
                proficiency="Intermediate"
            )
            db.add(user_skill)

        # Process skills user wants to learn
        for skill_name in reg_data.skills_want_to_learn:
            skill_name_clean = skill_name.strip()
            if not skill_name_clean:
                continue
            skill = db.query(Skill).filter(Skill.name.ilike(skill_name_clean)).first()
            if not skill:
                skill = Skill(name=skill_name_clean, category="General")
                db.add(skill)
                db.flush()
            
            user_skill = UserSkill(
                user_id=user.id,
                skill_id=skill.id,
                skill_type=SkillType.WANT_TO_LEARN,
                proficiency="Beginner"
            )
            db.add(user_skill)

        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def authenticate_user(db: Session, login_data: UserLogin) -> Token:
        user = db.query(User).filter(User.email == login_data.email).first()
        if not user or not verify_password(login_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user account"
            )

        token = create_access_token(subject=user.id)
        return Token(
            access_token=token,
            token_type="bearer",
            user_id=user.id,
            full_name=user.full_name,
            role=user.role
        )
