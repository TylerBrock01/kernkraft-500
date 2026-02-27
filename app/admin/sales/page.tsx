import { cookies } from 'next/headers';
import { format } from "date-fns";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Heading from "@/components/UI/Heading";
import TransactionFilter from "@/components/transactions/TransactionFilter";
import { getSalesByDate } from "@/src/api";

export default async function SalesPage() {
    // 1. Inicializamos herramientas básicas
    const queryClient = new QueryClient();
    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");

    // 2. Extraemos el token del lado del servidor (una sola vez)
    const cookieStore = await cookies();
    const token = cookieStore.get('skate_token')?.value;

    // 3. Prefetch: Llenamos el caché del servidor antes de enviar la página al cliente
    await queryClient.prefetchQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate, token)
    });

    return (
        <>
            <Heading>Ventas</Heading>
            <p className="md:text-lg text-gray-600">
                En esta sección podrás ver las ventas utilizando el calendario para filtrar por fecha.
            </p>

            {/* El HydrationBoundary "pasa" los datos del prefetch al componente de cliente */}
            <HydrationBoundary state={dehydrate(queryClient)}>
                <TransactionFilter />
            </HydrationBoundary>
        </>
    );
}