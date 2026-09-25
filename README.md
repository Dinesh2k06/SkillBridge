# SkillBridge

> **Learn. Share. Mentor. Build. Grow.**

## Team

**Team Name:** Tech Clan

### Team Members

- Bharanidharan S
- Dinesh S
- Madhiyarasu R

---

## Problem Statement

**WEB-04: Student Skill Exchange Platform**

> Develop a web platform where students can exchange knowledge and skills with each other.

---

## 1. Project Overview

**SkillBridge** is an organization-based student knowledge and skill-sharing platform.

The platform begins with **organization selection** as the foundation. Students select their college or organization and then choose whether they want to interact within their organization, with selected external organizations, or across the broader SkillBridge network.

Students can:

- Share skills with other students
- Find people who can teach the skills they want to learn
- Exchange knowledge reciprocally
- Get help with project-related doubts
- Connect with student mentors
- Access structured courses and learning resources
- Collaborate with students who have complementary skills
- Build skill reputation through meaningful contributions

---

# 2. Core Concept

SkillBridge supports two primary knowledge flows.

### Knowledge → Knowledge

Students exchange knowledge directly with other students.

```text
Student A
   |
   | Can Teach: Python
   | Wants to Learn: UI/UX
   |
   v
SkillBridge Matching
   |
   v
Student B
   |
   | Can Teach: UI/UX
   | Wants to Learn: Python
   |
   v
Skill Exchange
```

### Money → Knowledge

Students can access structured courses and other learning resources.

```text
Student
   |
   v
Course / Learning Resource
   |
   v
Learn
   |
   v
Practice
   |
   v
Project
   |
   v
Skill Verification
```

---

# 3. Organization-Based Foundation

Organization selection is the base of SkillBridge.

During onboarding, students provide:

- Name
- College / Organization
- Department
- Year
- Skills
- Skills they want to learn
- Areas of interest

Students can select their preferred interaction scope:

- **My Organization**
- **External Organizations**
- **Both**

The selected organization and network scope are used when discovering students, mentors, and collaborators.

---

# 4. Student Skill Profile

Each student has a SkillBridge profile containing:

- Personal information
- Organization
- Department
- Year
- Skills offered
- Skills required
- Skill proficiency
- Projects
- Learning interests
- Mentoring interests
- Contributions
- Feedback
- Skill verification status

### Example

```text
Bharani Dharan
AI & Data Science
SNS College of Engineering

Can Teach:
- Python
- Machine Learning
- Generative AI

Wants to Learn:
- UI/UX
- Figma

Projects:
- AI Document Classification
- Sign Language Translator

Verified Skills:
- Python
- Machine Learning
```

---

# 5. AI-Powered Skill Matching

SkillBridge uses **Google Gemini** as the primary LLM for intelligent processing.

The matching system can consider:

- Skills offered
- Skills required
- Skill level
- Organization
- Learning interests
- Project requirements
- Mentoring requirements
- Preferred network scope

## Reciprocal Matching

Example:

```text
Student A
Can Teach  -> Python
Wants      -> Figma

Student B
Can Teach  -> Figma
Wants      -> Python
```

SkillBridge identifies the relationship as a potential **reciprocal skill match**.

This provides a clear reason for both students to connect.

---

# 6. Knowledge Exchange

Students can create skill exchange requests.

### Example

```text
I can teach:
Python

I want to learn:
Figma

Preferred:
30-minute sessions
```

A suitable student can accept the exchange request.

The platform can then support:

- Exchange requests
- Request acceptance / rejection
- Communication
- Learning sessions
- Exchange completion
- Feedback
- Ratings

---

# 7. Student Mentor System

SkillBridge allows experienced students to act as **peer mentors**.

Students developing projects can raise technical doubts on the platform.

### Example

```text
Project:
Campus Management System

Technology:
FastAPI + React

Problem:
JWT authentication is returning 401.

Category:
Backend Development
```

SkillBridge identifies students with relevant skills and recommends suitable mentors.

### Mentor Matching Flow

```text
Project Doubt
      |
      v
AI Classification
      |
      v
Identify Required Skills
      |
      v
Find Suitable Student Mentors
      |
      v
Mentor Request
      |
      v
Discussion / Session
      |
      v
Problem Resolution
```

Mentors can provide:

- Technical explanations
- Project guidance
- Code guidance
- Documentation
- Learning resources
- Debugging guidance
- Project reviews

---

# 8. Project Help Hub

The **Project Help Hub** allows students to raise project-related doubts.

Students can provide:

