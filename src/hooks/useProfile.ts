import { useState, useEffect, useCallback } from 'react';
import type { Profile } from '@/types';
import { getProfile, updateProfile } from '@/services/profile.service';

export interface UseProfileReturn {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  update: (updates: Partial<Profile>) => Promise<{ data?: any; error?: any } | void>;
  refetch: () => Promise<void>;
}

export function useProfile(userId: string | undefined): UseProfileReturn {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileData = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await getProfile(id);

      if (fetchError) {
        setError(fetchError.message || 'Failed to fetch profile');
        setProfile(null);
      } else {
        setProfile(data as Profile);
        setError(null);
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred while fetching profile');
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: fetchError } = await getProfile(userId);

        if (!isMounted) return;

        if (fetchError) {
          setError(fetchError.message || 'Failed to fetch profile');
          setProfile(null);
        } else {
          setProfile(data as Profile);
          setError(null);
        }
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message || 'An unexpected error occurred while fetching profile');
        setProfile(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const update = useCallback(
    async (updates: Partial<Profile>): Promise<{ data?: any; error?: any } | void> => {
      if (!userId) {
        return;
      }

      try {
        setError(null);
        const { data, error: updateError } = await updateProfile(userId, updates);

        if (updateError) {
          setError(updateError.message || 'Failed to update profile');
          return { error: updateError };
        }

        setProfile((prev) => (prev ? { ...prev, ...updates } : null));
        return { data, error: null };
      } catch (err: any) {
        const errorMessage = err?.message || 'An unexpected error occurred while updating profile';
        setError(errorMessage);
        return { error: err };
      }
    },
    [userId]
  );

  const refetch = useCallback(async () => {
    if (userId) {
      await fetchProfileData(userId);
    }
  }, [userId, fetchProfileData]);

  return { profile, isLoading, error, update, refetch };
}
