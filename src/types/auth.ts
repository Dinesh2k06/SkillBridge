export enum UserRole {
  STUDENT = 'STUDENT',
  MENTOR = 'MENTOR',
  ORGANIZATION_ADMIN = 'ORGANIZATION_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum NetworkPreference {
  ORGANIZATION = 'organization',
  SELECTED = 'selected',
  OPEN = 'open',
}

export enum OrganizationType {
  UNIVERSITY = 'university',
  ORGANIZATION = 'organization',
  INSTITUTION = 'institution',
}

export enum SkillType {
  CAN_TEACH = 'CAN_TEACH',
  WANT_TO_LEARN = 'WANT_TO_LEARN',
}

export type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface OnboardingData {
  // Step 1: Basic profile
  fullName?: string;
  avatarUrl?: string | null;
  bio?: string | null;

  // Step 2: Role
  role?: UserRole;

  // Step 3: Organization and academic details
  organizationId?: string | null;
  department?: string | null;
  yearOfStudy?: string | null;
  section?: string | null;

  // Step 4: Skills to teach
  canTeachSkills?: string[];

  // Step 5: Skills to learn
  wantToLearnSkills?: string[];

  // Step 6: Interests
  interests?: string[];

  // Step 7: Social and portfolio links
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  portfolioUrl?: string | null;

  // Step 8: Network preference
  networkPreference?: NetworkPreference;

  // Snake_case aliases for direct Supabase column mapping compatibility
  full_name?: string;
  avatar_url?: string | null;
  organization_id?: string | null;
  year_of_study?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  portfolio_url?: string | null;
  network_preference?: NetworkPreference;
}
