import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types';

export async function getProfile(userId: string) {
  return await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  return await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
}

export async function checkOnboardingStatus(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('profiles')
    .select('onboarding_completed')
    .eq('id', userId)
    .single();

  if (error || !data) {
    return false;
  }

  return Boolean(data.onboarding_completed);
}

export const profileService = {
  getProfile,
  updateProfile,
  checkOnboardingStatus,
};
