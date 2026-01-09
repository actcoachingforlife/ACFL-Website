/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: () => null,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // Empty turbopack config to acknowledge we're using Turbopack (required for Next.js 16)
  turbopack: {},
  webpack: (config, { isServer, webpack }) => {
    // Add global polyfills for browser-only globals used by socket.io
    // This config is kept for webpack mode compatibility
    if (isServer) {
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.DefinePlugin({
          'self': 'global',
          'window': 'global',
        })
      );
    }

    // Add fallback for Node.js modules that socket.io might reference
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      dns: false,
    };

    return config;
  },
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    // Removed deprecated domains property - using remotePatterns instead
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/msgsndr/**',
      },
    ],
  },
  async headers() {
    const isDevelopment = process.env.NODE_ENV === "development";
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseWs = supabaseUrl.replace('http://', 'ws://').replace('https://', 'wss://');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const apiWs = apiUrl.replace('http://', 'ws://').replace('https://', 'wss://');

    // Square domains for payments
    const squareDomains = 'https://sandbox.web.squarecdn.com https://web.squarecdn.com https://connect.squareup.com https://connect.squareupsandbox.com';

    const connectSrc = isDevelopment
      ? `'self' https: ws: http://localhost:* ws://localhost:* ${supabaseUrl} ${supabaseWs} ${apiUrl} ${apiWs} ${squareDomains}`
      : `'self' https: wss: ${supabaseUrl} ${supabaseWs} ${apiUrl} ${apiWs} ${squareDomains}`;

    // Allowed script sources - only specific trusted domains, no broad 'https:' to prevent malicious injections
    const scriptSrc = isDevelopment
      ? `'self' 'unsafe-eval' 'unsafe-inline' ${squareDomains} https://web.squarecdn.com https://sandbox.web.squarecdn.com`
      : `'self' 'unsafe-inline' ${squareDomains} https://web.squarecdn.com`;

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self' ${squareDomains}; font-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src ${scriptSrc}; img-src 'self' data: https:; connect-src ${connectSrc}; frame-src 'self' ${squareDomains} https://maps.google.com https://www.google.com https://www.openstreetmap.org; child-src 'self' ${squareDomains} https://maps.google.com https://www.google.com https://www.openstreetmap.org;`,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          }
        ],
      },
    ];
  },
  async rewrites() {
    // Provide a safe default for production to avoid build-time error
    const backendURL = process.env.NEXT_PUBLIC_API_URL?.startsWith("http")
      ? process.env.NEXT_PUBLIC_API_URL
      : "http://localhost:3001";

    return [
      {
        source: "/api/:path*",
        destination: `${backendURL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
