from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.models.course import Course, CourseModule, Lesson, Enrollment
from app.schemas.course import CourseOut, CourseModuleOut, LessonOut, EnrollmentOut
from app.services.course_service import CourseService

router = APIRouter(prefix="/courses", tags=["Learning Hub (Courses)"])

@router.get("/", response_model=List[CourseOut])
def list_courses(db: Session = Depends(get_db)):
    courses = db.query(Course).all()
    res = []
    for c in courses:
        modules_out = []
        for m in c.modules:
            lessons_out = [
                LessonOut(
                    id=l.id,
                    module_id=l.module_id,
                    title=l.title,
                    content_text=l.content_text,
                    video_url=l.video_url,
                    duration_minutes=l.duration_minutes,
                    order=l.order
                ) for l in m.lessons
            ]
            modules_out.append(CourseModuleOut(
                id=m.id,
                course_id=m.course_id,
                title=m.title,
                order=m.order,
                lessons=lessons_out
            ))
        res.append(CourseOut(
            id=c.id,
            title=c.title,
            description=c.description,
            category=c.category,
            price=c.price,
            is_premium=c.is_premium,
            thumbnail_url=c.thumbnail_url,
            total_modules=len(c.modules),
            modules=modules_out
        ))
    return res

@router.get("/{course_id}", response_model=CourseOut)
def get_course(course_id: int, db: Session = Depends(get_db)):
    c = db.query(Course).filter(Course.id == course_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Course not found")

    modules_out = []
    for m in c.modules:
        lessons_out = [
            LessonOut(
                id=l.id,
                module_id=l.module_id,
                title=l.title,
                content_text=l.content_text,
                video_url=l.video_url,
                duration_minutes=l.duration_minutes,
                order=l.order
            ) for l in m.lessons
        ]
        modules_out.append(CourseModuleOut(
            id=m.id,
            course_id=m.course_id,
            title=m.title,
            order=m.order,
            lessons=lessons_out
        ))
    return CourseOut(
        id=c.id,
        title=c.title,
        description=c.description,
        category=c.category,
        price=c.price,
        is_premium=c.is_premium,
        thumbnail_url=c.thumbnail_url,
        total_modules=len(c.modules),
        modules=modules_out
    )

@router.post("/{course_id}/enroll", response_model=EnrollmentOut)
def enroll_course(
    course_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    enrollment = CourseService.enroll_user_in_course(db, current_user.id, course_id)
    return EnrollmentOut(
        id=enrollment.id,
        user_id=enrollment.user_id,
        course_id=enrollment.course_id,
        course_title=enrollment.course.title if enrollment.course else "Course",
        status=enrollment.status,
        progress_percentage=enrollment.progress_percentage,
        created_at=enrollment.created_at
    )

@router.put("/{course_id}/progress", response_model=EnrollmentOut)
def update_progress(
    course_id: int,
    progress: float,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    enrollment = CourseService.update_course_progress(db, current_user.id, course_id, progress)
    return EnrollmentOut(
        id=enrollment.id,
        user_id=enrollment.user_id,
        course_id=enrollment.course_id,
        course_title=enrollment.course.title if enrollment.course else "Course",
        status=enrollment.status,
        progress_percentage=enrollment.progress_percentage,
        created_at=enrollment.created_at
    )
