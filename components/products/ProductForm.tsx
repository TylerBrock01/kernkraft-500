import {CategoriesResponseSchema, Product} from "@/src/schema";
import UploadProductImage from "@/components/products/UploadProductImage";

async function getCategories(){
    const url = `${process.env.API_URL}/categories`;
    const request = await fetch(url);
    const json = await request.json();
    const categories = CategoriesResponseSchema.safeParse(json);
    return categories;
}
export default async function ProductForm({product} :{product?: Product}) {
    const categories = await getCategories();
    return (
        <>
            <div className="space-y-2 ">
                <label
                    htmlFor="name"
                    className="block"
                >Nombre Producto</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre Producto"
                    className="border border-gray-300 w-full p-2"
                    name="name"
                    defaultValue={product?.name}
                />
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="price"
                    className="block"
                >Precio</label>
                <input
                    id="price"
                    type="number"
                    placeholder="Precio Producto"
                    className="border border-gray-300 w-full p-2"
                    name="price"
                    min={0}
                    defaultValue={product?.price}
                />
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="stock"
                    className="block"
                >Inventario</label>
                <input
                    id="stock"
                    type="number"
                    placeholder="Cantidad Disponible"
                    className="border border-gray-300 w-full p-2"
                    name="stock"
                    min={0}
                    defaultValue={product?.stock}
                />
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="categoryId"
                    className="block"
                >Categoría</label>
                <select
                    id="categoryId"
                    className="border border-gray-300 w-full p-2 bg-white"
                    name="categoryId"
                    defaultValue={product?.category?.id}
                >
                    <option value="" >Seleccionar Categoría</option>
                    {categories.data?.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <UploadProductImage/>
        </>
    )
}