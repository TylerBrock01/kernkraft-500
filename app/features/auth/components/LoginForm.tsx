'use client';

import type { FormEvent } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { PasswordInput } from './PasswordInput';
import { useLogin } from '../hooks/useLogin';
import {Input} from "@/app/features/auth/components/ui/Input";
import {FormField} from "@/app/features/auth/components/ui/FormField";

export function LoginForm() {
    const { submit, error, isLoading } = useLogin();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        submit({
            email: String(form.get('email')),
            password: String(form.get('password')),
        });
    };

    return (
        <>
            <AnimatePresence>
                {error && (
                    <motion.div
                        role="alert"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-3 bg-red-950/50 border border-red-900/50 rounded-lg flex items-start gap-3"
                    >
                        <span aria-hidden className="text-red-500 text-sm mt-0.5">⚠</span>
                        <p className="text-red-400 text-xs font-mono leading-relaxed">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
                {/* fieldset disabled bloquea todos los controles de una vez */}
                <fieldset disabled={isLoading} className="space-y-5">
                    <FormField label="Credencial Operativa (Email)" htmlFor="login-email-input">
                        <Input
                            id="login-email-input"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="admin@tuempresa.com"
                        />
                    </FormField>

                    <FormField
                        label="Código de Seguridad (Password)"
                        htmlFor="login-password-input"
                        aside={
                            <Link href="/forgot-password" className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors">
                                ¿Extravió su acceso?
                            </Link>
                        }
                    >
                        <PasswordInput
                            id="login-password-input"
                            name="password"
                            autoComplete="current-password"
                            required
                            placeholder="••••••••"
                        />
                    </FormField>

                    <button
                        id="login-submit-button"
                        type="submit"
                        className="w-full bg-zinc-100 text-zinc-950 font-bold text-xs uppercase tracking-widest py-4 rounded-lg mt-8 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <span className="w-3 h-3 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                                Autorizando...
                            </>
                        ) : (
                            'Iniciar Secuencia'
                        )}
                    </button>
                </fieldset>
            </form>
        </>
    );
}