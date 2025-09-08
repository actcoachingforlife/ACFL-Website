'use client'

import React from 'react'
import { useMeeting } from '@/contexts/MeetingContext'
import { AlertTriangle } from 'lucide-react'

interface MeetingBlockerProps {
  children: React.ReactNode
  blockMessage?: string
  allowSameMeetingAccess?: boolean
  currentMeetingId?: string
}

/**
 * Component that blocks access to certain functionality when user is in a meeting
 * Used to prevent multiple meeting sessions
 */
export default function MeetingBlocker({ 
  children, 
  blockMessage = "You are currently in a meeting. Please end your current session before accessing this page.",
  allowSameMeetingAccess = false,
  currentMeetingId
}: MeetingBlockerProps) {
  const { isInMeeting, currentMeetingId: contextMeetingId } = useMeeting()

  // Debug logging in development
  if (process.env.NODE_ENV === 'development' && isInMeeting) {
    console.log('🔍 MeetingBlocker Debug:', {
      isInMeeting,
      contextMeetingId,
      propCurrentMeetingId: currentMeetingId,
      allowSameMeetingAccess,
      idsMatch: contextMeetingId === currentMeetingId
    });
  }

  // If user is not in a meeting, show content normally
  if (!isInMeeting) {
    return <>{children}</>
  }

  // If same meeting access is allowed and the IDs match, show content
  if (allowSameMeetingAccess && currentMeetingId && contextMeetingId === currentMeetingId) {
    console.log('✅ Allowing same meeting access');
    return <>{children}</>
  }

  // Special case: For appointment pages, allow access even if meeting IDs don't match
  // This is because the appointment page should show the current meeting
  if (allowSameMeetingAccess && !currentMeetingId) {
    console.log('✅ Allowing appointment page access without specific meeting ID');
    return <>{children}</>
  }

  // Block access - show warning message
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Meeting in Progress</h2>
        <p className="text-sm text-gray-600 mb-4">
          {blockMessage}
        </p>
        {contextMeetingId && (
          <p className="text-xs text-orange-600 bg-orange-50 rounded px-3 py-2 mb-4">
            Active meeting: {contextMeetingId.substring(0, 12)}...
          </p>
        )}
        <p className="text-xs text-gray-500">
          Please end your current meeting to continue.
        </p>
      </div>
    </div>
  )
}