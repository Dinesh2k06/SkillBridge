import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface MockUserProfile {
  id: string;
  full_name: string;
  avatar_url: string;
  department: string;
  year_of_study: string;
  section: string;
  bio: string;
  organization_id: string;
  organization_name: string;
  onboarding_completed: boolean;
  network_preference: string;
  xp: number;
  rating: number;
  sessions_completed: number;
  mentoring_sessions: number;
  can_teach: string[];
  want_to_learn: string[];
  badges: string[];
  projects: string[];
}

export interface AuthContextType {
  user: { id: string; email: string } | null;
  session: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  profile: MockUserProfile | null;
  isOnboarded: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, fullNameOrOptions?: any) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const DEFAULT_DINESH_PROFILE: MockUserProfile = {
  id: 'student-dinesh',
  full_name: 'Dinesh',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  department: 'AI & Data Science',
  year_of_study: '3rd Year',
  section: 'A',
  bio: 'AI & Data Science student interested in building practical AI products and learning through collaboration.',
  organization_id: 'sns-college',
  organization_name: 'SNS College of Engineering',
  onboarding_completed: true,
  network_preference: 'open',
  xp: 640,
  rating: 4.8,
  sessions_completed: 12,
  mentoring_sessions: 8,
  can_teach: ['Python', 'HTML', 'CSS', 'Data Analysis', 'Excel'],
  want_to_learn: ['React', 'UI/UX', 'Figma', 'Cloud'],
  badges: ['Python Mentor', 'First Mentor', 'Project Helper', 'Community Contributor'],
  projects: ['TexTwin', 'Life Lens', 'SkillBridge'],
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string; email: string } | null>({
    id: 'student-dinesh',
    email: 'dinesh@sns.edu.in',
  });
  const [profile, setProfile] = useState<MockUserProfile | null>(DEFAULT_DINESH_PROFILE);

  const signIn = useCallback(async () => {
    setUser({ id: 'student-dinesh', email: 'dinesh@sns.edu.in' });
    setProfile(DEFAULT_DINESH_PROFILE);
    return { error: null };
  }, []);

  const signUp = useCallback(async () => {
    setUser({ id: 'student-dinesh', email: 'dinesh@sns.edu.in' });
    setProfile(DEFAULT_DINESH_PROFILE);
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    // Demo mode reset back to Dinesh if desired or null
    setUser({ id: 'student-dinesh', email: 'dinesh@sns.edu.in' });
    setProfile(DEFAULT_DINESH_PROFILE);
  }, []);

  const refreshProfile = useCallback(async () => {
    setProfile(DEFAULT_DINESH_PROFILE);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      session: { user },
      isLoading: false,
      isAuthenticated: true,
      profile,
      isOnboarded: true,
      signIn,
      signUp,
      signOut,
      refreshProfile,
    }),
    [user, profile, signIn, signUp, signOut, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
