# 🚀 SkillBridge FastAPI Backend

The backend engine for **SkillBridge** — an organization-based student knowledge network connecting learners, peer mentors, and collaborators.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Python FastAPI 0.135+
- **ORM & Database**: SQLAlchemy 2.0+ (SQLite / PostgreSQL)
- **Authentication**: JWT Tokens (HS256) & SHA-256 Hashing
- **AI Integration**: Google Gemini API (Skill Extraction, Doubt Classification & Matching)
- **Validation**: Pydantic v2
- **Testing**: Pytest & FastAPI TestClient

---

## 📁 Directory Layout

```text
backend/
├── app/
│   ├── main.py                 # Application entrypoint & CORS middleware
│   ├── core/
│   │   ├── config.py           # Settings & environment configuration
│   │   ├── database.py         # SQLAlchemy engine & session factory
│   │   └── security.py         # Password hashing & JWT token management
│   ├── models/                 # Database ORM Models
│   │   ├── organization.py     # Organization, Department, ApprovedExternalOrg
│   │   ├── user.py             # User, UserProfile, Skill, UserSkill, UserGoal
│   │   ├── exchange.py         # SkillExchangeRequest, SkillMatch
│   │   ├── mentor.py           # MentorProfile, ProjectDoubt, MentorshipSession
│   │   └── course.py           # Course, CourseModule, Lesson, Enrollment
│   ├── schemas/                # Pydantic Schemas
│   │   ├── auth.py, user.py, organization.py, exchange.py, mentor.py, course.py, ai.py
│   ├── services/               # Core Business Logic
│   │   ├── auth_service.py     # User registration & JWT auth
│   │   ├── matching_service.py # Reciprocal Skill Matching Engine & Network Rules
│   │   ├── mentor_service.py   # Project Help Hub & AI mentor scoring
│   │   └── course_service.py   # Course completion & Peer Mentor transition
│   ├── ai/
│   │   └── gemini_service.py   # Google Gemini AI Client & Fallback Engine
│   └── api/
│       ├── deps.py             # Auth dependencies & DB session injection
│       └── v1/                 # REST API Routers (/auth, /organizations, /users, /matches, /exchanges, /mentors, /projects/doubts, /courses, /ai)
├── tests/                      # Automated Pytest suite
├── seed_data.py                # Database initial seeder script
├── requirements.txt            # Dependencies list
└── .env.example                # Environment configuration template
```

---

## 🔌 API Endpoints Summary

### 🔑 Authentication (`/api/v1/auth`)
- `POST /register`: Register new student profile with skills & organization details.
- `POST /login`: Authenticate student & receive JWT access token.
- `GET /me`: Get authenticated student profile, contribution points, and XP level.

### 🏢 Organizations & Network (`/api/v1/organizations`)
- `GET /`: List all verified colleges & institutions.
- `GET /{org_id}/departments`: List departments for a specific college.

### 🔄 Reciprocal Skill Matching (`/api/v1/matches`)
- `GET /reciprocal`: Returns reciprocal skill matches (User A teaches X & wants Y; User B teaches Y & wants X) filtered by student network scope (**My Organization**, **Selected Organizations**, **Open Network**).

### 🤝 Knowledge Exchange (`/api/v1/exchanges`)
- `POST /request`: Send skill exchange request to peer student.
- `GET /requests`: List incoming & outgoing exchange requests.
- `PUT /requests/{id}/status`: Accept, reject, or complete exchange session with rating & feedback.

### 🆘 Project Help Hub & Mentors (`/api/v1/projects/doubts` & `/api/v1/mentors`)
- `POST /projects/doubts/`: Post a project doubt (e.g., *FastAPI + JWT 401 error*). Automatically runs Gemini AI classification and calculates mentor match percentages (96% Match, 91% Match, 84% Match).
- `GET /projects/doubts/`: View trending project doubts feed.
- `POST /projects/doubts/{id}/session`: Request mentorship session (Chat, Live session, Code review, Solution, Challenge).

### 📚 Learning Hub & Courses (`/api/v1/courses`)
- `GET /courses/`: List free community & premium courses.
- `POST /courses/{id}/enroll`: Enroll student in a course.
- `PUT /courses/{id}/progress`: Update lesson progress (Reaching 100% awards +50 Contribution Points & prompts transition to Peer Mentor!).

### 🤖 Google Gemini AI Integration (`/api/v1/ai`)
- `POST /ai/analyze-doubt`: Direct Gemini AI project doubt classification.
- `POST /ai/extract-skills`: Direct Gemini AI skill extraction from text.

---

## 🚀 How to Run

### 1. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 2. Seed Database
Run the initial seed script to populate sample organizations, test student accounts, courses, and project doubts:
```bash
python seed_data.py
```

### 3. Start Development Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Interactive API Documentation will be available at:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🧪 Running Automated Tests

Run the full Pytest test suite:
```bash
pytest tests/ -v
```
