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

    // En tu providers.tsx
    useEffect(() => {
        // Solo sincronizamos el ID. La lógica de "limpiar" ya está dentro de setUserId
        setUserId(userId);
    }, [userId, setUserId]); // Quita 'currentStoreUserId' de las dependencias

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}