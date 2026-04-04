import React from 'react';

// Next.js pasa el parámetro de la URL dinámicamente a través de "params"
export default function TenantPage({ params }: { params: { tenant: string } }) {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-zinc-100">
                Vitrina pública del negocio: <span className="text-blue-500">{params.tenant}</span>
            </h1>
        </div>
    );
}