import Heading from "@/components/UI/Heading";
import TransactionFilter from "@/components/transactions/TransactionFilter";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {format} from "date-fns";
import {getSalesByDate} from "@/src/api";

// 1. Importa cookies de next/headers
import { cookies } from 'next/headers';

// 2. Antes del prefetchQuery, saca el token
const cookieStore = await cookies();
const token = cookieStore.get('skate_token')?.value;

// 3. Pásalo a la función


export default async function SalesPage() {

    const queryClient = new QueryClient();
    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");

    // 1. Extraemos el token del lado del servidor
    const cookieStore = await cookies();
    const token = cookieStore.get('skate_token')?.value;

    // 2. Pasamos el token explícitamente al prefetch
    await queryClient.prefetchQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate, token) // <--- Enviar token aquí
    });

    return (
        <>
            <Heading>Ventas</Heading>
            <p className="md:text-lg">En esta sección podrás ver las ventas...</p>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <TransactionFilter />
            </HydrationBoundary>
        </>
    );
}