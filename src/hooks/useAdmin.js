import { useAuth } from '../contexts/AuthContext';
import { useMemo } from 'react';

/**
 * Hook to check if the current user has admin privileges.
 * Returns { isAdmin, isSuperAdmin, role }
 */
export function useAdmin() {
  const { profile, loading } = useAuth();

  const role = profile?.role || 'user';
  const isSuperAdmin = role === 'super_admin';
  const isAdmin = role === 'admin' || isSuperAdmin;

  return useMemo(() => ({
    isAdmin,
    isSuperAdmin,
    role,
    loading
  }), [isAdmin, isSuperAdmin, role, loading]);
}
