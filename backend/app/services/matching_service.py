from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from app.models.user import User, UserProfile, UserSkill, Skill, SkillType
from app.models.organization import Organization, Department, ApprovedExternalOrg, NetworkScopeEnum
from app.schemas.exchange import ReciprocalMatchOut

class MatchingService:
    @staticmethod
    def get_allowed_org_ids_for_user(db: Session, user_profile: Optional[UserProfile]) -> Optional[List[int]]:
        """
        Determines which organization IDs a user can discover based on Network Scope rules:
        - My Organization: Only student's org ID.
        - Selected Organizations: Student's org ID + approved external org IDs.
        - Open Network / None: None (all orgs).
        """
        if not user_profile or not user_profile.organization_id:
            return None

        scope = user_profile.network_scope
        user_org_id = user_profile.organization_id

        if scope == NetworkScopeEnum.MY_ORGANIZATION:
            return [user_org_id]
        
        elif scope == NetworkScopeEnum.SELECTED_ORGANIZATIONS:
            approved = db.query(ApprovedExternalOrg).filter(
                ApprovedExternalOrg.organization_id == user_org_id
            ).all()
            ext_ids = [a.external_org_id for a in approved]
            return list(set([user_org_id] + ext_ids))
        
        else:  # Open Network
            return None

    @staticmethod
    def find_reciprocal_matches(db: Session, current_user_id: int) -> List[ReciprocalMatchOut]:
        """
        Finds reciprocal skill matches for current user.
        Reciprocal Condition:
        Current User (A): Can Teach X, Wants to Learn Y
        Matched User (B): Can Teach Y, Wants to Learn X
        """
        current_profile = db.query(UserProfile).filter(UserProfile.user_id == current_user_id).first()

        # Get current user's skills
        skills_a_teaches = db.query(UserSkill).filter(
            UserSkill.user_id == current_user_id,
            UserSkill.skill_type == SkillType.CAN_TEACH
        ).all()
        a_teaches_ids = {us.skill_id: us.skill.name for us in skills_a_teaches if us.skill}

        skills_a_wants = db.query(UserSkill).filter(
            UserSkill.user_id == current_user_id,
            UserSkill.skill_type == SkillType.WANT_TO_LEARN
        ).all()
        a_wants_ids = {us.skill_id: us.skill.name for us in skills_a_wants if us.skill}

        if not a_teaches_ids or not a_wants_ids:
            return []

        allowed_org_ids = MatchingService.get_allowed_org_ids_for_user(db, current_profile)

        # Query potential match candidate users
        query = db.query(User).join(UserProfile).filter(
            User.id != current_user_id,
            User.is_active == True
        )
        if allowed_org_ids is not None:
            query = query.filter(UserProfile.organization_id.in_(allowed_org_ids))

        candidates = query.all()

        results: List[ReciprocalMatchOut] = []

        for candidate in candidates:
            b_skills_teaches = db.query(UserSkill).filter(
                UserSkill.user_id == candidate.id,
                UserSkill.skill_type == SkillType.CAN_TEACH
            ).all()
            b_teaches_map = {us.skill_id: us.skill.name for us in b_skills_teaches if us.skill}

            b_skills_wants = db.query(UserSkill).filter(
                UserSkill.user_id == candidate.id,
                UserSkill.skill_type == SkillType.WANT_TO_LEARN
            ).all()
            b_wants_map = {us.skill_id: us.skill.name for us in b_skills_wants if us.skill}

            # Check reciprocal overlap
            teaches_overlap = set(a_wants_ids.keys()).intersection(set(b_teaches_map.keys()))
            wants_overlap = set(a_teaches_ids.keys()).intersection(set(b_wants_map.keys()))

            if teaches_overlap and wants_overlap:
                match_teach_id = list(teaches_overlap)[0]
                match_want_id = list(wants_overlap)[0]

                org_name = candidate.profile.organization.name if candidate.profile and candidate.profile.organization else "SkillBridge Network"
                dept_name = candidate.profile.department.name if candidate.profile and candidate.profile.department else "General"
                year_name = candidate.profile.year if candidate.profile else "1st Year"

                distance = "Same Organization"
                if current_profile and candidate.profile and candidate.profile.organization_id != current_profile.organization_id:
                    distance = "Approved Network" if current_profile.network_scope == NetworkScopeEnum.SELECTED_ORGANIZATIONS else "Open Network"

                results.append(ReciprocalMatchOut(
                    user_id=candidate.id,
                    full_name=candidate.full_name,
                    organization_name=org_name,
                    department_name=dept_name,
                    year=year_name,
                    can_teach_skill=b_teaches_map[match_teach_id],
                    wants_to_learn_skill=a_teaches_ids[match_want_id],
                    match_score=0.96 if distance == "Same Organization" else 0.91,
                    network_distance=distance
                ))

        return results
