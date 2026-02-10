import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'kernkraft-500-fzy6t8ur3-tylerbrock01s-projects.vercel.app'
            },
            {
                protocol:'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'http',
                hostname: process.env.DOMAIN!
            },
            {
                protocol: 'https',
                hostname: 'http2.mlstatic.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
                port: '',
                pathname: '/**',
            }
        ]
    }
};

export default nextConfig;
