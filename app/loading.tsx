import React from 'react';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden selection:none">

            {/* 🚀 INYECCIÓN DE CSS PURO (Compatible con Server Components) */}
            <style>{`
        @keyframes scanLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan-line {
          animation: scanLine 1.5s ease-in-out infinite;
        }
      `}</style>

            {/* 🌐 FONDO DE CUADRÍCULA (RADAR TÁCTICO) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

            {/* 🔴 EL NÚCLEO DEL MOTOR */}
            <div className="relative w-32 h-32 mb-10 flex items-center justify-center">

                {/* Anillo Exterior (Lento) */}
                <div className="absolute inset-0 border border-zinc-800 rounded-full animate-[spin_4s_linear_infinite]"></div>

                {/* Anillo Intermedio (Rápido y con color) */}
                <div className="absolute inset-2 border-t-2 border-blue-600 border-r-2 border-transparent rounded-full animate-[spin_1s_linear_infinite]"></div>

                {/* Anillo Interior (Contrario) */}
                <div className="absolute inset-6 border-b-2 border-emerald-500 border-l-2 border-transparent rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>

                {/* Centro de Energía */}
                <div className="absolute w-4 h-4 bg-white rounded-full animate-ping opacity-20"></div>
                <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]"></div>
            </div>

            {/* 📟 TEXTO DE SISTEMA */}
            <div className="text-center relative z-10 flex flex-col items-center">
                <h2 className="text-white font-black uppercase tracking-[0.4em] text-sm md:text-base mb-3 flex items-center gap-3">
                    Motor CAZA
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                </h2>

                {/* Simulación de Terminal */}
                <div className="h-6 overflow-hidden flex flex-col items-center justify-center">
                    <p className="text-zinc-600 font-mono text-[9px] md:text-[10px] uppercase tracking-widest animate-pulse">
                        Sincronizando Nodos de Comercio...
                    </p>
                </div>

                {/* Barra de Progreso Simulada */}
                <div className="w-48 h-[1px] bg-zinc-900 mt-6 relative overflow-hidden">
                    {/* 🚀 Usamos la clase custom que creamos en la etiqueta style arriba */}
                    <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scan-line"></div>
                </div>
            </div>

            {/* 🛡️ SELLO DE AGENCIA */}
            <div className="absolute bottom-8 right-8 hidden md:block text-right">
                <p className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.3em]">Crux Aero Zenith</p>
                <p className="text-[8px] font-mono text-zinc-800 uppercase tracking-[0.2em] mt-1">SYS_LOAD // V.3.1</p>
            </div>

        </div>
    );
}