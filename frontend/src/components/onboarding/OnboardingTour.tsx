'use client';

import React from 'react';

interface OnboardingTourProps {
  steps?: any[];
  run?: boolean;
  onFinish?: () => void;
  onStepChange?: (data: any) => void;
  continuous?: boolean;
  showProgress?: boolean;
  showSkipButton?: boolean;
}

// Disabled component - replaced by CustomTour
// This component is kept for backward compatibility but renders nothing
export default function OnboardingTour(props: OnboardingTourProps) {
  // Component disabled - use CustomTour instead
  return null;
}
