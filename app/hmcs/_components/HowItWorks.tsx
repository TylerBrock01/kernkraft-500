// /app/hmcs/_components/HowItWorks.tsx
import { MousePointerClick, ShoppingBag, Store } from "lucide-react";

const STEPS = [
    {
        icon: MousePointerClick,
        title: "Elige",
        text: "Explora el menú y agrega lo que se te antoje.",
    },
    {
        icon: ShoppingBag,
        title: "Pide",
        text: "Envía tu pedido por WhatsApp en un par de toques.",
    },
    {
        icon: Store,
        title: "Recoge",
        text: "Pasa por tu orden sin hacer fila.",
    },
] as const;

export default function HowHmcsItWorks() {
    return (
        <section
            aria-labelledby="how-title"
            className="mx-auto max-w-5xl px-4 py-16 sm:px-6"
        >
            <h2
                id="how-title"
                className="mb-10 text-center text-3xl font-extrabold tracking-tight text-[#1E1E1E]"
            >
                Así de fácil
            </h2>

            <ol className="grid gap-6 sm:grid-cols-3">
                {STEPS.map(({ icon: Icon, title, text }, index) => (
                    <li
                        key={title}
                        className="rounded-2xl border border-gray-100 bg-[#F8F9FA] p-6 text-center"
                    >
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2C4A3E] text-white">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
                        <h3 className="mb-1 text-lg font-bold text-[#1E1E1E]">
                            {index + 1}. {title}
                        </h3>
                        <p className="text-sm text-[#1E1E1E]/70">{text}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}