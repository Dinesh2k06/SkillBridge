import pytest

def test_reciprocal_matching_and_network_scope(client):
    # Register User A (Teaches Python, Wants Figma)
    res_a = client.post("/api/v1/auth/register", json={
        "email": "match_userA@snsce.ac.in",
        "password": "Password123!",
        "full_name": "Match User A",
        "skills_can_teach": ["Python"],
        "skills_want_to_learn": ["Figma"],
        "network_scope": "My Organization"
    })
    assert res_a.status_code == 201
    token_a = res_a.json()["access_token"]

    # Register User B (Teaches Figma, Wants Python)
    res_b = client.post("/api/v1/auth/register", json={
        "email": "match_userB@snsce.ac.in",
        "password": "Password123!",
        "full_name": "Match User B",
        "skills_can_teach": ["Figma"],
        "skills_want_to_learn": ["Python"],
        "network_scope": "My Organization"
    })
    assert res_b.status_code == 201

    # Query Reciprocal Matches as User A
    headers_a = {"Authorization": f"Bearer {token_a}"}
    match_res = client.get("/api/v1/matches/reciprocal", headers=headers_a)
    assert match_res.status_code == 200
    matches = match_res.json()

    assert len(matches) >= 1
    rec = matches[0]
    assert rec["full_name"] == "Match User B"
    assert rec["can_teach_skill"] == "Figma"
    assert rec["wants_to_learn_skill"] == "Python"
    assert rec["match_score"] > 0.8
