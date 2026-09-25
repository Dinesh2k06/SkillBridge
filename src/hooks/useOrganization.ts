import { useState, useEffect, useCallback } from 'react';
import type { Organization } from '@/types';
import { getOrganization } from '@/services/organization.service';

export interface UseOrganizationReturn {
  organization: Organization | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useOrganization(orgId: string | undefined): UseOrganizationReturn {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizationData = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await getOrganization(id);

      if (fetchError) {
        setError(fetchError.message || 'Failed to fetch organization');
        setOrganization(null);
      } else {
        setOrganization(data as Organization);
        setError(null);
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred while fetching organization');
      setOrganization(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!orgId) {
      setOrganization(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;

    const loadOrganization = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: fetchError } = await getOrganization(orgId);

        if (!isMounted) return;

        if (fetchError) {
          setError(fetchError.message || 'Failed to fetch organization');
          setOrganization(null);
        } else {
          setOrganization(data as Organization);
          setError(null);
        }
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message || 'An unexpected error occurred while fetching organization');
        setOrganization(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadOrganization();

    return () => {
      isMounted = false;
    };
  }, [orgId]);

  const refetch = useCallback(async () => {
    if (orgId) {
      await fetchOrganizationData(orgId);
    }
  }, [orgId, fetchOrganizationData]);

  return { organization, isLoading, error, refetch };
}
