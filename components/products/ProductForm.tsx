import {CategoriesResponseSchema, DeckCategoryResponseSchema, Product} from "@/src/schema";
import UploadProductImage from "@/components/products/UploadProductImage";

async function getCategories(){
    const url = `${process.env.API_URL}/categories`;
    const request = await fetch(url);
    const json = await request.json();
    const categories = CategoriesResponseSchema.safeParse(json);
    return categories;
}
async function getDeck(){
    const url = `${process.env.API_URL}/decks`;
    const request = await fetch(url);
    const json = await request.json();
    const deck = DeckCategoryResponseSchema.safeParse(json);
    return deck;
}
export default async function ProductForm({product} :{product?: Product}) {
    const categories = await getCategories();
    const decks = await getDeck();
    return (
        <>
            {/*name*/}
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
            {/*price*/}
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
            {/*stock*/}
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
            {/*color*/}
            <div className="space-y-2 ">
                <label
                    htmlFor="color"
                    className="block"
                >Color de Producto</label>
                <input
                    id="color"
                    type="text"
                    placeholder="Color de Producto"
                    className="border border-gray-300 w-full p-2"
                    name="color"
                    defaultValue={product?.color}
                />
            </div>
            {/*size*/}
            <div className="space-y-2 ">
                <label
                    htmlFor="size"
                    className="block"
                >Medida de Producto</label>
                <input
                    id="size"
                    type="number"
                    placeholder="Medida de Producto"
                    className="border border-gray-300 w-full p-2"
                    name="size"
                    defaultValue={product?.size}
                />
            </div>
            {/*category*/}
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
            {/*deck*/}
            <div className="space-y-2 ">
                <label
                    htmlFor="deckId"
                    className="block"
                >Deck</label>
                <select
                    id="deckId"
                    className="border border-gray-300 w-full p-2 bg-white"
                    name="deckId"
                    defaultValue={product?.deck?.id}
                >
                    <option value="" >Seleccionar Deck</option>
                    {decks.data?.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <UploadProductImage
                currentImage ={product?.image}
            />
        </>
    )
}