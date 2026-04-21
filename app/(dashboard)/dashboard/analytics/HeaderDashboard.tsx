import React from "react";
import ExportButton from "@/components/dashboard/ExportButton";

export default function HeaderDashboard() {
    return(
        <div className="mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">Radar Financiero</h1>
            <p className="text-zinc-500 font-mono text-xs mt-1 uppercase tracking-widest">Motor de Inteligencia CAZA // Datos en Tiempo Real</p>
            <div className={'hidden'}>
                <ExportButton/>
            </div>
        </div>
    )
}