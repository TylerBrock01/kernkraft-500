import {CategoryWithProductsResponseSchema} from "@/src/schema";
import ProductCard from "@/components/products/ProductCards";
import {redirect} from "next/navigation";
import HeadingHighlight from "@/components/UI/HeadingHighlight";

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
        redirect('/categories/1')
    }
    return CategoryWithProductsResponseSchema.parse(json)
}
export default async function StorePage({params}: { params: Params}) {
    const {categoryId} = await params
    const category= await getProducts(categoryId)
    return(
        <div className={"mt-2"}>
            <div className={"bg-black/50"}>
                <HeadingHighlight highlight={"coleccion"}>nuestra </HeadingHighlight>

                <h2 className={"text-zinc-200 mt-2 text-2xl p-1 animate-fade-in-right"}>{category.name}:</h2>
            </div>
            <div className='  p-2 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 '>
                { category.products.map(product =>
                    <ProductCard key={product.id} product={product}/>)}
            </div>
        </div>
    )
}