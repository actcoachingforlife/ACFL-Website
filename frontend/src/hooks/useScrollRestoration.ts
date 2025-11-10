import { useEffect } from 'react';

/**
 * Custom hook to save and restore scroll position for a page
 * @param key - Unique identifier for the page's scroll position in sessionStorage
 * @param shouldRestore - Optional flag to control whether to restore scroll position (default: true)
 */
export function useScrollRestoration(key: string, shouldRestore: boolean = true) {
  // Save scroll position periodically and before navigation
  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem(key, window.scrollY.toString());
    };

    // Save scroll position before navigating away
    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    // Listen for navigation events
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Save scroll position periodically (every 500ms while scrolling)
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(saveScrollPosition, 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      saveScrollPosition(); // Save on unmount
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [key]);

  // Restore scroll position on mount
  useEffect(() => {
    if (shouldRestore) {
      const savedPosition = sessionStorage.getItem(key);
      if (savedPosition) {
        // Use setTimeout to ensure the page is fully rendered before scrolling
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedPosition, 10),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [key, shouldRestore]);
}
