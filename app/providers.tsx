// app/providers.tsx
'use client'

import { useEffect } from "react";
import { useStore } from "@/src/store";
import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

// --- Configuración de React Query ---
function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (isServer) {
        return makeQueryClient()
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

// --- Componente Providers ---
interface ProvidersProps {
    children: React.ReactNode
    userId: string | null // 👈 Recibimos el ID desde el layout.tsx
}

export default function Providers({ children, userId }: ProvidersProps) {
    const queryClient = getQueryClient()

    // Acciones de Zustand para el locker del usuario
    const setUserId = useStore(state => state.setUserId);
    const currentStoreUserId = useStore(state => state.userId);
    const clearOrder = useStore(state => state.clearOrder);

    useEffect(() => {
        /** * PROTOCOLO DE SINCRONIZACIÓN VASK8
         * Si el ID de la cookie es diferente al guardado en LocalStorage,
         * significa que hubo un cambio de cuenta o cierre de sesión.
         */
        if (userId !== currentStoreUserId) {
            console.log("🛠️ Sincronizando Locker de Usuario...");
            clearOrder(); // Evitamos que el carrito de "Juan" lo vea "Pedro"
            setUserId(userId);
        }
    }, [userId, currentStoreUserId, setUserId, clearOrder]);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}