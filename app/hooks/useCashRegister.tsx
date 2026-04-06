import { useState, useEffect } from 'react';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';

export function useCashRegister() {
    // -------------------------------------------------------------
    // 1. ESTADOS GLOBALES DE LA SESIÓN
    // -------------------------------------------------------------
    const [isLoading, setIsLoading] = useState(true);
    const [activeSession, setActiveSession] = useState<any>(null);
    const [movements, setMovements] = useState<any[]>([]);
    const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);

    // -------------------------------------------------------------
    // 2. ESTADOS DE APERTURA (CARA A)
    // -------------------------------------------------------------
    const [openingBalance, setOpeningBalance] = useState('');
    const [isOpening, setIsOpening] = useState(false);

    // -------------------------------------------------------------
    // 3. ESTADOS DE CIERRE / ARQUEO (CARA B)
    // -------------------------------------------------------------
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    const [actualBalance, setActualBalance] = useState('');
    const [closeNotes, setCloseNotes] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const [closeSummary, setCloseSummary] = useState<any>(null);

    // -------------------------------------------------------------
    // MÉTODOS DE CONSULTA
    // -------------------------------------------------------------
    const fetchMyMovements = async () => {
        try {
            const res = await api.get('/cash-movements/my-shift');
            setMovements(res.data);
        } catch (error) {
            console.error('Error obteniendo movimientos:', error);
        }
    };

    const checkSession = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/cash-registers/current');
            setActiveSession(response.data);

            // 🚀 Si la caja está abierta, traemos la bitácora del turno de inmediato
            if (response.data) {
                fetchMyMovements();
            }
        } catch (error) {
            console.error('Error verificando la caja:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // -------------------------------------------------------------
    // CICLO DE VIDA
    // -------------------------------------------------------------
    useEffect(() => {
        checkSession();
    }, []);

    // -------------------------------------------------------------
    // ACCIÓN: ABRIR TURNO
    // -------------------------------------------------------------
    const handleOpenRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsOpening(true);
        const toastId = toast.loading('Inicializando bóveda...');

        try {
            const response = await api.post('/cash-registers/open', {
                openingBalance: Number(openingBalance)
            });
            toast.success(response.data.message || 'Turno iniciado', { id: toastId });
            setOpeningBalance('');
            checkSession(); // Recargamos para mostrar el Panel de Control (Cara B)
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al abrir caja', { id: toastId });
        } finally {
            setIsOpening(false);
        }
    };

    // -------------------------------------------------------------
    // ACCIÓN: CERRAR TURNO (ARQUEO)
    // -------------------------------------------------------------
    const handleCloseRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsClosing(true);
        const toastId = toast.loading('Procesando arqueo de caja...');

        try {
            const response = await api.post('/cash-registers/close', {
                actualBalance: Number(actualBalance),
                notes: closeNotes
            });

            toast.success('Corte finalizado exitosamente', { id: toastId });
            setCloseSummary(response.data); // Guardamos el resumen para mostrar el "Ticket"
            setIsCloseModalOpen(false);
            setActiveSession(null); // La caja vuelve a estar cerrada visualmente
            setActualBalance('');
            setCloseNotes('');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al cerrar caja', { id: toastId });
        } finally {
            setIsClosing(false);
        }
    };

    // -------------------------------------------------------------
    // EXPORTACIÓN DE LA API LOCAL
    // -------------------------------------------------------------
    return {
        isLoading,
        activeSession,
        movements,
        isMovementModalOpen, setIsMovementModalOpen,
        openingBalance, setOpeningBalance,
        isOpening, handleOpenRegister,
        isCloseModalOpen, setIsCloseModalOpen,
        actualBalance, setActualBalance,
        closeNotes, setCloseNotes,
        isClosing, handleCloseRegister,
        closeSummary, setCloseSummary,
        fetchMyMovements // Lo exportamos por si el Modal de Movimientos necesita forzar un refresh
    };
}