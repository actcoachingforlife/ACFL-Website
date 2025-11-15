'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AccessDenied from '@/components/AccessDenied';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
  showAccessDenied?: boolean; // New prop to control whether to show access denied page or redirect
}

export default function ProtectedRoute({
  children,
  allowedRoles = [],
  redirectTo = '/login',
  showAccessDenied = true // Default to showing access denied page for better UX
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [shouldShowAccessDenied, setShouldShowAccessDenied] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
        if (showAccessDenied) {
          // Show access denied page instead of redirecting
          setShouldShowAccessDenied(true);
        } else {
          // Legacy behavior: Redirect based on user role
          if (user.role === 'client') {
            router.push('/');
          } else if (user.role === 'coach') {
            router.push('/coaches');
          } else if (user.role === 'admin') {
            router.push('/admin');
          } else if (user.role === 'staff') {
            router.push('/admin');
          } else {
            router.push('/');
          }
        }
        return;
      }
    }
  }, [user, loading, isAuthenticated, allowedRoles, router, redirectTo, showAccessDenied]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    if (shouldShowAccessDenied && showAccessDenied) {
      return (
        <AccessDenied
          title="Access Restricted"
          message={`This page is restricted to ${allowedRoles.join(', ')} users only. Your current role (${user.role}) does not have permission to access this area.`}
          showBackButton={true}
        />
      );
    }
    return null; // Will redirect in useEffect if showAccessDenied is false
  }

  return <>{children}</>;
}