import { supabase } from '@/lib/supabase';

export async function getOrganizations() {
  return await supabase
    .from('organizations')
    .select('*')
    .eq('verified', true)
    .order('name', { ascending: true });
}

export async function getOrganization(id: string) {
  return await supabase
    .from('organizations')
    .select('*')
    .eq('id', id)
    .single();
}

export async function createOrganization(data: {
  name: string;
  type: string;
  description?: string;
}) {
  return await supabase
    .from('organizations')
    .insert(data)
    .select()
    .single();
}

export async function searchOrganizations(query: string) {
  return await supabase
    .from('organizations')
    .select('*')
    .ilike('name', `%${query}%`)
    .eq('verified', true)
    .order('name', { ascending: true });
}

export const organizationService = {
  getOrganizations,
  getOrganization,
  createOrganization,
  searchOrganizations,
};