- Problem description
- Technology used
- Error message
- Screenshots
- Code snippets
- Project information
- Repository reference

Possible categories include:

- Python
- Java
- React
- FastAPI
- Machine Learning
- Database
- UI/UX
- Cloud
- APIs
- Authentication
- Deployment

The system analyzes the problem and recommends relevant student mentors.

---

# 9. Learning Hub

SkillBridge includes a structured learning area for courses and learning resources.

### Learning Components

- Courses
- Modules
- Lessons
- Quizzes
- Learning paths
- Practical projects
- Skill assessments
- Course progress
- Completion status

The Learning Hub supports the **Money → Knowledge** learning model through structured course-based learning.

---

# 10. Learning + Mentoring Integration

Learning and peer interaction are connected.

```text
Course
  |
  v
Learn
  |
  v
Practice
  |
  v
Build Project
  |
  v
Get Stuck?
  |
  v
Project Help Hub
  |
  v
Student Mentor
  |
  v
Resolve Problem
  |
  v
Complete Project
  |
  v
Skill Verification
```

---

# 11. Skill Verification

SkillBridge can provide different ways to establish skill credibility.

### Skill Evidence

Students can provide:

- Projects
- Certifications
- Portfolio
- GitHub projects
- Course completion
- Practical challenges

### Verification Flow

```text
Skill Added
    |
    v
Evidence / Assessment
    |
    v
Practical Challenge
    |
    v
Peer Feedback
    |
    v
Verified Skill
```

Verified skills can be displayed on the student's SkillBridge profile.

---

# 12. Reputation and Contribution

Students can build reputation through meaningful participation.

Contributions can include:

- Teaching another student
- Completing a skill exchange
- Helping with project doubts
- Mentoring
- Completing learning activities
- Providing useful feedback
- Participating in projects

The platform can maintain:

- Contribution points
- Mentor ratings
- Peer feedback
- Completed exchanges
- Resolved project issues
- Verified skills

---

# 13. Project Collaboration

SkillBridge can connect students with complementary skills.

Example:

```text
AI/ML Student
      +
Frontend Student
      +
Backend Student
      +
UI/UX Student
      |
      v
Project Team
```

Students can discover potential collaborators based on project requirements and skill compatibility.

---

# 14. Organization Skill Network

Each organization can have its own SkillBridge network.

Example:

```text
SNS College of Engineering
|
+-- AI / ML
+-- Web Development
+-- Mobile Development
+-- UI/UX
+-- Cybersecurity
+-- Cloud
+-- Other Skills
```

Students can discover available skills and potential mentors within their organization.

If a suitable person is unavailable, students can expand their search according to their selected network scope.

---

# 15. Organization-Level Skill Insights

SkillBridge can provide organization-level insights such as:

### Available Skills

```text
Python       ██████████
AI/ML        ████████
Web Dev      ███████
UI/UX        █████
Cloud        ███
```

### Skill Demand

```text
React        HIGH
Figma        HIGH
Cloud        MEDIUM
Flutter      MEDIUM
Python       LOW
```

These insights can help identify differences between skills available within the organization and skills students want to learn.

---

# 16. System Architecture

```text
                         +-----------------------+
                         |         USER          |
                         |   Student / Mentor    |
                         +-----------+-----------+
                                     |
                                     v
                         +-----------------------+
                         |     React + TS        |
                         |   Frontend / UI       |
                         +-----------+-----------+
                                     |
                              REST API / HTTPS
                                     |
                                     v
                         +-----------------------+
                         |       FastAPI         |
                         |      Backend API      |
                         +-----------+-----------+
                                     |
              +----------------------+----------------------+
              |                      |                      |
              v                      v                      v
      +---------------+      +---------------+      +---------------+
      | Authentication|      | Business Logic|      | AI Services   |
      | & Authorization|     | & Matching    |      | Gemini API    |
      +---------------+      +---------------+      +---------------+
              |                      |                      |
              +----------------------+----------------------+
                                     |
                                     v
                         +-----------------------+
                         |      PostgreSQL       |
                         |       Database        |
                         +-----------------------+
                                     |
              +----------------------+----------------------+
              |                      |                      |
              v                      v                      v
          Students               Skills                 Projects
          Profiles              Courses               Mentoring
          Organizations         Exchanges             Feedback
```

---

# 17. Technology Stack

## Frontend

The frontend will be developed using **Lovable**, with the application based on:

- React
- TypeScript
- Vite
- Tailwind CSS
- Responsive web UI

### Frontend Responsibilities

