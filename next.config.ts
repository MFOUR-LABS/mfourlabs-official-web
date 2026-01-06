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
    },
    // Enable React strict mode
    reactStrictMode: true,
};

export default nextConfig;
