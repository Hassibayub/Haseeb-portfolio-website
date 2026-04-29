import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Turbopack requires native ARM64 binaries — use Webpack locally
  // On Vercel (Linux x64), Turbopack will be available
  typescript: {
    // Type checking runs separately via tsc; skip during build to work around
    // Next.js 16 WASM-mode type resolution issue on Apple Silicon
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
