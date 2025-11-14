'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

export interface TourStep {
  target: string; // CSS selector
  content: React.ReactNode;
  title?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  disableOverlayClose?: boolean;
}

interface CustomTourProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export default function CustomTour({ steps, isOpen, onClose, onComplete }: CustomTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Update target element position and scroll into view
  useEffect(() => {
    if (!isOpen || !step) return;

    const updatePosition = () => {
      if (step.placement === 'center') {
        setTargetRect(null);
        return;
      }

      const element = document.querySelector(step.target);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);

        // Scroll element into view with offset for fixed headers
        const scrollOffset = 100;
        const elementTop = rect.top + window.scrollY - scrollOffset;

        window.scrollTo({
          top: elementTop,
          behavior: 'smooth'
        });
      } else {
        console.warn(`Tour target not found: ${step.target}`);
        setTargetRect(null);
      }
    };

    // Delay to allow for page render
    const timeout = setTimeout(updatePosition, 100);

    // Update on window resize or scroll
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isOpen, step, currentStep]);

  // Calculate tooltip position
  useEffect(() => {
    if (!tooltipRef.current || !targetRect || step?.placement === 'center') return;

    const tooltip = tooltipRef.current.getBoundingClientRect();
    const padding = 20;
    let top = 0;
    let left = 0;

    switch (step.placement) {
      case 'top':
        top = targetRect.top - tooltip.height - padding;
        left = targetRect.left + (targetRect.width / 2) - (tooltip.width / 2);
        break;
      case 'bottom':
        top = targetRect.bottom + padding;
        left = targetRect.left + (targetRect.width / 2) - (tooltip.width / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - (tooltip.height / 2);
        left = targetRect.left - tooltip.width - padding;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height / 2) - (tooltip.height / 2);
        left = targetRect.right + padding;
        break;
      default:
        top = targetRect.bottom + padding;
        left = targetRect.left + (targetRect.width / 2) - (tooltip.width / 2);
    }

    // Keep tooltip within viewport
    const maxLeft = window.innerWidth - tooltip.width - 20;
    const maxTop = window.innerHeight - tooltip.height - 20;

    left = Math.max(20, Math.min(left, maxLeft));
    top = Math.max(20, Math.min(top, maxTop));

    setTooltipPosition({ top, left });
  }, [targetRect, step?.placement]);

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete?.();
    onClose();
  };

  const handleSkip = () => {
    onClose();
  };

  const handleOverlayClick = () => {
    if (!step?.disableOverlayClose) {
      handleSkip();
    }
  };

  if (!isOpen || !step) return null;

  return (
    <div className="fixed inset-0 z-[10000]" style={{ pointerEvents: 'none' }}>
      {/* Overlay with spotlight cutout */}
      <div
        className="absolute inset-0"
        style={{ pointerEvents: 'auto' }}
        onClick={handleOverlayClick}
      >
        {/* Top overlay */}
        {targetRect && (
          <>
            <div
              className="absolute left-0 right-0 bg-black/60 transition-all duration-300"
              style={{
                top: 0,
                height: `${targetRect.top - 10}px`
              }}
            />
            {/* Left overlay */}
            <div
              className="absolute bg-black/60 transition-all duration-300"
              style={{
                top: `${targetRect.top - 10}px`,
                left: 0,
                width: `${targetRect.left - 10}px`,
                height: `${targetRect.height + 20}px`
              }}
            />
            {/* Right overlay */}
            <div
              className="absolute bg-black/60 transition-all duration-300"
              style={{
                top: `${targetRect.top - 10}px`,
                left: `${targetRect.right + 10}px`,
                right: 0,
                height: `${targetRect.height + 20}px`
              }}
            />
            {/* Bottom overlay */}
            <div
              className="absolute left-0 right-0 bg-black/60 transition-all duration-300"
              style={{
                top: `${targetRect.bottom + 10}px`,
                bottom: 0
              }}
            />
            {/* Highlight border */}
            <div
              className="absolute border-4 border-blue-500 rounded-lg shadow-2xl transition-all duration-300 pointer-events-none"
              style={{
                top: `${targetRect.top - 10}px`,
                left: `${targetRect.left - 10}px`,
                width: `${targetRect.width + 20}px`,
                height: `${targetRect.height + 20}px`,
                boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.4)'
              }}
            />
          </>
        )}

        {/* Full overlay for center placement */}
        {step.placement === 'center' && (
          <div className="absolute inset-0 bg-black/60" />
        )}
      </div>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md transition-all duration-300"
        style={{
          pointerEvents: 'auto',
          ...(step.placement === 'center'
            ? {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }
            : {
                top: `${tooltipPosition.top}px`,
                left: `${tooltipPosition.left}px`
              }
          )
        }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {step.title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
              )}
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="ml-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Close tour"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="text-gray-700 dark:text-gray-300 mb-6">
            {step.content}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              Skip Tour
            </button>

            <div className="flex items-center gap-2">
              {!isFirstStep && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-1"
              >
                {isLastStep ? 'Finish' : 'Next'}
                {!isLastStep && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
