import Heading from "@/components/UI/Heading";
import {ProductResponseSchema} from "@/src/schema";
import ProductsTable from "@/components/products/ProductsTable";
import {redirect} from "next/navigation";
import {isValidPage} from "@/src/utils";
async function getProducts(take:number, skip:number){
    const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`;
    const req = await fetch(url)
    const json = await req.json()
    const data = ProductResponseSchema.parse(json)
    return {products: data.products, total: data.total};
}

type SearchParams = Promise<{page:string}>

export default async function ProductsPage({searchParams}: {searchParams: SearchParams}) {
    const {page} = await searchParams
    if (!isValidPage(+page)) redirect('/admin/products?page=1');

    const producstPerPage = 10
    const skip = (+page - 1) * producstPerPage;
    const {products, total} =await getProducts(producstPerPage,skip)
    const totalPages = Math.ceil( total/producstPerPage );
    if (+page > totalPages) redirect('/admin/products?page=1');


    return (
        <>
            <Heading>Administrar Productos</Heading>
            <ProductsTable
                products = {products}
            />
        </>
    )
}