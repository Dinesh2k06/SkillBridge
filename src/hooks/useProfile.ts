import { useState, useEffect, useCallback } from 'react';
import type { Profile } from '@/types';
import { NetworkPreference } from '@/types';
import { CURRENT_USER } from '@/data/mockData';

export interface UseProfileReturn {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  update: (updates: Partial<Profile>) => Promise<{ data?: any; error?: any } | void>;
  refetch: () => Promise<void>;
}

const mockProfile: Profile = {
  id: CURRENT_USER.id,
  full_name: CURRENT_USER.name,
  avatar_url: CURRENT_USER.avatar,
  bio: CURRENT_USER.bio,
  organization_id: 'sns-college',
  department: CURRENT_USER.department,
  year_of_study: CURRENT_USER.year,
  section: 'A',
  interests: ['AI', 'Data Science', 'Web Development'],
  github_url: CURRENT_USER.githubUrl || null,
  linkedin_url: CURRENT_USER.linkedinUrl || null,
  portfolio_url: CURRENT_USER.portfolioUrl || null,
  onboarding_completed: true,
  network_preference: NetworkPreference.ORGANIZATION,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export function useProfile(userId: string | undefined): UseProfileReturn {
  const [profile, setProfile] = useState<Profile | null>(mockProfile);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProfile(mockProfile);
    setIsLoading(false);
    setError(null);
  }, [userId]);

  const update = useCallback(
    async (updates: Partial<Profile>): Promise<{ data?: any; error?: any } | void> => {
      setProfile((prev) => (prev ? { ...prev, ...updates } : mockProfile));
      return { data: updates, error: null };
    },
    []
  );

  const refetch = useCallback(async () => {
    setProfile(mockProfile);
    setIsLoading(false);
  }, []);

  return { profile, isLoading, error, update, refetch };
}

