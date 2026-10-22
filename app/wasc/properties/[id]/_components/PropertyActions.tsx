export function PropertyActions({ whatsappUrl }: { whatsappUrl: string }) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-md shadow-emerald-600/20 active:scale-[0.99]"
            >
                <span>💬</span> Agendar Visita por WhatsApp
            </a>
            <button
                type="button"
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-md shadow-red-500/20 active:scale-[0.99]"
            >
                Contactar Asesor
            </button>
        </div>
    );
}