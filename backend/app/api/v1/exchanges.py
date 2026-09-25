from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db, get_current_user
from app.models.user import User, UserProfile
from app.models.exchange import SkillExchangeRequest, ExchangeStatus
from app.schemas.exchange import ExchangeCreate, ExchangeStatusUpdate, ExchangeOut, ExchangeUserSummary
from app.schemas.user import SkillOut

router = APIRouter(prefix="/exchanges", tags=["Knowledge Exchange"])

@router.post("/request", response_model=ExchangeOut, status_code=status.HTTP_201_CREATED)
def create_exchange_request(
    ex_in: ExchangeCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if ex_in.target_user_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot send exchange request to yourself")

    target_user = db.query(User).filter(User.id == ex_in.target_user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="Target user not found")

    req = SkillExchangeRequest(
        requester_id=current_user.id,
        target_user_id=ex_in.target_user_id,
        can_teach_skill_id=ex_in.can_teach_skill_id,
        want_to_learn_skill_id=ex_in.want_to_learn_skill_id,
        session_type=ex_in.session_type or "30-minute interactive session",
        notes=ex_in.notes,
        status=ExchangeStatus.PENDING
    )
    db.add(req)
    db.commit()
    db.refresh(req)

    return ExchangeOut(
        id=req.id,
        requester_id=req.requester_id,
        target_user_id=req.target_user_id,
        requester=ExchangeUserSummary(
            id=current_user.id,
            full_name=current_user.full_name,
            organization_name=current_user.profile.organization.name if current_user.profile and current_user.profile.organization else "SkillBridge",
            department_name=current_user.profile.department.name if current_user.profile and current_user.profile.department else "General"
        ),
        target_user=ExchangeUserSummary(
            id=target_user.id,
            full_name=target_user.full_name,
            organization_name=target_user.profile.organization.name if target_user.profile and target_user.profile.organization else "SkillBridge",
            department_name=target_user.profile.department.name if target_user.profile and target_user.profile.department else "General"
        ),
        can_teach_skill=SkillOut(
            id=req.can_teach_skill.id,
            name=req.can_teach_skill.name,
            category=req.can_teach_skill.category,
            skill_type="CAN_TEACH",
            proficiency="Intermediate",
            is_verified=False
        ),
        want_to_learn_skill=SkillOut(
            id=req.want_to_learn_skill.id,
            name=req.want_to_learn_skill.name,
            category=req.want_to_learn_skill.category,
            skill_type="WANT_TO_LEARN",
            proficiency="Beginner",
            is_verified=False
        ),
        session_type=req.session_type,
        notes=req.notes,
        status=req.status,
        created_at=req.created_at
    )

@router.get("/requests", response_model=List[ExchangeOut])
def list_exchange_requests(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    reqs = db.query(SkillExchangeRequest).filter(
        (SkillExchangeRequest.requester_id == current_user.id) |
        (SkillExchangeRequest.target_user_id == current_user.id)
    ).all()

    res = []
    for req in reqs:
        res.append(ExchangeOut(
            id=req.id,
            requester_id=req.requester_id,
            target_user_id=req.target_user_id,
            requester=ExchangeUserSummary(
                id=req.requester.id,
                full_name=req.requester.full_name,
                organization_name=req.requester.profile.organization.name if req.requester.profile and req.requester.profile.organization else "SkillBridge",
                department_name=req.requester.profile.department.name if req.requester.profile and req.requester.profile.department else "General"
            ),
            target_user=ExchangeUserSummary(
                id=req.target_user.id,
                full_name=req.target_user.full_name,
                organization_name=req.target_user.profile.organization.name if req.target_user.profile and req.target_user.profile.organization else "SkillBridge",
                department_name=req.target_user.profile.department.name if req.target_user.profile and req.target_user.profile.department else "General"
            ),
            can_teach_skill=SkillOut(
                id=req.can_teach_skill.id,
                name=req.can_teach_skill.name,
                category=req.can_teach_skill.category,
                skill_type="CAN_TEACH",
                proficiency="Intermediate",
                is_verified=False
            ),
            want_to_learn_skill=SkillOut(
                id=req.want_to_learn_skill.id,
                name=req.want_to_learn_skill.name,
                category=req.want_to_learn_skill.category,
                skill_type="WANT_TO_LEARN",
                proficiency="Beginner",
                is_verified=False
            ),
            session_type=req.session_type,
            notes=req.notes,
            status=req.status,
            rating=req.rating,
            feedback=req.feedback,
            created_at=req.created_at
        ))
    return res

@router.put("/requests/{id}/status", response_model=ExchangeOut)
def update_exchange_status(
    id: int,
    up_data: ExchangeStatusUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    req = db.query(SkillExchangeRequest).filter(SkillExchangeRequest.id == id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Exchange request not found")

    if current_user.id not in [req.requester_id, req.target_user_id]:
        raise HTTPException(status_code=403, detail="Not authorized to update this exchange request")

    req.status = up_data.status
    if up_data.rating is not None:
        req.rating = up_data.rating
    if up_data.feedback is not None:
        req.feedback = up_data.feedback

    if up_data.status == ExchangeStatus.COMPLETED:
        # Award contribution points to both participants
        p1 = current_user.profile
        if p1:
            p1.contribution_points += 20
            p1.xp_level = (p1.contribution_points // 100) + 1

    db.commit()
    db.refresh(req)
    return list_exchange_requests(current_user=current_user, db=db)[0]
