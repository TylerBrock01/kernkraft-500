import {formatCurrency} from "@/src/utils";

type AmountProps = {
    label: string
    amount: number
    discount?: boolean
}

export default function Amount({label, amount, discount} :AmountProps) {
    return(
        <div className={`${discount && ' bg-green-500 text-black font-bold rounded-full'} flex justify-between p-1`}>
            <dt>
                {label}
            </dt>
            <dd className={`${discount && ''} text-gray-900`}>
                { discount && '-'}
                {formatCurrency(amount)}
            </dd>
        </div>
    )
}