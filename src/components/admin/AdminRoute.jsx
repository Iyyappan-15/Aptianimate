import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';

export default function AdminRoute({ children, navigate }) {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg)' }}>
        <div style={{ color: 'var(--violet)', fontWeight: 'bold' }}>Loading Admin Panel...</div>
      </div>
    );
  }

  if (!isAdmin) {
    // Unauthorized users are kicked to the home page
    setTimeout(() => {
      window.location.hash = '/';
    }, 0);
    return null;
  }

  return <>{children}</>;
}
