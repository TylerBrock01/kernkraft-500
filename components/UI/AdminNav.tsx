import Link from 'next/link'
import Logo from './Logo'

export default function AdminNav() {
    return (
        <header className="px-2 md:px-10 py-5 bg-gray-700 flex flex-col md:flex-row gap-2 md:justify-between">
            <div className="flex gap-5 text-white">
                <Logo />
            </div>

            <div className="flex gap-2 space-x-2 md:space-x-0 md:items-center">
                <Link
                    href={'/admin/products'}
                    className="rounded text-white font-bold p-2"
                >Productos</Link>

                <Link
                    href={'/admin/sales'}
                    className="rounded text-white font-bold p-2"
                >Ventas</Link>

                <Link
                    href={'/'}
                    className="rounded bg-green-400 font-bold py-2 px-10"
                >Tienda</Link>
            </div>
        </header>
    )
}