import { useState, useEffect, useCallback } from 'react';
import type { Organization } from '@/types';
import { OrganizationType } from '@/types';
import { MOCK_ORG_DATA } from '@/data/mockData';

export interface UseOrganizationReturn {
  organization: Organization | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const mockOrg: Organization = {
  id: 'sns-college',
  name: MOCK_ORG_DATA.name,
  type: OrganizationType.UNIVERSITY,
  logo_url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=250',
  description: 'SNS College of Engineering',
  domain: 'snsct.org',
  verified: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export function useOrganization(orgId: string | undefined): UseOrganizationReturn {
  const [organization, setOrganization] = useState<Organization | null>(mockOrg);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setOrganization(mockOrg);
    setIsLoading(false);
    setError(null);
  }, [orgId]);

  const refetch = useCallback(async () => {
    setOrganization(mockOrg);
    setIsLoading(false);
  }, []);

  return { organization, isLoading, error, refetch };
}

