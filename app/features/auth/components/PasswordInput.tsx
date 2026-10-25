'use client';

import { useState, type ComponentProps } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import {Input} from "@/app/features/auth/components/ui/Input"; // npm i lucide-react

export function PasswordInput(props: Omit<ComponentProps<'input'>, 'type'>) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <Input {...props} type={visible ? 'text' : 'password'} className="pl-4 pr-12 font-mono" />
            <button
                type="button"
                disabled={props.disabled}
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                aria-pressed={visible}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-50"
            >
                {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
        </div>
    );
}