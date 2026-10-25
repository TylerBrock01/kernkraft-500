import type { ComponentProps } from 'react';

const base =
    'w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 ' +
    'focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all ' +
    'placeholder:text-zinc-700 disabled:opacity-50';

export function Input({ className = '', ...props }: ComponentProps<'input'>) {
    return <input className={`${base} ${className}`} {...props} />;
}