- User onboarding
- Organization selection
- Student dashboard
- Skill profiles
- Skill discovery
- AI matching interface
- Skill exchange
- Mentor discovery
- Project Help Hub
- Learning Hub
- Course interface
- Project collaboration
- Notifications
- Profile and reputation

---

## Backend

### FastAPI

The backend will use **Python FastAPI**.

Responsibilities:

- REST API
- Authentication and authorization
- User management
- Organization management
- Skill management
- Matching logic
- Skill exchange requests
- Mentor management
- Project help requests
- Course management
- Progress tracking
- Feedback and ratings
- Notifications
- AI service integration

---

## AI / LLM

### Google Gemini

Gemini will be used as the primary LLM.

Potential AI responsibilities include:

- Skill extraction
- Intelligent skill matching
- Mentor matching
- Project doubt classification
- Learning recommendations
- Personalized learning paths
- Course recommendations
- Project guidance
- Question classification

### Example: Project Doubt Analysis

```text
Input:
"JWT authentication is not working in my FastAPI project."

AI Output:

Category:
Backend

Technology:
FastAPI

Topic:
Authentication

Required Skills:
FastAPI + JWT

Recommended:
Backend Mentors
```

---

## Database

### PostgreSQL

The system will use PostgreSQL for structured application data.

### Main Entities

```text
Users
Organizations
Departments
Skills
UserSkills
LearningGoals
SkillMatches
ExchangeRequests
Mentors
MentorshipRequests
Projects
ProjectDoubts
DoubtResponses
Courses
CourseModules
Enrollments
Progress
Assessments
Feedback
Ratings
Notifications
```

### Simplified Relationship

```text
Organization
     |
     +-- Users
           |
           +-- Skills
           +-- Learning Goals
           +-- Projects
           +-- Exchanges
           +-- Mentorship
           +-- Courses
           +-- Feedback
```

---

# 18. API Structure

```text
/api
|
+-- /auth
|   +-- login
|   +-- register
|   +-- logout
|
+-- /organizations
|   +-- list
|   +-- details
|   +-- members
|
+-- /users
|   +-- profile
|   +-- skills
|   +-- learning-goals
|
+-- /matches
|   +-- discover
|   +-- recommendations
|
+-- /exchanges
|   +-- create
|   +-- requests
|   +-- status
|
+-- /mentors
|   +-- discover
|   +-- request
|   +-- sessions
|
+-- /projects
|   +-- create
|   +-- members
|   +-- doubts
|
+-- /courses
|   +-- list
|   +-- details
|   +-- enrollment
|
+-- /progress
|   +-- tracking
|
+-- /ai
    +-- skill-extraction
    +-- matching
    +-- doubt-analysis
    +-- recommendations
```

---

# 19. AI Matching Flow

```text
Student Profile
      |
      +-- Organization
      +-- Skills
      +-- Learning Goals
      +-- Experience
      +-- Project Requirements
      |
      v
FastAPI Backend
      |
      v
Matching Engine
      |
      v
Gemini AI
      |
      v
Match Analysis
      |
      +----------+----------+
      |          |          |
      v          v          v
   Skill      Mentor      Project
   Match      Match       Match
      |          |          |
      +----------+----------+
                 |
                 v
        Recommended Users
```

---

# 20. Security and Access Control

Since SkillBridge is organization-based, access control is an important part of the system.

The platform should support:

- Authentication
- Organization verification
- Role-based access
- Organization-level access control
- Student and mentor permissions
- Protected APIs
- Input validation
- Secure password handling
- Controlled profile visibility
- Reporting and blocking mechanisms

### Example

```text
Student
  |
  v
Organization
  |
  v
Allowed Network
  |
  v
Discover Students
  |
  +-- Learn
  +-- Exchange
  +-- Mentor
  +-- Collaborate
```

---

# 21. User Roles

## Student

Can:

- Create profile
- Add skills
- Add learning goals
- Discover matches
- Exchange skills
- Request mentorship
- Raise project doubts
- Join courses
- Work on projects
- Provide feedback

## Student Mentor

Can additionally:

- Accept mentorship requests
- Resolve project doubts
- Conduct sessions
- Provide project guidance
- Receive mentor feedback

## Organization Admin

Can:

- Manage organization
- Verify users
- Manage organization access
- Manage mentors
- Manage courses
- Monitor activity
- View organization-level insights

## Platform Admin

Can:

- Manage organizations
- Manage platform users
- Manage global content
- Manage platform settings
- Handle reports and moderation

---

# 22. End-to-End User Flow

