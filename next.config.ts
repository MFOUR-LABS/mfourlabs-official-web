import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mfourlabs.dev',
            },
            {
                protocol: 'https',
                hostname: 'aistudiocdn.com',
            },
        ],
        unoptimized: true, // Required for static export
    },
    // Enable React strict mode
    reactStrictMode: true,
    // Configure output for Vercel deployment
    output: 'standalone',
};

export default nextConfig;
