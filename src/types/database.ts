import type { NetworkPreference, OrganizationType, SkillType, UserRole } from './auth';

export type OrganizationNetworkStatus = 'pending' | 'approved' | 'rejected';

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  logo_url: string | null;
  description: string | null;
  domain: string | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  organization_id: string | null;
  department: string | null;
  year_of_study: string | null;
  section: string | null;
  interests: string[];
  github_url: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  onboarding_completed: boolean;
  network_preference: NetworkPreference;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  user_id: string;
  organization_id: string;
  role: UserRole;
  joined_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string | null;
  created_at: string;
}

export interface UserSkill {
  id: string;
  user_id: string;
  skill_id: string;
  skill_type: SkillType;
  created_at: string;
}

export interface OrganizationNetwork {
  id: string;
  source_org_id: string;
  target_org_id: string;
  status: OrganizationNetworkStatus;
  created_at: string;
  updated_at: string;
}

// Composite / relational types often used when querying joined data
export interface ProfileWithOrganization extends Profile {
  organization?: Organization | null;
}

export interface UserSkillWithSkill extends UserSkill {
  skill?: Skill;
}

export interface OrganizationMemberWithProfile extends OrganizationMember {
  profile?: Profile;
}

export interface OrganizationNetworkWithOrganizations extends OrganizationNetwork {
  source_org?: Organization;
  target_org?: Organization;
}
