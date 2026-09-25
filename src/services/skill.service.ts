import { supabase } from '@/lib/supabase';
import type { SkillType } from '@/types';

export async function getSkills() {
  return await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true });
}

export async function getSkillsByCategory(category: string) {
  return await supabase
    .from('skills')
    .select('*')
    .eq('category', category)
    .order('name', { ascending: true });
}

export async function getUserSkills(userId: string) {
  return await supabase
    .from('user_skills')
    .select('*, skills(name, category)')
    .eq('user_id', userId);
}

export async function addUserSkill(
  userId: string,
  skillId: string,
  skillType: 'CAN_TEACH' | 'WANT_TO_LEARN' | SkillType
) {
  return await supabase
    .from('user_skills')
    .insert({
      user_id: userId,
      skill_id: skillId,
      skill_type: skillType,
    });
}

export async function removeUserSkill(
  userId: string,
  skillId: string,
  skillType: string
) {
  return await supabase
    .from('user_skills')
    .delete()
    .eq('user_id', userId)
    .eq('skill_id', skillId)
    .eq('skill_type', skillType);
}

export async function addUserSkills(
  userId: string,
  skills: { skillId: string; skillType: 'CAN_TEACH' | 'WANT_TO_LEARN' | SkillType }[]
) {
  if (!skills || skills.length === 0) {
    return { data: [], error: null };
  }

  const payload = skills.map((s) => ({
    user_id: userId,
    skill_id: s.skillId,
    skill_type: s.skillType,
  }));

  return await supabase
    .from('user_skills')
    .insert(payload);
}

export const skillService = {
  getSkills,
  getSkillsByCategory,
  getUserSkills,
  addUserSkill,
  removeUserSkill,
  addUserSkills,
};
