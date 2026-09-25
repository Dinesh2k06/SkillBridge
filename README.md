# ðŸŽ“ SkillBridge

> **Learn. Share. Mentor. Build. Grow.**

[![Problem Statement](https://img.shields.io/badge/Problem%20Statement-WEB--04%20Student%20Skill%20Exchange-blue.svg)](#problem-statement-reference)
[![Team](https://img.shields.io/badge/Team-Tech%20Clan-orange.svg)](#28-team)
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
> Develop a web platform where students can exchange knowledge and skills with each other.

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
- [25. Development](#25-development)
- [26. Complete SkillBridge Ecosystem](#26-complete-skillbridge-ecosystem)
- [27. Tech Stack Summary](#27-tech-stack-summary)
- [28. Team & Problem Statement Reference](#28-team)

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

## 2. Core Concept

SkillBridge supports two primary knowledge flows.

### Knowledge â†’ Knowledge

Students exchange knowledge directly with other students.

`mermaid
graph TD
    subgraph KnowledgeExchange ["2D Peer Knowledge Exchange Flow"]
        StudentA["Student A<br/>â€¢ Can Teach: Python<br/>â€¢ Wants to Learn: UI/UX"] --> Matching["SkillBridge Matching Engine"]
        StudentB["Student B<br/>â€¢ Can Teach: UI/UX<br/>â€¢ Wants to Learn: Python"] --> Matching
        Matching --> Exchange["Peer Skill Exchange Session"]
    end
`

### Money â†’ Knowledge

Students can access structured courses and other learning resources.

`mermaid
graph LR
    subgraph CourseFlow ["2D Course & Verification Flow"]
        Student["Student"] --> Course["Course / Learning Resource"] --> Learn["Learn"] --> Practice["Practice"] --> Project["Build Project"] --> SkillVerification["Skill Verification"]
    end
`

---

## 3. Organization-Based Foundation

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

## 4. Student Skill Profile

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

### Example Profile

`	ext
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
`

---

## 5. AI-Powered Skill Matching

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

### Reciprocal Matching Example

`	ext
Student A
Can Teach  -> Python
Wants      -> Figma

Student B
Can Teach  -> Figma
Wants      -> Python
`

SkillBridge identifies the relationship as a potential **reciprocal skill match**. This provides a clear reason for both students to connect.

`mermaid
graph TD
    subgraph ReciprocalMatching ["2D Reciprocal Matching Flow"]
        SA["Student A<br/>Can Teach: Python | Wants: Figma"] <--> SB["Student B<br/>Can Teach: Figma | Wants: Python"]
        SA <--> GeminiAI["Google Gemini Matcher"] <--> SB
    end
`

---

## 6. Knowledge Exchange

Students can create skill exchange requests.

### Example Request

`	ext
I can teach:
Python

I want to learn:
Figma

Preferred:
30-minute sessions
`

A suitable student can accept the exchange request. The platform can then support:

- Exchange requests
- Request acceptance / rejection
- Communication
- Learning sessions
- Exchange completion
- Feedback
- Ratings

---

## 7. Student Mentor System

SkillBridge allows experienced students to act as **peer mentors**.

Students developing projects can raise technical doubts on the platform.

### Example Doubt

`	ext
Project:
Campus Management System

Technology:
FastAPI + React

Problem:
JWT authentication is returning 401.

Category:
Backend Development
`

SkillBridge identifies students with relevant skills and recommends suitable mentors.

### Mentor Matching Flow

`mermaid
graph TD
    subgraph MentorWorkflow ["2D Mentor Matching Flow"]
        Doubt["Project Doubt Raised"] --> AICat["AI Classification (Gemini)"]
        AICat --> IdentifySkills["Identify Required Skills"]
        IdentifySkills --> FindMentors["Find Suitable Student Mentors"]
        FindMentors --> Request["Mentor Request Sent"]
        Request --> Session["Discussion / Mentoring Session"]
        Session --> Resolution["Problem Resolution"]
    end
`

Mentors can provide:

- Technical explanations
- Project guidance
- Code guidance
- Documentation
- Learning resources
- Debugging guidance
- Project reviews

---

## 8. Project Help Hub

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

## 9. Learning Hub

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

The Learning Hub supports the **Money â†’ Knowledge** learning model through structured course-based learning.

---

## 10. Learning + Mentoring Integration

Learning and peer interaction are connected.

`mermaid
graph TD
    subgraph LearningMentoringFlow ["2D Learning + Mentoring Integration Flow"]
        Course["Course"] --> Learn["Learn"] --> Practice["Practice"] --> Build["Build Project"]
        Build --> CheckStuck{"Get Stuck?"}
        CheckStuck -- Yes --> HelpHub["Project Help Hub"] --> Mentor["Student Mentor"] --> Resolve["Resolve Problem"] --> Complete["Complete Project"] --> Verify["Skill Verification"]
        CheckStuck -- No --> Complete
    end
`

---

## 11. Skill Verification

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

`mermaid
graph TD
    subgraph VerificationPipeline ["2D Skill Verification Pipeline"]
        Added["Skill Added"] --> Evidence["Evidence / Assessment"]
        Evidence --> Challenge["Practical Challenge"]
        Challenge --> PeerFB["Peer Feedback"]
        PeerFB --> Verified["Verified Skill Badge"]
    end
`

Verified skills can be displayed on the student's SkillBridge profile.

---

## 12. Reputation and Contribution

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

## 13. Project Collaboration

SkillBridge can connect students with complementary skills.

### Example Team Assembly

`mermaid
graph TD
    subgraph TeamCollaboration ["2D Multi-Disciplinary Team Flow"]
        AIML["AI / ML Student"] --> Team["Project Team"]
        Frontend["Frontend Student"] --> Team
        Backend["Backend Student"] --> Team
        UIUX["UI / UX Student"] --> Team
    end
`

Students can discover potential collaborators based on project requirements and skill compatibility.

---

## 14. Organization Skill Network

Each organization can have its own SkillBridge network.

`mermaid
graph TD
    subgraph OrgNetwork ["2D Organization Skill Network Tree"]
        Org["SNS College of Engineering"] --> AIML["AI / ML"]
        Org --> WebDev["Web Development"]
        Org --> Mobile["Mobile Development"]
        Org --> UIUX["UI / UX"]
        Org --> Cyber["Cybersecurity"]
        Org --> Cloud["Cloud"]
        Org --> Other["Other Skills"]
    end
`

Students can discover available skills and potential mentors within their organization. If a suitable person is unavailable, students can expand their search according to their selected network scope.

---

## 15. Organization-Level Skill Insights

SkillBridge can provide organization-level insights such as:

### Available Skills

`	ext
Python       â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
AI/ML        â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
Web Dev      â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
UI/UX        â–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
Cloud        â–ˆâ–ˆâ–ˆ
`

### Skill Demand

| Skill | Demand Level | Supply |
|---|---|---|
| **React** | HIGH | Moderate |
| **Figma** | HIGH | Low |
| **Cloud** | MEDIUM | Low |
| **Flutter** | MEDIUM | Moderate |
| **Python** | LOW | High |

These insights can help identify differences between skills available within the organization and skills students want to learn.

---

## 16. System Architecture

`mermaid
graph TD
    subgraph Architecture ["2D System Architecture Flow"]
        User["USER<br/>Student / Mentor"] --> Frontend["React + TS<br/>Frontend / UI"]
        Frontend -- "REST API / HTTPS" --> Backend["FastAPI<br/>Backend API"]
        
        Backend --> Auth["Authentication & Authorization"]
        Backend --> Logic["Business Logic & Matching"]
        Backend --> AI["AI Services<br/>Gemini API"]
        
        Auth --> DB[("PostgreSQL Database")]
        Logic --> DB
        AI --> DB
        
        DB --- DataNodes["Students / Profiles | Skills / Courses | Projects / Mentoring / Feedback"]
    end
`

---

## 17. Technology Stack

### Frontend

The frontend will be developed using **Lovable**, with the application based on:

- React
- TypeScript
- Vite
- Tailwind CSS
- Responsive web UI

#### Frontend Responsibilities

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

### Backend

#### FastAPI

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

### AI / LLM

#### Google Gemini

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

#### Example: Project Doubt Analysis

`	ext
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
`

---

### Database

#### PostgreSQL

The system will use PostgreSQL for structured application data.

#### Main Entities

- Users
- Organizations
- Departments
- Skills
- UserSkills
- LearningGoals
- SkillMatches
- ExchangeRequests
- Mentors
- MentorshipRequests
- Projects
- ProjectDoubts
- DoubtResponses
- Courses
- CourseModules
- Enrollments
- Progress
- Assessments
- Feedback
- Ratings
- Notifications

#### Simplified Relationship

`mermaid
graph TD
    subgraph DBEntities ["2D Database Entity Relationships"]
        Org["Organization"] --> Users["Users"]
        Users --> Skills["Skills"]
        Users --> Goals["Learning Goals"]
        Users --> Projects["Projects"]
        Users --> Exchanges["Exchanges"]
        Users --> Mentorship["Mentorship"]
        Users --> Courses["Courses"]
        Users --> FB["Feedback"]
    end
`

---

## 18. API Structure

`	ext
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
`

---

## 19. AI Matching Flow

`mermaid
graph TD
    subgraph AIMatchingFlow ["2D AI Skill & Mentor Matching Workflow"]
        Profile["Student Profile<br/>â€¢ Organization<br/>â€¢ Skills<br/>â€¢ Learning Goals<br/>â€¢ Experience<br/>â€¢ Project Requirements"] --> Backend["FastAPI Backend"]
        Backend --> Engine["Matching Engine"]
        Engine --> Gemini["Gemini AI"]
        Gemini --> Analysis["Match Analysis"]
        
        Analysis --> SkillMatch["Skill Match"]
        Analysis --> MentorMatch["Mentor Match"]
        Analysis --> ProjectMatch["Project Match"]
        
        SkillMatch --> RecUsers["Recommended Users"]
        MentorMatch --> RecUsers
        ProjectMatch --> RecUsers
    end
`

---

## 20. Security and Access Control

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

### Security Access Flow

`mermaid
graph TD
    subgraph SecurityFlow ["2D Security & Access Flow"]
        Student["Student"] --> Org["Organization Verification"]
        Org --> Net["Allowed Network Scope"]
        Net --> Discover["Discover Students"]
        
        Discover --> Learn["Learn"]
        Discover --> Exchange["Exchange"]
        Discover --> Mentor["Mentor"]
        Discover --> Collaborate["Collaborate"]
    end
`

---

## 21. User Roles

### Student

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

---

### Student Mentor

Can additionally:

- Accept mentorship requests
- Resolve project doubts
- Conduct sessions
- Provide project guidance
- Receive mentor feedback

---

### Organization Admin

Can:

- Manage organization
- Verify users
- Manage organization access
- Manage mentors
- Manage courses
- Monitor activity
- View organization-level insights

---

### Platform Admin

Can:

- Manage organizations
- Manage platform users
- Manage global content
- Manage platform settings
- Handle reports and moderation

---

## 22. End-to-End User Flow

`mermaid
graph TD
    subgraph UserJourney ["2D End-to-End User Journey"]
        Register["REGISTER"] --> SelectOrg["SELECT ORGANIZATION"]
        SelectOrg --> SelectScope["SELECT NETWORK SCOPE"]
        SelectScope --> BuildProfile["BUILD PROFILE"]
        BuildProfile --> AddSkills["ADD SKILLS / GOALS"]
        AddSkills --> Dashboard["ENTER SKILLBRIDGE"]
        
        Dashboard --> Branch1["Find Skill"]
        Dashboard --> Branch2["Need Help"]
        Dashboard --> Branch3["Learn"]
        
        Branch1 --> AIMatch["AI Matching"] --> SkillEx["Skill Exchange"] --> Feedback["Feedback"]
        Branch2 --> ProjectDoubt["Project Doubt"] --> PeerMentor["Student Mentor"] --> Solved["Problem Solved"]
        Branch3 --> Course["Course"] --> Practice["Practice"] --> Project["Project"]
        
        Feedback --> Growth["SKILL GROWTH"]
        Solved --> Growth
        Project --> Growth
        
        Growth --> Verification["SKILL VERIFICATION"]
        Verification --> Reputation["BUILD REPUTATION"]
        Reputation --> Mentor["BECOME MENTOR"]
        Mentor --> HelpOthers["HELP OTHER STUDENTS"]
    end
`

---

## 23. Project Structure

`	ext
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
`

---

## 24. Environment Variables

`env
# Backend
DATABASE_URL=postgresql://user:password@localhost:5432/skillbridge_db

# Gemini
GEMINI_API_KEY=your_gemini_api_key_here

# Authentication
SECRET_KEY=your_super_secret_jwt_key

# Frontend
VITE_API_BASE_URL=http://localhost:8000/api
`

Sensitive credentials must not be committed to the repository.

---

## 25. Development

### Frontend

`ash
npm install
npm run dev
`

### Backend

`ash
pip install -r requirements.txt
uvicorn app.main:app --reload
`

The exact commands may be adjusted according to the final project configuration.

---

## 26. Complete SkillBridge Ecosystem

`mermaid
graph TD
    subgraph CompleteEcosystem ["2D Complete SkillBridge Ecosystem"]
        SB["SKILLBRIDGE"] --> Org["ORGANIZATION SELECTION"]
        Org --> Scope1["MY ORGANIZATION"]
        Org --> Scope2["EXTERNAL NETWORK"]
        
        Scope1 --> Profile["STUDENT PROFILE"]
        Scope2 --> Profile
        
        Profile --> CanTeach["CAN TEACH"]
        Profile --> WantLearn["WANT TO LEARN"]
        Profile --> Projects["PROJECTS"]
        
        CanTeach --> AIMatchEngine["AI MATCH ENGINE"]
        WantLearn --> AIMatchEngine
        Projects --> AIMatchEngine
        
        AIMatchEngine --> Flow1["KNOWLEDGE EXCHANGE<br/>(Student <-> Student)"]
        AIMatchEngine --> Flow2["STUDENT MENTOR<br/>(Student -> Mentor)"]
        AIMatchEngine --> Flow3["LEARNING HUB<br/>(Course -> Student)"]
        
        Flow1 --> SkillGrowth["SKILL GROWTH"]
        Flow2 --> SkillGrowth
        Flow3 --> SkillGrowth
        
        SkillGrowth --> Proof["Challenge | Project | Course"]
        Proof --> Verification["SKILL VERIFICATION"]
        Verification --> Reputation["REPUTATION / XP"]
        Reputation --> BecomeMentor["BECOME MENTOR"]
        BecomeMentor --> HelpStudents["HELP OTHER STUDENTS"]
        HelpStudents --> NetGrows["NETWORK GROWS"]
    end
`

---

## 27. Tech Stack Summary

| Layer | Technology |
|---|---|
| **Frontend Development** | Lovable |
| **Frontend Framework** | React |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Backend** | FastAPI |
| **Backend Language** | Python |
| **Database** | PostgreSQL |
| **LLM** | Google Gemini |
| **API Communication** | REST API |
| **Authentication** | Token-based Authentication |
| **AI Integration** | Gemini API |
| **Version Control** | Git / GitHub |

---

## 28. Team

### Tech Clan

| Member | Role |
|---|---|
| **Bharanidharan S** | Development / AI / System Design |
| **Dinesh S** | Development / Backend / Integration |
| **Madhiyarasu R** | Development / Frontend / UI |

---

### Problem Statement Reference

**WEB-04 â€” Student Skill Exchange Platform**

> Develop a web platform where students can exchange knowledge and skills with each other.

**Team:** Tech Clan  
**Members:** Bharanidharan S, Dinesh S, Madhiyarasu R

---

<p align="center">
  <b>SkillBridge</b><br/>
  <i>Learn. Share. Mentor. Build. Grow.</i>
</p>