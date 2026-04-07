import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: `${process.env.NEXT_PUBLIC_DOMAIN}`,
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
                hostname: '*.giphy.com', // ✅ Corrección: Comodín absoluto para subdominios
                pathname: '/media/**',
            },
        ]
    }
};

export default nextConfig;
