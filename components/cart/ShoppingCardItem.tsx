// components/cart/ShoppingCartItem.tsx
import { CartItem } from "@/src/schema";
import Image from "next/image";
import { formatCurrency, getImagePath } from "@/src/utils";
import { useStore } from "@/src/store";
import { Trash2 } from "lucide-react";

export default function ShoppingCartItem({ item }: { item: CartItem }) {
    const updateStock = useStore(state => state.updateStock)
    const removeFromCart = useStore(state => state.clearCart) // Cambié el nombre interno por claridad

    return (
        <li className="flex items-center gap-4 py-6 relative group border-b border-white/5 last:border-0">
            {/* Miniatura de Producto */}
            <div className="h-20 w-20 shrink-0 bg-zinc-900 rounded-xl overflow-hidden border border-white/5 relative">
                <Image
                    src={getImagePath(item.image)}
                    alt={item.name}
                    fill
                    className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-500"
                    priority
                />
            </div>

            {/* Detalles Técnicos */}
            <div className="flex-auto space-y-1">
                <h3 className="text-sm font-black italic uppercase tracking-tighter text-white leading-tight">
                    {item.name}
                </h3>
                <p className="text-yellow-400 font-black italic text-lg tracking-tighter">
                    {formatCurrency(item.price)}
                </p>

                <div className="flex items-center gap-3 mt-2">
                    <label className="text-[9px] font-bold uppercase text-zinc-600 tracking-widest">Qty:</label>
                    <select
                        className="bg-zinc-950 border border-white/10 text-white text-[10px] font-bold py-1 px-3 rounded-md outline-none focus:border-yellow-400 transition-colors appearance-none cursor-pointer"
                        value={item.quantity}
                        onChange={(e) => updateStock(item.productId, +e.target.value)}
                    >
                        {Array.from({ length: item.stock }, (_, index) => index + 1).map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Acción de Eliminar */}
            <button
                type="button"
                className="p-2 text-zinc-700 hover:text-red-500 transition-colors"
                onClick={() => removeFromCart(item.productId)}
            >
                <Trash2 className="w-5 h-5 stroke-[1.5]" />
            </button>
        </li>
    )
}