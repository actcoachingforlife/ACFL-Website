'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // Example:
    // Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Something went wrong
              </h1>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We apologize for the inconvenience. An unexpected error has occurred.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 text-left overflow-auto max-h-64">
                  <p className="text-sm font-mono text-red-600 dark:text-red-400 mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={this.handleReset}
                  className="inline-flex items-center"
                  variant="default"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>

                <Button
                  onClick={this.handleGoHome}
                  className="inline-flex items-center"
                  variant="outline"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Homepage
                </Button>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                If this problem persists, please contact support.
              </p>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// Functional wrapper for easier usage
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}
