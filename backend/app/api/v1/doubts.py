from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.models.mentor import ProjectDoubt, MentorshipSession, MentorProfile, DoubtStatus
from app.schemas.mentor import DoubtCreate, DoubtOut, SessionCreate, SessionOut
from app.services.mentor_service import MentorService

router = APIRouter(prefix="/projects/doubts", tags=["Project Help Hub & Mentorship"])

@router.post("/", response_model=DoubtOut, status_code=status.HTTP_201_CREATED)
def create_project_doubt(
    doubt_in: DoubtCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    doubt = MentorService.create_project_doubt(db, current_user.id, doubt_in)
    recs = MentorService.get_mentor_recommendations_for_doubt(db, doubt)

    return DoubtOut(
        id=doubt.id,
        student_id=doubt.student_id,
        student_name=current_user.full_name,
        project_name=doubt.project_name,
        category=doubt.category,
        problem_title=doubt.problem_title,
        technology_stack=doubt.technology_stack,
        description=doubt.description,
        repository_url=doubt.repository_url,
        attachments=doubt.attachments,
        status=doubt.status,
        created_at=doubt.created_at,
        recommended_mentors=recs
    )

@router.get("/", response_model=List[DoubtOut])
def list_project_doubts(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    doubts = db.query(ProjectDoubt).order_by(ProjectDoubt.created_at.desc()).all()
    res = []
    for d in doubts:
        recs = MentorService.get_mentor_recommendations_for_doubt(db, d)
        res.append(DoubtOut(
            id=d.id,
            student_id=d.student_id,
            student_name=d.student.full_name if d.student else "Student",
            project_name=d.project_name,
            category=d.category,
            problem_title=d.problem_title,
            technology_stack=d.technology_stack,
            description=d.description,
            repository_url=d.repository_url,
            attachments=d.attachments,
            status=d.status,
            created_at=d.created_at,
            recommended_mentors=recs
        ))
    return res

@router.get("/{doubt_id}", response_model=DoubtOut)
def get_project_doubt(
    doubt_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    d = db.query(ProjectDoubt).filter(ProjectDoubt.id == doubt_id).first()
    if not d:
        raise HTTPException(status_code=404, detail="Project doubt not found")

    recs = MentorService.get_mentor_recommendations_for_doubt(db, d)
    return DoubtOut(
        id=d.id,
        student_id=d.student_id,
        student_name=d.student.full_name if d.student else "Student",
        project_name=d.project_name,
        category=d.category,
        problem_title=d.problem_title,
        technology_stack=d.technology_stack,
        description=d.description,
        repository_url=d.repository_url,
        attachments=d.attachments,
        status=d.status,
        created_at=d.created_at,
        recommended_mentors=recs
    )

@router.post("/{doubt_id}/session", response_model=SessionOut, status_code=status.HTTP_201_CREATED)
def request_mentorship_session(
    doubt_id: int,
    sess_in: SessionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    doubt = db.query(ProjectDoubt).filter(ProjectDoubt.id == doubt_id).first()
    if not doubt:
        raise HTTPException(status_code=404, detail="Project doubt not found")

    mentor = db.query(User).filter(User.id == sess_in.mentor_id).first()
    if not mentor:
        raise HTTPException(status_code=404, detail="Mentor not found")

    session = MentorshipSession(
        doubt_id=doubt.id,
        mentor_id=mentor.id,
        student_id=current_user.id,
        resolution_type=sess_in.resolution_type or "Chat",
        mentor_notes=sess_in.mentor_notes,
        is_resolved=False
    )
    doubt.status = DoubtStatus.IN_PROGRESS

    # Increment mentor stats
    mp = db.query(MentorProfile).filter(MentorProfile.user_id == mentor.id).first()
    if mp:
        mp.projects_helped += 1

    db.add(session)
    db.commit()
    db.refresh(session)

    return SessionOut(
        id=session.id,
        doubt_id=session.doubt_id,
        mentor_id=session.mentor_id,
        student_id=session.student_id,
        mentor_name=mentor.full_name,
        student_name=current_user.full_name,
        resolution_type=session.resolution_type,
        mentor_notes=session.mentor_notes,
        rating=session.rating,
        feedback=session.feedback,
        is_resolved=session.is_resolved,
        created_at=session.created_at
    )
