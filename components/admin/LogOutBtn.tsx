'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
    const router = useRouter()

    const handleLogout = () => {
        // 1. Borramos la "llave"
        Cookies.remove('skate_token')

        // 2. Mandamos al usuario a la calle (Home)
        router.push('/')

        // 3. Refrescamos para que el Middleware se active
        router.refresh()
    }

    return (
        <button
            id={'logoutButton'}
            onClick={handleLogout}
            className="text-zinc-500 hover:text-red-500 font-bold uppercase text-xs transition-colors"
        >
            Cerrar Sesión
        </button>
    )
}
