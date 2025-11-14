'use client'

import * as React from 'react'
import { X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  title?: string
  description?: string
  type?: ToastType
  duration?: number
}

interface ToastProps {
  toast: Toast
  onClose: (id: string) => void
}

const ToastComponent = ({ toast, onClose }: ToastProps) => {
  const { id, title, description, type = 'info' } = toast

  React.useEffect(() => {
    const duration = toast.duration ?? 5000
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [id, toast.duration, onClose])

  const bgColor = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  }[type]

  const titleColor = {
    success: 'text-green-900 dark:text-green-100',
    error: 'text-red-900 dark:text-red-100',
    warning: 'text-yellow-900 dark:text-yellow-100',
    info: 'text-blue-900 dark:text-blue-100',
  }[type]

  const descColor = {
    success: 'text-green-700 dark:text-green-300',
    error: 'text-red-700 dark:text-red-300',
    warning: 'text-yellow-700 dark:text-yellow-300',
    info: 'text-blue-700 dark:text-blue-300',
  }[type]

  return (
    <div
      className={`${bgColor} border rounded-lg shadow-lg p-4 min-w-[300px] max-w-md animate-in slide-in-from-right fade-in duration-300`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {title && (
            <div className={`font-semibold ${titleColor} mb-1`}>
              {title}
            </div>
          )}
          {description && (
            <div className={`text-sm ${descColor}`}>
              {description}
            </div>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export default ToastComponent
