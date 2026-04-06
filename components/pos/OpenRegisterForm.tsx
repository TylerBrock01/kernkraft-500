import React from 'react';

interface OpenRegisterFormProps {
    openingBalance: string;
    setOpeningBalance: (val: string) => void;
    handleOpenRegister: (e: React.FormEvent) => void;
    isOpening: boolean;
}

export default function OpenRegisterForm({ openingBalance, setOpeningBalance, handleOpenRegister, isOpening }: OpenRegisterFormProps) {
    return (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center max-w-lg mx-auto w-full backdrop-blur-md">
            <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner border border-zinc-700">🔒</div>
            <h2 className="text-2xl font-bold text-white mb-2">Apertura de Turno</h2>
            <p className="text-zinc-500 text-sm mb-8">Ingresa el fondo de caja (morralla) para habilitar el punto de venta y comenzar a procesar transacciones.</p>

            <form onSubmit={handleOpenRegister} className="w-full space-y-6">
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-mono text-xl">$</span>
                    <input
                        required
                        type="number"
                        step="0.01"
                        min="0"
                        value={openingBalance}
                        onChange={(e) => setOpeningBalance(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 text-2xl rounded-xl pl-10 pr-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-center transition-all"
                        placeholder="0.00"
                    />
                </div>
                <button type="submit" disabled={isOpening} className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50">
                    {isOpening ? 'Desbloqueando...' : 'Iniciar Turno Operativo'}
                </button>
            </form>
        </div>
    );
}