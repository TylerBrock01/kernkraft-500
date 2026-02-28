'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (!res.ok) throw new Error('Credenciales incorrectas')

            const data = await res.json()

            // 3. GUARDAR EL TOKEN EN UNA COOKIE (Dura 1 día como tu JWT)
            Cookies.set('skate_token', data.access_token, { expires: 1 })

            // 4. REDIRIGIR AL ADMIN
            router.push('/admin/sales')
            router.refresh() // Refresca para que el layout detecte al usuario
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <div className="bg-black flex items-center justify-center p-5">
            <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-3xl border border-white/10 w-full max-w-md">
                <h1 className="text-3xl font-black italic text-white uppercase mb-6 text-center">
                    Admin <span className="text-yellow-400">Login</span>
                </h1>

                {error && <p className="bg-red-500/20 text-red-500 p-3 rounded-xl text-sm mb-4 border border-red-500/50">{error}</p>}

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        id={"email"}
                        className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:border-yellow-400 outline-none transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        id={"password"}
                        placeholder="Contraseña"
                        className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:border-yellow-400 outline-none transition-all"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button id={'logInButton'} className="w-full bg-yellow-400 text-black font-black py-4 rounded-xl uppercase hover:bg-yellow-300 transition-all hover:scale-[1.02] active:scale-95">
                        Entrar a la pista
                    </button>
                </div>
            </form>
        </div>
    )
}
