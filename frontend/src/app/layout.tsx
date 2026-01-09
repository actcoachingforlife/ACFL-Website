import type { Metadata } from 'next'
import Script from 'next/script'
import Providers from '@/components/Providers'
import { ThemeScript } from '@/components/ThemeScript'
import './globals.css'

export const metadata: Metadata = {
  title: 'ACT Coaching For Life',
  description: 'Find the right coach for your personal growth journey',
  icons: {
    icon: '/favicon.ico',
  },
}

// Force all pages to use dynamic rendering
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const squareEnvironment = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT || 'sandbox';
  const squareScriptUrl = squareEnvironment === 'production'
    ? 'https://web.squarecdn.com/v1/square.js'
    : 'https://sandbox.web.squarecdn.com/v1/square.js';

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        {/* Security: Block malicious scripts injected by compromised infrastructure */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // List of malicious domains to block
              const blocklist = [
                '99fkw4w8.com',
                '99fitbooth.com',
                'fitbooth.com'
              ];

              // Remove any script tags from blocked domains
              function removeBlockedScripts() {
                const scripts = document.querySelectorAll('script[src]');
                scripts.forEach(script => {
                  const src = script.src || '';
                  if (blocklist.some(domain => src.includes(domain))) {
                    console.warn('[Security] Blocked malicious script:', src);
                    script.remove();
                  }
                });
              }

              // Run immediately and again when DOM is ready
              removeBlockedScripts();
              document.addEventListener('DOMContentLoaded', removeBlockedScripts);

              // Also intercept any new script injections
              function setupObserver() {
                if (!document.head || !document.body) {
                  // Defer if DOM not ready yet
                  setTimeout(setupObserver, 100);
                  return;
                }

                const observer = new MutationObserver((mutations) => {
                  mutations.forEach(mutation => {
                    if (mutation.addedNodes.length) {
                      mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.tagName === 'SCRIPT' && node.src) {
                          if (blocklist.some(domain => node.src.includes(domain))) {
                            console.warn('[Security] Blocked injected script:', node.src);
                            node.remove();
                          }
                        }
                      });
                    }
                  });
                });

                observer.observe(document.head, { childList: true, subtree: true });
                observer.observe(document.body, { childList: true, subtree: true });
              }

              setupObserver();
            })();
          `
        }} />
        <ThemeScript />
        <Script
          src={squareScriptUrl}
          strategy="beforeInteractive"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
