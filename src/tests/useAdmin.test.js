import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAdmin } from '../hooks/useAdmin';
import { useAuth } from '../contexts/AuthContext';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('useAdmin hook', () => {
  it('should return user role and flags for a standard user profile', () => {
    vi.mocked(useAuth).mockReturnValue({
      profile: { role: 'user' },
      loading: false
    });

    const { result } = renderHook(() => useAdmin());
    expect(result.current.role).toBe('user');
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isSuperAdmin).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it('should fallback to user role when profile is missing', () => {
    vi.mocked(useAuth).mockReturnValue({
      profile: null,
      loading: false
    });

    const { result } = renderHook(() => useAdmin());
    expect(result.current.role).toBe('user');
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isSuperAdmin).toBe(false);
  });

  it('should return correct flags for an admin user profile', () => {
    vi.mocked(useAuth).mockReturnValue({
      profile: { role: 'admin' },
      loading: false
    });

    const { result } = renderHook(() => useAdmin());
    expect(result.current.role).toBe('admin');
    expect(result.current.isAdmin).toBe(true);
    expect(result.current.isSuperAdmin).toBe(false);
  });

  it('should return correct flags for a super_admin user profile', () => {
    vi.mocked(useAuth).mockReturnValue({
      profile: { role: 'super_admin' },
      loading: false
    });

    const { result } = renderHook(() => useAdmin());
    expect(result.current.role).toBe('super_admin');
    expect(result.current.isAdmin).toBe(true);
    expect(result.current.isSuperAdmin).toBe(true);
  });

  it('should reflect the loading state from useAuth', () => {
    vi.mocked(useAuth).mockReturnValue({
      profile: null,
      loading: true
    });

    const { result } = renderHook(() => useAdmin());
    expect(result.current.loading).toBe(true);
  });
});
