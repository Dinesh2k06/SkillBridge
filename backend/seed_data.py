import os
import sys

# Ensure backend folder is in Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, Base, engine
from app.models.organization import Organization, Department, ApprovedExternalOrg, OrgType, NetworkScopeEnum
from app.models.user import User, UserProfile, Skill, UserSkill, UserRole, SkillType
from app.models.mentor import MentorProfile, ProjectDoubt, DoubtStatus
from app.models.course import Course, CourseModule, Lesson
from app.core.security import hash_password

def seed_all():
    # Initialize DB Tables
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(Organization).first():
            print("Database already contains seed data.")
            return

        print("Seeding SkillBridge database...")

        # 1. Seed Organizations
        sns = Organization(name="SNS College of Engineering", code="SNSCE", org_type=OrgType.COLLEGE_UNIVERSITY, is_verified=True)
        psg = Organization(name="PSG College of Technology", code="PSG", org_type=OrgType.COLLEGE_UNIVERSITY, is_verified=True)
        cit = Organization(name="Coimbatore Institute of Technology", code="CIT", org_type=OrgType.COLLEGE_UNIVERSITY, is_verified=True)
        db.add_all([sns, psg, cit])
        db.flush()

        # 2. Approved External Orgs for Level 2 Network Scope
        app1 = ApprovedExternalOrg(organization_id=sns.id, external_org_id=psg.id)
        app2 = ApprovedExternalOrg(organization_id=sns.id, external_org_id=cit.id)
        db.add_all([app1, app2])

        # 3. Seed Departments
        dept_ai = Department(organization_id=sns.id, name="AI & Data Science")
        dept_cse = Department(organization_id=sns.id, name="Computer Science & Engineering")
        dept_it = Department(organization_id=sns.id, name="Information Technology")
        db.add_all([dept_ai, dept_cse, dept_it])
        db.flush()

        # 4. Seed Skills
        skill_names = [
            ("Python", "Programming"),
            ("Machine Learning", "AI / ML"),
            ("Generative AI", "AI / ML"),
            ("UI/UX", "Design"),
            ("Figma", "Design"),
            ("FastAPI", "Backend"),
            ("React", "Frontend"),
            ("TypeScript", "Frontend"),
            ("PostgreSQL", "Database"),
            ("JWT", "Backend"),
            ("Cloud", "DevOps"),
            ("AWS", "DevOps")
        ]
        skill_map = {}
        for sname, cat in skill_names:
            sk = Skill(name=sname, category=cat)
            db.add(sk)
            db.flush()
            skill_map[sname] = sk

        pw = hash_password("password123")

        # 5. Bharanidharan S (AI & DS, SNSCE)
        bharani = User(email="sbharanidharan2007@gmail.com", hashed_password=pw, full_name="Bharanidharan S", role=UserRole.STUDENT_MENTOR)
        db.add(bharani)
        db.flush()
        b_profile = UserProfile(
            user_id=bharani.id,
            organization_id=sns.id,
            department_id=dept_ai.id,
            year="3rd Year",
            section="A",
            network_scope=NetworkScopeEnum.MY_ORGANIZATION,
            bio="AI & Data Science student. Building AI Document Classification & Sign Language Translator.",
            github_url="https://github.com/BharanidharanS",
            contribution_points=120,
            xp_level=2
        )
        db.add(b_profile)
        db.add_all([
            UserSkill(user_id=bharani.id, skill_id=skill_map["Python"].id, skill_type=SkillType.CAN_TEACH, proficiency="Advanced", is_verified=True),
            UserSkill(user_id=bharani.id, skill_id=skill_map["Machine Learning"].id, skill_type=SkillType.CAN_TEACH, proficiency="Advanced", is_verified=True),
            UserSkill(user_id=bharani.id, skill_id=skill_map["Generative AI"].id, skill_type=SkillType.CAN_TEACH, proficiency="Intermediate", is_verified=True),
            UserSkill(user_id=bharani.id, skill_id=skill_map["UI/UX"].id, skill_type=SkillType.WANT_TO_LEARN, proficiency="Beginner"),
            UserSkill(user_id=bharani.id, skill_id=skill_map["Figma"].id, skill_type=SkillType.WANT_TO_LEARN, proficiency="Beginner")
        ])

        # 6. Student A (Teaches Python, Wants Figma)
        student_a = User(email="studenta@snsce.ac.in", hashed_password=pw, full_name="Student A", role=UserRole.STUDENT)
        db.add(student_a)
        db.flush()
        sa_profile = UserProfile(user_id=student_a.id, organization_id=sns.id, department_id=dept_cse.id, year="2nd Year", network_scope=NetworkScopeEnum.SELECTED_ORGANIZATIONS)
        db.add(sa_profile)
        db.add_all([
            UserSkill(user_id=student_a.id, skill_id=skill_map["Python"].id, skill_type=SkillType.CAN_TEACH, proficiency="Intermediate"),
            UserSkill(user_id=student_a.id, skill_id=skill_map["Figma"].id, skill_type=SkillType.WANT_TO_LEARN, proficiency="Beginner")
        ])

        # 7. Student B (Teaches Figma & UI/UX, Wants Python)
        student_b = User(email="studentb@snsce.ac.in", hashed_password=pw, full_name="Student B", role=UserRole.STUDENT)
        db.add(student_b)
        db.flush()
        sb_profile = UserProfile(user_id=student_b.id, organization_id=sns.id, department_id=dept_it.id, year="2nd Year", network_scope=NetworkScopeEnum.SELECTED_ORGANIZATIONS)
        db.add(sb_profile)
        db.add_all([
            UserSkill(user_id=student_b.id, skill_id=skill_map["Figma"].id, skill_type=SkillType.CAN_TEACH, proficiency="Advanced"),
            UserSkill(user_id=student_b.id, skill_id=skill_map["UI/UX"].id, skill_type=SkillType.CAN_TEACH, proficiency="Advanced"),
            UserSkill(user_id=student_b.id, skill_id=skill_map["Python"].id, skill_type=SkillType.WANT_TO_LEARN, proficiency="Beginner")
        ])

        # 8. Priya (Backend Student Mentor)
        priya = User(email="priya@snsce.ac.in", hashed_password=pw, full_name="Priya", role=UserRole.STUDENT_MENTOR)
        db.add(priya)
        db.flush()
        p_profile = UserProfile(user_id=priya.id, organization_id=sns.id, department_id=dept_cse.id, year="3rd Year", contribution_points=310, xp_level=4)
        db.add(p_profile)
        p_mentor = MentorProfile(user_id=priya.id, is_active_mentor=True, rating=4.8, projects_helped=18, issues_resolved=31, response_rate=94.0)
        db.add(p_mentor)
        db.add_all([
            UserSkill(user_id=priya.id, skill_id=skill_map["FastAPI"].id, skill_type=SkillType.CAN_TEACH, proficiency="Advanced", is_verified=True),
            UserSkill(user_id=priya.id, skill_id=skill_map["JWT"].id, skill_type=SkillType.CAN_TEACH, proficiency="Advanced", is_verified=True),
            UserSkill(user_id=priya.id, skill_id=skill_map["Python"].id, skill_type=SkillType.CAN_TEACH, proficiency="Advanced", is_verified=True)
        ])

        # 9. Seed Sample Project Doubt
        doubt = ProjectDoubt(
            student_id=student_b.id,
            project_name="Smart Campus Management System",
            category="Backend Development",
            problem_title="JWT authentication returning 401 Unauthorized",
            technology_stack="FastAPI + React + JWT",
            description="Login API works fine and returns token, but calling protected endpoints with Bearer token is returning 401 Unauthorized error.",
            status=DoubtStatus.OPEN
        )
        db.add(doubt)

        # 10. Seed Courses
        c1 = Course(title="React Fundamentals & Ecosystem", description="Master React, components, props, hooks, and Vite.", category="Frontend", price=0.0, is_premium=False)
        c2 = Course(title="Advanced React & State Management", description="Deep dive into Context API, Redux Toolkit, and performance optimization.", category="Frontend", price=299.0, is_premium=True)
        c3 = Course(title="AI / ML Bootcamp & Generative AI", description="Hands-on Machine Learning, PyTorch, and Gemini API integration.", category="AI / ML", price=499.0, is_premium=True)
        db.add_all([c1, c2, c3])
        db.flush()

        m1 = CourseModule(course_id=c1.id, title="Module 1: Introduction to React & Vite", order=1)
        db.add(m1)
        db.flush()
        db.add(Lesson(module_id=m1.id, title="Lesson 1: What is React?", content_text="React is a declarative UI library...", duration_minutes=10, order=1))

        db.commit()
        print("SkillBridge database seeded successfully!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_all()
