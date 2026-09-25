import pytest
from app.models.course import Course

def test_course_learning_and_mentor_conversion(client, db):
    # Create test course in test DB
    c = Course(title="React Fundamentals", description="React course", price=0.0)
    db.add(c)
    db.commit()
    db.refresh(c)

    # Register student
    res = client.post("/api/v1/auth/register", json={
        "email": "learner@snsce.ac.in",
        "password": "Password123!",
        "full_name": "Learner Student",
        "skills_can_teach": ["HTML"],
        "skills_want_to_learn": ["React"]
    })
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # List Courses
    courses_res = client.get("/api/v1/courses/")
    assert courses_res.status_code == 200
    courses = courses_res.json()
    assert len(courses) >= 1
    c_id = courses[0]["id"]

    # Enroll
    enroll_res = client.post(f"/api/v1/courses/{c_id}/enroll", headers=headers)
    assert enroll_res.status_code == 200
    assert enroll_res.json()["status"] == "ACTIVE"

    # Complete Course (100% progress)
    prog_res = client.put(f"/api/v1/courses/{c_id}/progress?progress=100.0", headers=headers)
    assert prog_res.status_code == 200
    assert prog_res.json()["status"] == "COMPLETED"

    # Check that student was awarded points and profile reflects completion
    me_res = client.get("/api/v1/auth/me", headers=headers)
    assert me_res.status_code == 200
    me_data = me_res.json()
    assert me_data["contribution_points"] >= 50
    assert me_data["is_mentor"] == True