```text
                    REGISTER
                       |
                       v
              SELECT ORGANIZATION
                       |
                       v
              SELECT NETWORK SCOPE
                       |
                       v
                BUILD PROFILE
                       |
                       v
             ADD SKILLS / GOALS
                       |
                       v
              ENTER SKILLBRIDGE
                       |
       +---------------+----------------+
       |               |                |
       v               v                v
  Find Skill       Need Help         Learn
       |               |                |
       v               v                v
  AI Matching     Project Doubt      Course
       |               |                |
       v               v                v
Skill Exchange    Student Mentor      Practice
       |               |                |
       v               v                v
   Feedback       Problem Solved     Project
       |               |                |
       +---------------+----------------+
                       |
                       v
                 SKILL GROWTH
                       |
                       v
                SKILL VERIFICATION
                       |
                       v
                 BUILD REPUTATION
                       |
                       v
                  BECOME MENTOR
                       |
                       v
               HELP OTHER STUDENTS
```

---

# 23. Project Structure

```text
SkillBridge/
|
+-- frontend/
|   +-- src/
|   |   +-- components/
|   |   +-- pages/
|   |   +-- layouts/
|   |   +-- hooks/
|   |   +-- services/
|   |   +-- types/
|   |   +-- utils/
|   +-- public/
|   +-- package.json
|   +-- README.md
|
+-- backend/
|   +-- app/
|   |   +-- main.py
|   |   +-- api/
|   |   +-- models/
|   |   +-- schemas/
|   |   +-- services/
|   |   +-- core/
|   |   +-- database/
|   |   +-- ai/
|   +-- requirements.txt
|   +-- README.md
|
+-- docs/
|   +-- architecture/
|   +-- api/
|   +-- database/
|
+-- .env.example
+-- .gitignore
+-- README.md
```

---

# 24. Environment Variables

```env
# Backend
DATABASE_URL=

# Gemini
GEMINI_API_KEY=

# Authentication
SECRET_KEY=

# Frontend
VITE_API_BASE_URL=
```

Sensitive credentials must not be committed to the repository.

---

# 25. Development

## Frontend

```bash
npm install
npm run dev
```

## Backend

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The exact commands may be adjusted according to the final project configuration.

---

# 26. Complete SkillBridge Ecosystem

```text
                         SKILLBRIDGE
                              |
                     ORGANIZATION
                       SELECTION
                              |
              +---------------+---------------+
              |                               |
       MY ORGANIZATION                 EXTERNAL NETWORK
              |                               |
              +---------------+---------------+
                              |
                       STUDENT PROFILE
                              |
              +---------------+---------------+
              |               |               |
          CAN TEACH      WANT TO LEARN    PROJECTS
              |               |               |
              +---------------+---------------+
                              |
                       AI MATCH ENGINE
                              |
       +----------------------+----------------------+
       |                      |                      |
       v                      v                      v
KNOWLEDGE EXCHANGE      STUDENT MENTOR        LEARNING HUB
       |                      |                      |
Student <-> Student     Student -> Mentor     Course -> Student
       |                      |                      |
       +----------------------+----------------------+
                              |
                       SKILL GROWTH
                              |
              +---------------+---------------+
              |               |               |
          Challenge        Project          Course
              |               |               |
              +---------------+---------------+
                              |
                       SKILL VERIFICATION
                              |
                       REPUTATION / XP
                              |
                        BECOME MENTOR
                              |
                     HELP OTHER STUDENTS
                              |
                       NETWORK GROWS
```

---

# 27. Tech Stack Summary

| Layer | Technology |
|---|---|
| Frontend Development | Lovable |
| Frontend Framework | React |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Backend | FastAPI |
| Backend Language | Python |
| Database | PostgreSQL |
| LLM | Google Gemini |
| API Communication | REST API |
| Authentication | Token-based Authentication |
| AI Integration | Gemini API |
| Version Control | Git / GitHub |

---

# 28. Team

## Tech Clan

| Member | Role |
|---|---|
| **Bharanidharan S** | Development / AI / System Design |
| **Dinesh S** | Development / Backend / Integration |
| **Madhiyarasu R** | Development / Frontend / UI |

---

## Problem Statement Reference

**WEB-04 — Student Skill Exchange Platform**

> Develop a web platform where students can exchange knowledge and skills with each other.

**Team:** Tech Clan

**Members:** Bharanidharan S, Dinesh S, Madhiyarasu R

---

## SkillBridge

> **Learn. Share. Mentor. Build. Grow.**
#   S k i l l B r i d g e  
 