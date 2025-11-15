'use client';

import { ShieldAlert, Lock, ArrowLeft, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface AccessDeniedProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  requiredPermission?: string;
  variant?: 'page' | 'inline' | 'card';
}

export default function AccessDenied({
  title = 'Access Denied',
  message = 'You do not have permission to access this area.',
  showBackButton = true,
  requiredPermission,
  variant = 'page'
}: AccessDeniedProps) {
  const router = useRouter();
  const { user } = useAuth();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToDashboard = () => {
    if (user?.role === 'staff') {
      router.push('/admin');
    } else if (user?.role === 'client') {
      router.push('/clients');
    } else if (user?.role === 'coach') {
      router.push('/coaches');
    } else {
      router.push('/');
    }
  };

  // Inline variant - small banner style
  if (variant === 'inline') {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-900 dark:text-red-100 mb-1">
              {title}
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300">
              {message}
            </p>
            {requiredPermission && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                Required permission: <code className="bg-red-100 dark:bg-red-800 px-1 py-0.5 rounded">{requiredPermission}</code>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Card variant - medium sized card
  if (variant === 'card') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
            <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-md">
            {message}
          </p>
          {requiredPermission && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
              Required permission: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{requiredPermission}</code>
            </p>
          )}
          {showBackButton && (
            <div className="flex gap-3">
              <button
                onClick={handleGoBack}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
              <button
                onClick={handleGoToDashboard}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Page variant - full page error (default)
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 dark:bg-red-900/30 p-6 rounded-full">
              <ShieldAlert className="w-16 h-16 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {title}
          </h1>

          {/* Message */}
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-6">
            {message}
          </p>

          {/* User Info */}
          {user && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Logged in as:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {user.email}
                </span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                  {user.role.toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {/* Required Permission */}
          {requiredPermission && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                    Missing Required Permission
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    This area requires the following permission:
                  </p>
                  <code className="block mt-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 px-3 py-2 rounded text-sm font-mono">
                    {requiredPermission}
                  </code>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          {showBackButton && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleGoBack}
                className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
              <button
                onClick={handleGoToDashboard}
                className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
              If you believe you should have access to this area, please contact your administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
