import {CartItem} from "@/src/schema";

export default function ShoppingCartItem({item}:{item: CartItem}) {
    return (
        <li className="flex items-center space-x-6 py-6 relative">
            <div className='h-24 w-24'>
            </div>
            <div className="flex-auto space-y-2">
                <h3 className="text-gray-900">
                    {item.name}
                </h3>
                <p></p>
                <select
                    className="w-32 text-center p-2 rounded-lg bg-white"
                    value={1}
                    onChange={() => {}}
                >
                </select>
            </div>
            <div className='absolute top-10 -right-0'>
                <button
                    type="button"
                    onClick={() => {}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </li>
    )
}