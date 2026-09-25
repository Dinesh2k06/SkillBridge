from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from app.models.user import User, UserProfile, UserSkill, Skill, SkillType
from app.models.mentor import MentorProfile, ProjectDoubt, MentorshipSession, DoubtStatus
from app.schemas.mentor import DoubtCreate, MentorRecommendationOut
from app.ai.gemini_service import GeminiAIService
from app.services.matching_service import MatchingService

class MentorService:
    @staticmethod
    def create_project_doubt(db: Session, student_id: int, doubt_in: DoubtCreate) -> ProjectDoubt:
        ai_analysis = GeminiAIService.analyze_project_doubt(
            problem_title=doubt_in.problem_title,
            tech_stack=doubt_in.technology_stack,
            description=doubt_in.description
        )

        category = doubt_in.category or ai_analysis.get("category", "Backend Development")

        doubt = ProjectDoubt(
            student_id=student_id,
            project_name=doubt_in.project_name,
            category=category,
            problem_title=doubt_in.problem_title,
            technology_stack=doubt_in.technology_stack,
            description=doubt_in.description,
            repository_url=doubt_in.repository_url,
            attachments=doubt_in.attachments,
            status=DoubtStatus.OPEN
        )
        db.add(doubt)
        db.commit()
        db.refresh(doubt)
        return doubt

    @staticmethod
    def get_mentor_recommendations_for_doubt(db: Session, doubt: ProjectDoubt) -> List[MentorRecommendationOut]:
        student_profile = db.query(UserProfile).filter(UserProfile.user_id == doubt.student_id).first()
        allowed_org_ids = MatchingService.get_allowed_org_ids_for_user(db, student_profile) if student_profile else None

        candidate_users_query = db.query(User).join(UserProfile).filter(
            User.id != doubt.student_id,
            User.is_active == True
        )
        if allowed_org_ids is not None:
            candidate_users_query = candidate_users_query.filter(UserProfile.organization_id.in_(allowed_org_ids))

        candidate_users = candidate_users_query.all()

        doubt_skills = [s.lower() for s in doubt.technology_stack.replace("+", " ").replace(",", " ").split()]

        recommendations: List[MentorRecommendationOut] = []

        for u in candidate_users:
            mentor_skills = db.query(UserSkill).filter(
                UserSkill.user_id == u.id,
                UserSkill.skill_type == SkillType.CAN_TEACH
            ).all()
            m_skill_names = [us.skill.name for us in mentor_skills if us.skill]
            if not m_skill_names:
                continue

            matched_skills = [s for s in m_skill_names if any(ds in s.lower() for ds in doubt_skills)]

            # Only recommend users who have relevant teaching skills
            if not matched_skills and len(m_skill_names) == 0:
                continue

            match_pct = 80.0
            if matched_skills:
                match_pct = 90.0 + min(len(matched_skills) * 3.0, 8.0)

            if student_profile and u.profile and u.profile.organization_id == student_profile.organization_id:
                match_pct = min(match_pct + 2.0, 98.0)

            mp = u.mentor_profile
            rating = mp.rating if mp else 5.0
            resp_rate = mp.response_rate if mp else 95.0
            issues_res = mp.issues_resolved if mp else 0

            recommendations.append(MentorRecommendationOut(
                mentor_id=u.id,
                full_name=u.full_name,
                organization_name=u.profile.organization.name if u.profile and u.profile.organization else "SkillBridge Network",
                department_name=u.profile.department.name if u.profile and u.profile.department else "General",
                match_percentage=round(match_pct, 1),
                matched_skills=matched_skills if matched_skills else m_skill_names[:3],
                rating=rating,
                response_rate=resp_rate,
                issues_resolved=issues_res
            ))

        recommendations.sort(key=lambda r: r.match_percentage, reverse=True)
        return recommendations
