import { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import AccessDenied from '@/components/AccessDenied';

interface PermissionGateProps {
  permission: string;
  children: ReactNode;
  fallback?: ReactNode;
  adminOnly?: boolean;
  showAccessDenied?: boolean; // New prop to show access denied message
  accessDeniedVariant?: 'page' | 'inline' | 'card'; // Variant of access denied message
  accessDeniedMessage?: string; // Custom access denied message
}

export const PermissionGate = ({
  permission,
  children,
  fallback = null,
  adminOnly = false,
  showAccessDenied = false,
  accessDeniedVariant = 'inline',
  accessDeniedMessage
}: PermissionGateProps) => {
  const { hasPermission, isAdmin } = usePermissions();

  // If adminOnly is true, only show to admins
  if (adminOnly && !isAdmin) {
    if (showAccessDenied) {
      return (
        <AccessDenied
          title="Admin Access Required"
          message={accessDeniedMessage || "This feature is only available to administrators."}
          requiredPermission="admin"
          variant={accessDeniedVariant}
          showBackButton={accessDeniedVariant === 'page'}
        />
      );
    }
    return <>{fallback}</>;
  }

  // Check if user has the required permission
  if (hasPermission(permission)) {
    return <>{children}</>;
  }

  // User doesn't have permission
  if (showAccessDenied) {
    return (
      <AccessDenied
        title="Permission Required"
        message={accessDeniedMessage || `You don't have permission to access this feature.`}
        requiredPermission={permission}
        variant={accessDeniedVariant}
        showBackButton={accessDeniedVariant === 'page'}
      />
    );
  }

  return <>{fallback}</>;
};

// Convenience component for admin-only content
export const AdminOnly = ({
  children,
  fallback = null,
  showAccessDenied = false,
  accessDeniedVariant = 'inline'
}: {
  children: ReactNode;
  fallback?: ReactNode;
  showAccessDenied?: boolean;
  accessDeniedVariant?: 'page' | 'inline' | 'card';
}) => {
  const { isAdmin } = usePermissions();

  if (isAdmin) {
    return <>{children}</>;
  }

  if (showAccessDenied) {
    return (
      <AccessDenied
        title="Admin Access Required"
        message="This feature is only available to administrators."
        requiredPermission="admin"
        variant={accessDeniedVariant}
        showBackButton={accessDeniedVariant === 'page'}
      />
    );
  }

  return <>{fallback}</>;
};

// Convenience component for staff-only content (excluding admins)
export const StaffOnly = ({
  children,
  fallback = null,
  showAccessDenied = false,
  accessDeniedVariant = 'inline'
}: {
  children: ReactNode;
  fallback?: ReactNode;
  showAccessDenied?: boolean;
  accessDeniedVariant?: 'page' | 'inline' | 'card';
}) => {
  const { isStaff } = usePermissions();

  if (isStaff) {
    return <>{children}</>;
  }

  if (showAccessDenied) {
    return (
      <AccessDenied
        title="Staff Access Required"
        message="This feature is only available to staff members."
        requiredPermission="staff"
        variant={accessDeniedVariant}
        showBackButton={accessDeniedVariant === 'page'}
      />
    );
  }

  return <>{fallback}</>;
};