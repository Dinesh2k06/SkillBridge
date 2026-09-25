# ðŸŽ“ SkillBridge

> **Learn. Share. Mentor. Build. Grow.**

[![Problem Statement](https://img.shields.io/badge/Problem%20Statement-WEB--04%20Student%20Skill%20Exchange-blue.svg)](#problem-statement)
[![Team](https://img.shields.io/badge/Team-Tech%20Clan-orange.svg)](#team)
[![AI Engine](https://img.shields.io/badge/AI-Google%20Gemini-green.svg)](#5-ai-powered-skill-matching)
[![Stack](https://img.shields.io/badge/Stack-React%20%7C%20FastAPI%20%7C%20PostgreSQL-purple.svg)](#17-technology-stack)

---

## ðŸ‘¥ Team & Project Details

| Attribute | Details |
|---|---|
| **Team Name** | **Tech Clan** |
| **Team Members** | Bharanidharan S, Dinesh S, Madhiyarasu R |
| **Problem Statement** | **WEB-04: Student Skill Exchange Platform** |

> **Problem Statement Description:**
> Develop a web platform where students can exchange knowledge and skills with each other within and across educational organizations.

---

## ðŸ“‹ Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Core Concept](#2-core-concept)
- [3. Organization-Based Foundation](#3-organization-based-foundation)
- [4. Student Skill Profile](#4-student-skill-profile)
- [5. AI-Powered Skill Matching](#5-ai-powered-skill-matching)
- [6. Knowledge Exchange](#6-knowledge-exchange)
- [7. Student Mentor System](#7-student-mentor-system)
- [8. Project Help Hub](#8-project-help-hub)
- [9. Learning Hub](#9-learning-hub)
- [10. Learning + Mentoring Integration](#10-learning--mentoring-integration)
- [11. Skill Verification](#11-skill-verification)
- [12. Reputation and Contribution](#12-reputation-and-contribution)
- [13. Project Collaboration](#13-project-collaboration)
- [14. Organization Skill Network](#14-organization-skill-network)
- [15. Organization-Level Skill Insights](#15-organization-level-skill-insights)
- [16. System Architecture](#16-system-architecture)
- [17. Technology Stack](#17-technology-stack)
- [18. API Structure](#18-api-structure)
- [19. AI Matching Flow](#19-ai-matching-flow)
- [20. Security and Access Control](#20-security-and-access-control)
- [21. User Roles](#21-user-roles)
- [22. End-to-End User Flow](#22-end-to-end-user-flow)
- [23. Project Structure](#23-project-structure)
- [24. Environment Variables](#24-environment-variables)
- [25. Development & Setup](#25-development--setup)
- [26. Complete SkillBridge Ecosystem](#26-complete-skillbridge-ecosystem)
- [27. Tech Stack Summary](#27-tech-stack-summary)
- [28. Team & Roles](#28-team--roles)

---

## 1. Project Overview

**SkillBridge** is an organization-based student knowledge and skill-sharing platform.

The platform begins with **organization selection** as the foundation. Students select their college or organization and then choose whether they want to interact within their organization, with selected external organizations, or across the broader SkillBridge network.

### Key Capabilities

Students can:
- **Share skills** with other students
- **Find people** who can teach the skills they want to learn
- **Exchange knowledge** reciprocally
- **Get help** with project-related doubts
- **Connect** with student mentors
- **Access** structured courses and learning resources
- **Collaborate** with students who have complementary skills
- **Build skill reputation** through meaningful contributions

---

## 2. Core Concept

SkillBridge supports two primary knowledge flows:

### ðŸ”„ Knowledge â†’ Knowledge

Students exchange knowledge directly with other students.

`	ext
Student A
   â”‚
   â”œâ”€ Can Teach: Python
   â”œâ”€ Wants to Learn: UI/UX
   â–¼
SkillBridge Matching
   â”‚
   â–¼
Student B
   â”‚
   â”œâ”€ Can Teach: UI/UX
   â””â”€ Wants to Learn: Python
   â–¼
Skill Exchange
`

### ðŸ“š Money â†’ Knowledge

Students can access structured courses and other learning resources.

`	ext
Student â”€â”€â–º Course / Learning Resource â”€â”€â–º Learn â”€â”€â–º Practice â”€â”€â–º Project â”€â”€â–º Skill Verification
`

---

## 3. Organization-Based Foundation

Organization selection is the foundation of SkillBridge.

During onboarding, students provide:
- **Name**
- **College / Organization**
- **Department**
- **Year of Study**
- **Skills Owned**
- **Skills to Learn**
- **Areas of Interest**

### Preferred Interaction Scope

Students can select their preferred interaction scope:
- ðŸ¢ **My Organization**: Connect only within current college/organization.
- ðŸŒ **External Organizations**: Connect with selected peer organizations.
- ðŸ”„ **Both**: Access the complete SkillBridge network.

---

## 4. Student Skill Profile

Each student profile on SkillBridge includes:

- **Personal Information**: Name, Department, Year, Organization
- **Skill Proficiency**: Skills offered, skills required, level of expertise
- **Projects**: Active and completed project showcases
- **Interests**: Learning & mentoring focus areas
- **Social Proof**: Peer feedback, contributions, and verified skill badges

### Sample Profile Representation

`	ext
Bharani Dharan
AI & Data Science | SNS College of Engineering

Can Teach:
  â€¢ Python
  â€¢ Machine Learning
  â€¢ Generative AI

Wants to Learn:
  â€¢ UI/UX
  â€¢ Figma

Projects:
  â€¢ AI Document Classification
  â€¢ Sign Language Translator

Verified Skills:
  âœ” Python
  âœ” Machine Learning
`

---

## 5. AI-Powered Skill Matching

SkillBridge uses **Google Gemini** as the primary LLM for intelligent semantic processing.

The matching algorithm considers:
- Skills offered vs. Skills required
- Proficiency levels & experience depth
- Organization & network scope preferences
- Project requirements & domain context
- Peer rating & availability

### Reciprocal Skill Matching Example

`	ext
Student A:  Can Teach: Python  â”‚ Wants: Figma
Student B:  Can Teach: Figma   â”‚ Wants: Python

ðŸ’¡ SkillBridge Result: HIGH-CONFIDENCE RECIPROCAL MATCH FOUND!
`

---

## 6. Knowledge Exchange

Students can create and respond to structured skill exchange requests.

### Example Request

`	ext
I can teach:      Python
I want to learn:  Figma
Session Type:     30-minute interactive sessions
`

### Exchange Lifecycle

1. **Create Request** â†’ Specify teaching & learning topics.
2. **AI Match & Accept** â†’ Counterpart accepts exchange request.
3. **Session Execution** â†’ Conduct peer learning session.
4. **Completion & Review** â†’ Submit feedback, ratings, and skill endorsements.

---

## 7. Student Mentor System

SkillBridge empowers experienced students to act as **Peer Mentors**.

### Project Doubt Resolution Workflow

`	ext
Project Doubt â”€â”€â–º AI Classification â”€â”€â–º Skill Identification â”€â”€â–º Mentor Recommendation â”€â”€â–º Session â”€â”€â–º Resolution
`

### Mentor Contributions

Mentors provide:
- Technical explanations & code reviews
- Architecture & debugging guidance
- Documentation & curated learning resources
- Project milestones evaluation

---

## 8. Project Help Hub

The **Project Help Hub** enables students to raise technical questions and get matched with domain experts.

### Doubts Categorization & Attributes

Students submit:
- **Problem Description & Error Logs**
- **Technology Stack** (Python, React, FastAPI, ML, PostgreSQL, UI/UX, Cloud, etc.)
- **Repository Link / Code Snippets**
- **Screenshots & Context**

AI automatically classifies issues and routes them to top-rated student mentors in that category.

---

## 9. Learning Hub

Structured course catalog supporting the **Money â†’ Knowledge** ecosystem.

### Key Components

- **Structured Modules & Lessons**
- **Interactive Quizzes & Skill Assessments**
- **Practical Projects & Guided Challenges**
- **Progress Tracking & Verified Completion Certificates**

---

## 10. Learning + Mentoring Integration

Seamless connection between self-paced course learning and peer mentoring:

`	ext
Course â”€â”€â–º Learn â”€â”€â–º Practice â”€â”€â–º Build Project â”€â”€â–º [Get Stuck?] â”€â”€â–º Help Hub â”€â”€â–º Student Mentor â”€â”€â–º Resolve â”€â”€â–º Verify Skill
`

---

## 11. Skill Verification

Building authentic skill credibility through multi-stage proof:

### Evidence Types
- GitHub Repositories & Real Projects
- Certifications & Course Completion
- Practical Assessment Challenges

### Verification Pipeline

`	ext
Skill Added â”€â”€â–º Evidence Submitted â”€â”€â–º Practical Challenge â”€â”€â–º Peer & Mentor Review â”€â”€â–º Verified Skill Badge
`

---

## 12. Reputation and Contribution

Gamified reputation model encouraging active community participation.

### Earn Points & Reputation By:
- Teaching peer sessions
- Completing reciprocal exchanges
- Resolving technical doubts in Project Help Hub
- Achieving verified mentor status
- Publishing high-quality feedback

---

## 13. Project Collaboration

SkillBridge connects students with complementary skills to build multi-disciplinary project teams.

`	ext
AI/ML Specialist  +  Frontend Developer  +  Backend Developer  +  UI/UX Designer
                         â”‚
                         â–¼
             ðŸš€ High-Impact Project Team
`

---

## 14. Organization Skill Network

Hierarchical network view per organization:

`	ext
SNS College of Engineering
 â”œâ”€â”€ AI / Machine Learning
 â”œâ”€â”€ Web Development (React / FastAPI)
 â”œâ”€â”€ Mobile Development (Flutter)
 â”œâ”€â”€ UI/UX Design
 â”œâ”€â”€ Cybersecurity
 â””â”€â”€ Cloud Computing
`

---

## 15. Organization-Level Skill Insights

Analytics dashboard for organization administrators:

### Available Skills Bar Chart

`	ext
Python       â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ  (High)
AI/ML        â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ    (High)
Web Dev      â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ     (Medium)
UI/UX        â–ˆâ–ˆâ–ˆâ–ˆâ–ˆ       (Medium)
Cloud        â–ˆâ–ˆâ–ˆ         (Emerging)
`

### Skill Demand Matrix

| Skill | Demand Level | Supply |
|---|---|---|
| **React** | ðŸ”´ HIGH | Moderate |
| **Figma** | ðŸ”´ HIGH | Low |
| **Cloud** | ðŸŸ¡ MEDIUM | Low |
| **Flutter** | ðŸŸ¡ MEDIUM | Moderate |
| **Python** | ðŸŸ¢ LOW | High |

---

## 16. System Architecture

`	ext
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
`

---

## 17. Technology Stack

### Frontend
- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Design Tooling**: Lovable

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **AI Model**: Google Gemini API
- **Auth**: JWT Token-based Authentication

---

## 18. API Structure

`	ext
/api
â”œâ”€â”€ /auth            â”€â”€â–º login, register, logout
â”œâ”€â”€ /organizations   â”€â”€â–º list, details, members
â”œâ”€â”€ /users           â”€â”€â–º profile, skills, learning-goals
â”œâ”€â”€ /matches         â”€â”€â–º discover, recommendations
â”œâ”€â”€ /exchanges       â”€â”€â–º create, requests, status
â”œâ”€â”€ /mentors         â”€â”€â–º discover, request, sessions
â”œâ”€â”€ /projects        â”€â”€â–º create, members, doubts
â”œâ”€â”€ /courses         â”€â”€â–º list, details, enrollment
â”œâ”€â”€ /progress        â”€â”€â–º tracking
â””â”€â”€ /ai              â”€â”€â–º skill-extraction, matching, doubt-analysis
`

---

## 19. AI Matching Flow

`	ext
Student Profile â”€â”€â–º FastAPI Backend â”€â”€â–º Matching Engine â”€â”€â–º Gemini AI â”€â”€â–º Match Analysis â”€â”€â–º Recommended Matches
`

---

## 20. Security and Access Control

- **Organization Verification**: Email & domain verification.
- **RBAC**: Role-based access control (Student, Mentor, Org Admin, Platform Admin).
- **Data Protection**: Encrypted auth tokens, secured API endpoints, granular profile privacy settings.

---

## 21. User Roles

| Role | Permissions & Capabilities |
|---|---|
| **Student** | Create profile, request skill exchange, join courses, post doubts, build projects |
| **Student Mentor** | Accept mentorship requests, resolve doubts, conduct sessions, endorse skills |
| **Organization Admin** | Manage org members, verify student identity, view skill analytics |
| **Platform Admin** | Platform-wide moderation, global course catalog, organization onboarding |

---

## 22. End-to-End User Flow

`	ext
Register â”€â”€â–º Select Org â”€â”€â–º Set Scope â”€â”€â–º Build Profile â”€â”€â–º Add Skills/Goals â”€â”€â–º SkillBridge Dashboard
  â”‚
  â”œâ”€â–º Find Skill Exchange â”€â”€â–º AI Match â”€â”€â–º Session â”€â”€â–º Feedback â”€â”€â”€â”€â”€â”€â”
  â”œâ”€â–º Post Doubt â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–º Mentor Match â”€â”€â–º Resolve â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â–º Skill Growth â”€â”€â–º Verification â”€â”€â–º Become Mentor!
  â””â”€â–º Join Course â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–º Practice â”€â”€â–º Complete Project â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
`

---

## 23. Project Structure

`	ext
SkillBridge/
â”œâ”€â”€ frontend/
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ pages/
â”‚   â”‚   â”œâ”€â”€ layouts/
â”‚   â”‚   â”œâ”€â”€ hooks/
â”‚   â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â””â”€â”€ types/
â”‚   â”œâ”€â”€ package.json
â”‚   â””â”€â”€ README.md
â”œâ”€â”€ backend/
â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”œâ”€â”€ main.py
â”‚   â”‚   â”œâ”€â”€ api/
â”‚   â”‚   â”œâ”€â”€ models/
â”‚   â”‚   â”œâ”€â”€ schemas/
â”‚   â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â””â”€â”€ ai/
â”‚   â””â”€â”€ requirements.txt
â”œâ”€â”€ .env.example
â”œâ”€â”€ .gitignore
â””â”€â”€ README.md
`

---

## 24. Environment Variables

Create a .env file in the root directory:

`env
# Backend Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/skillbridge_db

# Google Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key_here

# JWT Authentication Secret
SECRET_KEY=your_super_secret_jwt_key

# Frontend API URL
VITE_API_BASE_URL=http://localhost:8000/api
`

---

## 25. Development & Setup

### Frontend Setup

`ash
cd frontend
npm install
npm run dev
`

### Backend Setup

`ash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
`

---

## 26. Complete SkillBridge Ecosystem

`	ext
                                  SKILLBRIDGE ECOSYSTEM
                                           â”‚
                                 ORGANIZATION SELECTION
                                           â”‚
                    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                    â–¼                                             â–¼
             MY ORGANIZATION                               EXTERNAL NETWORK
                    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                           â–¼
                                    STUDENT PROFILE
                                           â”‚
                    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                    â–¼                      â–¼                      â–¼
                CAN TEACH            WANTS TO LEARN            PROJECTS
                    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                           â–¼
                                    AI MATCH ENGINE
                                           â”‚
             â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
             â–¼                             â–¼                             â–¼
    KNOWLEDGE EXCHANGE               STUDENT MENTOR                 LEARNING HUB
   (Peer-to-Peer Learn)            (Doubt Resolution)            (Structured Courses)
             â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                           â–¼
                                    SKILL VERIFICATION
                                           â”‚
                                     REPUTATION / XP
                                           â”‚
                                     BECOME MENTOR!
`

---

## 27. Tech Stack Summary

| Component | Technology | Description |
|---|---|---|
| **Frontend UI** | Lovable / React / Vite | Modern responsive user interface |
| **Language** | TypeScript | Type-safe frontend application |
| **Styling** | Tailwind CSS | Utility-first styling design system |
| **Backend API** | FastAPI | High-performance Python async backend |
| **Database** | PostgreSQL | Relational storage for user profiles & exchanges |
| **AI Processing** | Google Gemini API | Intelligent skill extraction, classification & matching |
| **Authentication** | OAuth2 / JWT | Secure token-based user sessions |

---

## 28. Team & Roles

### Tech Clan

- **Bharanidharan S** - Development / AI / System Design
- **Dinesh S** - Development / Backend / Integration
- **Madhiyarasu R** - Development / Frontend / UI

---

<p align="center">
  <b>Built with â¤ï¸ by Tech Clan for Student Skill Sharing</b>
</p>