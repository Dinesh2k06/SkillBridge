from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.schemas.exchange import ReciprocalMatchOut
from app.services.matching_service import MatchingService

router = APIRouter(prefix="/matches", tags=["Skill Matching"])

@router.get("/reciprocal", response_model=List[ReciprocalMatchOut])
def get_reciprocal_matches(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Finds reciprocal matches for current user:
    Current User A: Can Teach X, Wants Y
    Candidate User B: Can Teach Y, Wants X
    Filtered by Organization Network Scope Rules (My Org, Approved Orgs, Open Network).
    """
    return MatchingService.find_reciprocal_matches(db, current_user.id)
