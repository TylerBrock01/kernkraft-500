import type { ReactNode } from 'react';

interface Props {
    label: string;
    htmlFor: string;
    aside?: ReactNode;
    children: ReactNode;
}

export function FormField({ label, htmlFor, aside, children }: Props) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
                <label htmlFor={htmlFor} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    {label}
                </label>
                {aside}
            </div>
            {children}
        </div>
    );
}