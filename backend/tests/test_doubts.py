import pytest

def test_project_help_hub_and_mentor_recommendations(client):
    # Register Mentor (Priya)
    res_m = client.post("/api/v1/auth/register", json={
        "email": "priya_mentor_unique@snsce.ac.in",
        "password": "Password123!",
        "full_name": "Priya Mentor",
        "skills_can_teach": ["FastAPI", "JWT", "Python"],
        "skills_want_to_learn": ["Cloud"]
    })
    assert res_m.status_code == 201

    # Register Student needing help
    res_s = client.post("/api/v1/auth/register", json={
        "email": "stuck_student_unique@snsce.ac.in",
        "password": "Password123!",
        "full_name": "Stuck Student",
        "skills_can_teach": ["Figma"],
        "skills_want_to_learn": ["FastAPI"]
    })
    assert res_s.status_code == 201
    token_s = res_s.json()["access_token"]
    headers_s = {"Authorization": f"Bearer {token_s}"}

    # Post Project Doubt
    doubt_payload = {
        "project_name": "Campus Management System",
        "category": "Backend Development",
        "problem_title": "JWT authentication returning 401 Unauthorized",
        "technology_stack": "FastAPI + React + JWT",
        "description": "Protected endpoints returning 401 error after login."
    }
    post_res = client.post("/api/v1/projects/doubts/", json=doubt_payload, headers=headers_s)
    assert post_res.status_code == 201
    doubt_data = post_res.json()

    assert doubt_data["problem_title"] == "JWT authentication returning 401 Unauthorized"
    assert doubt_data["category"] == "Backend Development"
    assert "recommended_mentors" in doubt_data
    
    # Check mentor recommendations list
    recs = doubt_data["recommended_mentors"]
    assert len(recs) >= 1
    assert recs[0]["full_name"] == "Priya Mentor"
    assert recs[0]["match_percentage"] >= 80.0
