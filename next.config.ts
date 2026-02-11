import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "kernkraft-400.onrender.com"
            },
            {
                protocol:'https',
                hostname: 'res.cloudinary.com',
            }
        ]
    }
};

export default nextConfig;
