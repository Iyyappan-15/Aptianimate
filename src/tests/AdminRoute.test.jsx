import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import AdminRoute from '../components/admin/AdminRoute';
import { useAdmin } from '../hooks/useAdmin';

vi.mock('../hooks/useAdmin', () => ({
  useAdmin: vi.fn(),
}));

describe('AdminRoute Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render loading state when auth state is loading', () => {
    vi.mocked(useAdmin).mockReturnValue({
      isAdmin: false,
      isSuperAdmin: false,
      role: 'user',
      loading: true
    });

    render(
      <AdminRoute>
        <div data-testid="admin-content">Secret Admin Dashboard</div>
      </AdminRoute>
    );

    expect(screen.getByText('Loading Admin Panel...')).toBeInTheDocument();
    expect(screen.queryByTestId('admin-content')).not.toBeInTheDocument();
  });

  it('should render children when user is an admin', () => {
    vi.mocked(useAdmin).mockReturnValue({
      isAdmin: true,
      isSuperAdmin: false,
      role: 'admin',
      loading: false
    });

    render(
      <AdminRoute>
        <div data-testid="admin-content">Secret Admin Dashboard</div>
      </AdminRoute>
    );

    expect(screen.getByTestId('admin-content')).toBeInTheDocument();
    expect(screen.queryByText('Loading Admin Panel...')).not.toBeInTheDocument();
  });

  it('should redirect to home page and render null when user is not authorized', () => {
    // Mock location hash
    delete window.location;
    window.location = { hash: '#/admin' };

    vi.mocked(useAdmin).mockReturnValue({
      isAdmin: false,
      isSuperAdmin: false,
      role: 'user',
      loading: false
    });

    const { container } = render(
      <AdminRoute>
        <div data-testid="admin-content">Secret Admin Dashboard</div>
      </AdminRoute>
    );

    // Should render nothing
    expect(container.firstChild).toBeNull();
    expect(screen.queryByTestId('admin-content')).not.toBeInTheDocument();

    // Advance timers to trigger redirect
    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(window.location.hash).toBe('/');
  });
});
