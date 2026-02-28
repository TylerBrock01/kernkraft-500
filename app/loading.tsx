// app/loading.tsx (o en la ruta que prefieras)
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-[60vh] p-10 bg-black">

            {/* Contenedor del GIF con Efecto de Monitor Industrial */}
            <div className="relative group overflow-hidden rounded-2xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,1)]">

                {/* Capa de Escaneo (Scanline) */}
                <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%),linear-gradient(to_right,rgba(255,0,0,0.05),rgba(0,255,0,0.02),rgba(0,0,255,0.05))] bg-[length:100%_2px,3px_100%]" />

                {/* Línea Láser de Escaneo */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-yellow-400/50 shadow-[0_0_15px_#facc15] z-30 animate-[scan_2s_linear_infinite]" />

                <Image
                    className="grayscale contrast-125 opacity-70"
                    src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXA2cGk5ZWhodndvZGxvNzBxcGZ1N25tZGNncnB5YjY1aTB3a2R3YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oBEUg7opRlyik/giphy.gif"
                    alt="Cargando VASK8"
                    width={500}
                    height={500}
                    unoptimized={true}
                />
            </div>

            {/* Mensajes de Sistema */}
            <div className="mt-10 space-y-4 text-center">
                <div className="flex items-center justify-center gap-3">
                    <Loader2 className="h-5 w-5 text-yellow-400 animate-spin" />
                    <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-white animate-pulse">
                        Sincronizando <span className="text-yellow-400">Gear</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">
                        Protocolo_VASK8_v.2.6 // Cargando_Inventario
                    </p>
                    <div className="flex justify-center gap-2">
                        <span className="w-1 h-1 bg-yellow-400 rounded-full animate-ping" />
                        <span className="w-1 h-1 bg-yellow-400 rounded-full animate-ping [animation-delay:0.2s]" />
                        <span className="w-1 h-1 bg-yellow-400 rounded-full animate-ping [animation-delay:0.4s]" />
                    </div>
                </div>
            </div>

            {/* Decoración de Esquinas (Brutalist Tech) */}
            <div className="absolute bottom-10 right-10 hidden md:block">
                <p className="text-[9px] font-mono text-zinc-800 text-right">
                    SYS_LOAD: OK<br />
                    ASSET_FETCH: PENDING...<br />
                    VASK8_CORE: ACTIVE
                </p>
            </div>
        </div>
    )
}