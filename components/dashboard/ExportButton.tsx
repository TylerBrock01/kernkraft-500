'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { api } from '@/app/lib/axios/axios'; // Ajusta la ruta a tu instancia de Axios

export default function ExportButton() {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        try {
            // 1. Pedimos el archivo asegurándonos de enviar el Token
            // 🛡️ CRÍTICO: responseType: 'blob' le dice a Axios que no espere un JSON
            const response = await api.get('/analytics/export/csv', {
                responseType: 'blob',
            });

            // 2. Creamos una URL temporal en la memoria del navegador
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // 3. Creamos un enlace <a> invisible
            const link = document.createElement('a');
            link.href = url;

            // 4. Intentamos extraer el nombre del archivo de las cabeceras (opcional)
            // Si no viene, le ponemos un nombre por defecto
            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'reporte_caza.csv';
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                if (fileNameMatch && fileNameMatch.length === 2) {
                    fileName = fileNameMatch[1];
                }
            }

            link.setAttribute('download', fileName);

            // 5. Lo agregamos al DOM, hacemos clic y lo destruimos
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url); // Limpiamos la memoria

        } catch (error) {
            console.error('Error al exportar el CSV:', error);
            // Aquí puedes agregar tu Toast de error para avisarle al usuario
        } finally {
            setIsExporting(false);
        }
    };

    return (
        // Reemplaza desde la apertura del botón hasta el cierre
        <button
            onClick={handleExport}
            disabled={isExporting}
            className={`
    flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300
    ${isExporting
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]'
            }
  `}
        >
            {isExporting ? (
                <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Generando...</span>
                </>
            ) : (
                <>
                    <Download size={16} />
                    <span>Exportar CSV</span>
                </>
            )}
        </button>
    );
}