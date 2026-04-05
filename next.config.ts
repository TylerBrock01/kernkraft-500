import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'https://kernkraft-500-26jy.vercel.app/'
            },
            {
                protocol:'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**', // Permite todas las rutas de este dominio
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
            },
            {
                protocol: 'https',
                hostname: 'media*.giphy.com', // El asterisco permite media0, media1, media2, etc.
                port: '',
                pathname: '/media/**',
            },
        ]
    }
};

export default nextConfig;
