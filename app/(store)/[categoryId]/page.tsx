import {CategoryWithProductsResponseSchema} from "@/app/src/schema";

type Params = Promise<{categoryId: string}>;

async function getProducts(categoryId: string) {
    const url = `${process.env.API_URL}/categories/${categoryId}?products=true`
    const req = await fetch(url)
    const json = await req.json()
    console.log(json)
    return CategoryWithProductsResponseSchema.parse(json)
}
export default async function StorePage({params}: { params: Params}) {
    const {categoryId} = await params
    const products= await getProducts(categoryId)
    console.log(products)
    return(
        <div>Page</div>
    )
}