interface HeadingProps {
    children: React.ReactNode; // Para el texto normal
    highlight?: string;       // Para el texto en amarillo
}

export default function HeadingHighlight({ children, highlight }: HeadingProps) {
    return (
        <h2 className="italic text-4xl font-bold text-center text-white bg-black/50 py-2 uppercase tracking-tighter gap-1">
            {children}
            {highlight && (
                <span className="text-yellow-400"> {highlight}</span>
            )}
        </h2>
    );
}