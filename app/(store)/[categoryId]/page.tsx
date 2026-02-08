import {CategoryWithProductsResponseSchema} from "@/src/schema";
import ProductCard from "@/components/products/ProductCards";
import {redirect} from "next/navigation";

type Params = Promise<{categoryId: string}>;

async function getProducts(categoryId: string) {
    const url = `${process.env.API_URL}/categories/${categoryId}?products=true`
    const req = await fetch(url,{
        next:{
            tags:['products-by-category']
        }
    })
    const json = await req.json()
    if (!req.ok){
        redirect('/')
    }
    return CategoryWithProductsResponseSchema.parse(json)
}
export default async function StorePage({params}: { params: Params}) {
    const {categoryId} = await params
    const category= await getProducts(categoryId)
    return(
        <div>
            <h2 className={" bg-fondo3 text-2xl p-1 border-l-5 border-fondo2"}>{category.name}:</h2>
            <div className='p-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 bg-fondo2'>
                { category.products.map(product =>
                    <ProductCard key={product.id} product={product}/>)}
            </div>
        </div>
    )
}