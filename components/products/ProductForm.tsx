// components/products/ProductForm.tsx
import { CategoriesResponseSchema, DeckCategoryResponseSchema, Product } from "@/src/schema";
import UploadProductImage from "@/components/products/UploadProductImage";

async function getCategories() {
    const url = `${process.env.API_URL}/categories`;
    const request = await fetch(url);
    const json = await request.json();
    return CategoriesResponseSchema.safeParse(json);
}

async function getDeck() {
    const url = `${process.env.API_URL}/decks`;
    const request = await fetch(url);
    const json = await request.json();
    return DeckCategoryResponseSchema.safeParse(json);
}

export default async function ProductForm({ product }: { product?: Product }) {
    const categories = await getCategories();
    const decks = await getDeck();

    const labelStyles = "block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2";
    const inputStyles = "w-full bg-zinc-950 border border-white/10 p-3 text-white text-sm font-mono focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all placeholder:text-zinc-700";

    return (
        <div className="space-y-8">
            {/* NAME: FULL WIDTH */}
            <div className="space-y-2">
                <label htmlFor="name" className={labelStyles}>Item_Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="E.j. DECK_VASK8_PRO_SERIES"
                    className={inputStyles}
                    name="name"
                    defaultValue={product?.name}
                />
            </div>

            {/* GRID: PRICE, STOCK, COLOR, SIZE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="price" className={labelStyles}>Price_Val (MXN)</label>
                    <input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        className={inputStyles}
                        name="price"
                        min={0}
                        defaultValue={product?.price}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="stock" className={labelStyles}>Stock_Units</label>
                    <input
                        id="stock"
                        type="number"
                        placeholder="00"
                        className={inputStyles}
                        name="stock"
                        min={0}
                        defaultValue={product?.stock}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="color" className={labelStyles}>Hex_Color / Color_Ref</label>
                    <input
                        id="color"
                        type="text"
                        placeholder="Matte_Black"
                        className={inputStyles}
                        name="color"
                        defaultValue={product?.color}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="size" className={labelStyles}>Size_Spec (Inches/Scale)</label>
                    <input
                        id="size"
                        type="number"
                        step="0.01"
                        placeholder="8.25"
                        className={inputStyles}
                        name="size"
                        defaultValue={product?.size}
                    />
                </div>
            </div>

            {/* SELECTS: CATEGORY & DECK */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="categoryId" className={labelStyles}>Class_Category</label>
                    <select
                        id="categoryId"
                        className={`${inputStyles} appearance-none cursor-pointer`}
                        name="categoryId"
                        defaultValue={product?.category?.id}
                    >
                        <option value="" className="bg-zinc-900">-- Select_Class --</option>
                        {categories.data?.map(category => (
                            <option key={category.id} value={category.id} className="bg-zinc-900">{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="deckId" className={labelStyles}>Sub_Class (Deck)</label>
                    <select
                        id="deckId"
                        className={`${inputStyles} appearance-none cursor-pointer`}
                        name="deckId"
                        defaultValue={product?.deck?.id}
                    >
                        <option value="" className="bg-zinc-900">-- Select_Type --</option>
                        {decks.data?.map(deck => (
                            <option key={deck.id} value={deck.id} className="bg-zinc-900">{deck.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* IMAGE UPLOAD SECTION */}
            <div className="pt-6 border-t border-white/5">
                <UploadProductImage currentImage={product?.image} />
            </div>
        </div>
    )
}