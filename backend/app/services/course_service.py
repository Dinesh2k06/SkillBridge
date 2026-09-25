from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.course import Course, Enrollment
from app.models.user import User, UserProfile, UserSkill, Skill, SkillType, UserRole
from app.models.mentor import MentorProfile

class CourseService:
    @staticmethod
    def enroll_user_in_course(db: Session, user_id: int, course_id: int) -> Enrollment:
        course = db.query(Course).filter(Course.id == course_id).first()
        if not course:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

        existing = db.query(Enrollment).filter(
            Enrollment.user_id == user_id,
            Enrollment.course_id == course_id
        ).first()
        if existing:
            return existing

        enrollment = Enrollment(
            user_id=user_id,
            course_id=course_id,
            status="ACTIVE",
            progress_percentage=0.0
        )
        db.add(enrollment)
        db.commit()
        db.refresh(enrollment)
        return enrollment

    @staticmethod
    def update_course_progress(db: Session, user_id: int, course_id: int, progress: float) -> Enrollment:
        enrollment = db.query(Enrollment).filter(
            Enrollment.user_id == user_id,
            Enrollment.course_id == course_id
        ).first()
        if not enrollment:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")

        enrollment.progress_percentage = min(max(progress, 0.0), 100.0)
        if enrollment.progress_percentage >= 100.0 and enrollment.status != "COMPLETED":
            enrollment.status = "COMPLETED"
            
            # Award Contribution Points & XP to student for completing course
            profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
            if profile:
                profile.contribution_points += 50
                profile.xp_level = (profile.contribution_points // 100) + 1

            # Auto-register as Peer Mentor candidate if completed course
            mentor_profile = db.query(MentorProfile).filter(MentorProfile.user_id == user_id).first()
            if not mentor_profile:
                mentor_profile = MentorProfile(
                    user_id=user_id,
                    is_active_mentor=True,
                    rating=5.0,
                    projects_helped=0,
                    issues_resolved=0
                )
                db.add(mentor_profile)
                
            user = db.query(User).filter(User.id == user_id).first()
            if user and user.role == UserRole.STUDENT:
                user.role = UserRole.STUDENT_MENTOR

        db.commit()
        db.refresh(enrollment)
        return enrollment
