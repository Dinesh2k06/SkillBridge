import json
import logging
from typing import List, Dict, Any, Optional
from app.core.config import settings

logger = logging.getLogger(__name__)

# Try importing Google Gemini client if available
try:
    import google.generativeai as genai
    if settings.GEMINI_API_KEY:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        _gemini_available = True
    else:
        _gemini_available = False
except Exception as e:
    logger.warning(f"Google Generative AI SDK not configured or missing API key: {e}")
    _gemini_available = False

class GeminiAIService:
    @staticmethod
    def analyze_project_doubt(problem_title: str, tech_stack: str, description: str) -> Dict[str, Any]:
        """
        Analyze a student's project doubt using Gemini API or Heuristic Rule Engine.
        Example Output:
        {
            "category": "Backend Development",
            "technology": "FastAPI",
            "topic": "JWT Authentication",
            "required_skills": ["FastAPI", "JWT", "Python"],
            "recommended_mentor_type": "Backend Mentors"
        }
        """
        if _gemini_available and settings.GEMINI_API_KEY:
            try:
                model = genai.GenerativeModel(settings.GEMINI_MODEL)
                prompt = f"""
You are an expert AI Assistant for SkillBridge project doubt classification.
Analyze the following student project doubt and return a JSON object with keys:
"category", "technology", "topic", "required_skills" (list), "recommended_mentor_type".

Project Title: {problem_title}
Tech Stack: {tech_stack}
Description: {description}

Return raw JSON only without markdown formatting.
"""
                response = model.generate_content(prompt)
                text = response.text.strip()
                if text.startswith("```"):
                    text = text.split("\n", 1)[1].rsplit("```", 1)[0].strip()
                return json.loads(text)
            except Exception as ex:
                logger.error(f"Gemini API doubt analysis error: {ex}")

        # Rule-based Fallback / Mock Engine for reliable fallback execution
        tech_lower = tech_stack.lower() + " " + problem_title.lower() + " " + description.lower()
        
        category = "Backend Development"
        if any(k in tech_lower for k in ["react", "figma", "css", "html", "ui/ux", "frontend", "vue"]):
            category = "Frontend Development"
        elif any(k in tech_lower for k in ["ml", "machine learning", "ai", "python", "data science", "nlp"]):
            category = "AI / Machine Learning"
        elif any(k in tech_lower for k in ["flutter", "android", "ios", "react native"]):
            category = "Mobile Development"

        required_skills = []
        for word in ["FastAPI", "React", "Python", "JWT", "PostgreSQL", "Docker", "Figma", "Machine Learning", "MongoDB", "Node.js"]:
            if word.lower() in tech_lower:
                required_skills.append(word)

        if not required_skills:
            required_skills = [tech_stack.split("+")[0].strip() if "+" in tech_stack else tech_stack]

        return {
            "category": category,
            "technology": tech_stack,
            "topic": problem_title,
            "required_skills": required_skills,
            "recommended_mentor_type": f"{category} Mentors"
        }

    @staticmethod
    def extract_skills_from_text(text: str) -> List[str]:
        """Extract software skills from bio or text"""
        if _gemini_available and settings.GEMINI_API_KEY:
            try:
                model = genai.GenerativeModel(settings.GEMINI_MODEL)
                prompt = f"Extract a JSON array of technical/software skills from this text: '{text}'. Return JSON array of strings only."
                res = model.generate_content(prompt)
                t = res.text.strip()
                if t.startswith("```"):
                    t = t.split("\n", 1)[1].rsplit("```", 1)[0].strip()
                return json.loads(t)
            except Exception as ex:
                logger.error(f"Gemini skill extraction error: {ex}")

        known_skills = ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Google Gemini", "Figma", "UI/UX", "Machine Learning", "Docker", "Java", "Flutter", "MongoDB", "Tailwind CSS"]
        found = [s for s in known_skills if s.lower() in text.lower()]
        return found if found else ["General Software Engineering"]
