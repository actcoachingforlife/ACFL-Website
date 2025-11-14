import createCache from '@emotion/cache';

// Create emotion cache with a nonce for CSP
export function createEmotionCache() {
  return createCache({
    key: 'css',
    prepend: true, // Ensures MUI styles are loaded first
  });
}
