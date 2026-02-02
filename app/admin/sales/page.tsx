import Heading from "@/components/UI/Heading";
import TransactionFilter from "@/components/transactions/TransactionFilter";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {format} from "date-fns";
import {getSalesByDate} from "@/src/api";

export default async function SalesPage() {
    const queryClient = new QueryClient();
    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd")
    await queryClient.prefetchQuery({
        queryKey:['sales',formattedDate],
        queryFn: ()=> getSalesByDate(formattedDate)

    })
    return(
        <>
            <Heading>ventas</Heading>
            <p className=" text-lg"> En esta seccion podras ver las ventas utilizando el calendario para filtrar por fecha</p>

            <HydrationBoundary state={dehydrate(queryClient) }>
                <TransactionFilter/>
            </HydrationBoundary>
        </>
    )
}