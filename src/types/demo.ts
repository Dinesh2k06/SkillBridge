export interface MockStudent {
  id: string;
  name: string;
  avatar: string;
  department: string;
  year: string;
  organization: string;
  role: string;
  bio: string;
  xp: number;
  rating: number;
  sessionsCompleted: number;
  mentoringSessions: number;
  studentsHelped: number;
  canTeach: string[];
  wantsToLearn: string[];
  badges: string[];
  projects: string[];
  exchangeType?: string;
  matchScore?: number;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export interface ReciprocalMatch {
  id: string;
  partner: MockStudent;
  youCanTeach: string[];
  youWantToLearn: string[];
  partnerCanTeach: string[];
  partnerWantsToLearn: string[];
  matchPercentage: number;
  reason: string;
  exchangeType: string;
}

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  roleTitle: string;
  organization: string;
  skills: string[];
  rating: number;
  projectsHelped: number;
  issuesResolved: number;
  responseRate: string;
  availability: string;
  priceText: string;
  priceNumeric: number;
  bio: string;
  achievements?: string[];
  availableSessions?: { title: string; priceText: string }[];
}

export interface ProjectProblem {
  id: string;
  title: string;
  category: string;
  problem: string;
  technology: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  studentsNeedingHelp: number;
  description: string;
  aiDetectedSkills: string[];
  recommendedMentors: {
    mentorId: string;
    name: string;
    avatar: string;
    roleTitle: string;
    matchPercentage: number;
  }[];
  authorName: string;
  authorAvatar: string;
  createdAgo: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  modulesCount: number;
  completedModulesCount?: number;
  isFree: boolean;
  priceText: string;
  rating: number;
  studentCount: number;
  learnersCountText?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  enrolled: boolean;
  progressPercent: number;
  image: string;
  description: string;
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  organization: string;
  department: string;
  xp: number;
  skillsCount: number;
  badgesCount: number;
  badges: string[];
  isCurrentUser?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: 'exchange' | 'project' | 'xp' | 'badge' | 'mentor';
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

export interface BadgeItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface SkillGrowthItem {
  skill: string;
  progress: number;
  status: string;
}

export interface OrgDashboardData {
  name: string;
  subtitle: string;
  totalStudents: number;
  activeMentors: number;
  sessionsCompleted: number;
  projectsHelped: number;
  skillsSupply: { skill: string; count: number }[];
  skillsDemand: { skill: string; demandLevel: 'HIGH' | 'MEDIUM' | 'LOW' }[];
  connectedOrgs: { name: string; type: string; status: string; logo: string }[];
}
