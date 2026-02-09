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
            }
        ]
    }
};

export default nextConfig;
