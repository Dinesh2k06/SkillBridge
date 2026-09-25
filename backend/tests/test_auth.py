import pytest

def test_register_and_login(client):
    reg_payload = {
        "email": "unique_teststudent@snsce.ac.in",
        "password": "Password123!",
        "full_name": "Test Student",
        "year": "2nd Year",
        "section": "B",
        "skills_can_teach": ["Python", "FastAPI"],
        "skills_want_to_learn": ["Figma", "UI/UX"],
        "network_scope": "My Organization"
    }
    response = client.post("/api/v1/auth/register", json=reg_payload)
    print("STATUS:", response.status_code)
    print("BODY:", response.json())
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
