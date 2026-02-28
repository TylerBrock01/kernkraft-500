import { formatCurrency } from "@/src/utils";

type AmountProps = {
    label: string
    amount: number
    discount?: boolean
}

export default function Amount({ label, amount, discount }: AmountProps) {
    return (
        <div className={`flex justify-between items-end py-1 ${discount ? 'text-red-500' : 'text-zinc-400'}`}>
            <dt className="text-[10px] font-black uppercase tracking-[0.2em]">
                {label}
            </dt>
            <dd className={`font-black italic tracking-tighter ${discount ? 'text-lg' : 'text-2xl text-white'}`}>
                {discount && '- '}
                {formatCurrency(amount)}
            </dd>
        </div>
    )
}