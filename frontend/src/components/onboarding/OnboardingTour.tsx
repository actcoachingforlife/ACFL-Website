'use client';

import React from 'react';
import Joyride, { Step, CallBackProps, STATUS, EVENTS } from 'react-joyride';

interface OnboardingTourProps {
  steps: Step[];
  run: boolean;
  onFinish: () => void;
  onStepChange?: (data: CallBackProps) => void;
  continuous?: boolean;
  showProgress?: boolean;
  showSkipButton?: boolean;
}

export default function OnboardingTour({
  steps,
  run,
  onFinish,
  onStepChange,
  continuous = true,
  showProgress = false,
  showSkipButton = true,
}: OnboardingTourProps) {
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      onFinish();
    }

    // Call onStepChange callback if provided
    if (onStepChange && type === EVENTS.STEP_AFTER) {
      onStepChange(data);
    }

    // Log tour interactions for analytics
    if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      console.log('Tour interaction:', { status, type, step: data.index });
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={continuous}
      showProgress={showProgress}
      showSkipButton={showSkipButton}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#0ea5e9',
          textColor: '#1f2937',
          backgroundColor: '#ffffff',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          arrowColor: '#ffffff',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 8,
          padding: 20,
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipTitle: {
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '10px',
        },
        tooltipContent: {
          fontSize: '14px',
          lineHeight: '1.5',
          padding: '10px 0',
        },
        buttonNext: {
          backgroundColor: '#0ea5e9',
          borderRadius: 6,
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: 500,
        },
        buttonBack: {
          color: '#6b7280',
          marginRight: 10,
        },
        buttonSkip: {
          color: '#9ca3af',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip Tour',
      }}
      disableScrolling={false}
      spotlightPadding={4}
      disableOverlayClose={false}
      hideCloseButton={false}
    />
  );
}
