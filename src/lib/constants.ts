export interface NavItem {
  title: string;
  href: string;
  icon: string;
}

export interface OnboardingStepItem {
  step: number;
  title: string;
  description: string;
}

export const APP_NAME = 'SkillBridge';
export const APP_DESCRIPTION = 'Connect, Learn, and Grow Together';

export const SKILL_CATEGORIES: string[] = [
  'Programming Languages',
  'Web Development',
  'Data Science',
  'Design',
  'DevOps',
  'Mobile',
  'Database',
  'Soft Skills',
];

export const studentNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Knowledge Exchange',
    href: '/exchange',
    icon: 'ArrowLeftRight',
  },
  {
    title: 'Mentors',
    href: '/mentors',
    icon: 'Users',
  },
  {
    title: 'Project Help',
    href: '/projects',
    icon: 'FolderGit2',
  },
  {
    title: 'Learning Hub',
    href: '/learning',
    icon: 'BookOpen',
  },
  {
    title: 'Leaderboard',
    href: '/leaderboard',
    icon: 'Trophy',
  },
  {
    title: 'My Profile',
    href: '/profile',
    icon: 'User',
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: 'Bell',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'Settings',
  },
];

export const orgNavItems: NavItem[] = [
  {
    title: 'Overview',
    href: '/organization',
    icon: 'Building2',
  },
  {
    title: 'Students',
    href: '/organization/students',
    icon: 'GraduationCap',
  },
  {
    title: 'Mentors',
    href: '/organization/mentors',
    icon: 'UserCheck',
  },
  {
    title: 'Skills',
    href: '/organization/skills',
    icon: 'Award',
  },
  {
    title: 'Projects',
    href: '/organization/projects',
    icon: 'Briefcase',
  },
  {
    title: 'Analytics',
    href: '/organization/analytics',
    icon: 'BarChart3',
  },
  {
    title: 'Settings',
    href: '/organization/settings',
    icon: 'Settings',
  },
];

export const ONBOARDING_STEPS: OnboardingStepItem[] = [
  {
    step: 1,
    title: 'Welcome',
    description: 'Get started with SkillBridge and discover collaborative learning opportunities.',
  },
  {
    step: 2,
    title: 'Organization Type',
    description: 'Select your community type: University, Institution, or Organization.',
  },
  {
    step: 3,
    title: 'Select Organization',
    description: 'Connect with your campus or community organization.',
  },
  {
    step: 4,
    title: 'Profile Details',
    description: 'Complete your profile bio, headline, and academic information.',
  },
  {
    step: 5,
    title: 'Skills to Teach',
    description: 'Choose skills and technologies you can share or mentor peers in.',
  },
  {
    step: 6,
    title: 'Skills to Learn',
    description: 'Select skills and competencies you want to acquire or improve.',
  },
  {
    step: 7,
    title: 'Network Preferences',
    description: 'Customize your collaboration scope and network visibility.',
  },
  {
    step: 8,
    title: 'Complete Setup',
    description: 'Review your selections and start your learning journey.',
  },
];
