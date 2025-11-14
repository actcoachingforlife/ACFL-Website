"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useOnboarding } from '@/contexts/OnboardingContext'
import OnboardingTour from '@/components/onboarding/OnboardingTour'
import { paymentTourSteps } from '@/components/onboarding/CoachOnboardingTours'
import CoachPageWrapper from '@/components/CoachPageWrapper'
import CoachBillingManagement from '@/components/coach/BillingManagement'

export default function CoachBillingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { completeStep } = useOnboarding()

  const [coachId, setCoachId] = useState<string>('')
  const [showPaymentTour, setShowPaymentTour] = useState(false)

  useEffect(() => {
    if (user?.id) {
      setCoachId(user.id)
    }
  }, [user])

  // Check URL param to start tour after navigation
  useEffect(() => {
    const shouldStartTour = searchParams.get('startTour')

    if (shouldStartTour === 'true' && coachId) {
      console.log('Starting payment tour from URL param')
      setShowPaymentTour(true)

      // Clean up URL
      window.history.replaceState({}, '', '/coaches/billing')
    }
  }, [searchParams, coachId])

  if (!coachId) {
    return (
      <CoachPageWrapper title="Billing & Earnings" description="Manage your earnings, payouts, and financial history">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </CoachPageWrapper>
    )
  }

  return (


    <div id='coach-billing-page' className="min-h-screen  dark:bg-gray-900 transition-colors">
    <CoachPageWrapper title="Billing & Earnings" description="Manage your earnings, payouts, and financial history" >
      <CoachBillingManagement coachId={coachId} />

      {/* Onboarding Tour */}
      <OnboardingTour
        steps={paymentTourSteps}
        run={showPaymentTour}
        onFinish={() => {
          setShowPaymentTour(false)
          completeStep('configure-payment')
        }}
      />
    </CoachPageWrapper>
    </div>
  )
}