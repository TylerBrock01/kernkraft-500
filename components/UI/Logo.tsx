import Link from "next/link";

export default function Logo() {
    return (
        <Link href={'/'} className="grid grid-cols-1 md:flex md:justify-start md:items-end gap-1">
            <h1 className="text-3xl font-extrabold italic tracking-tighter text-white">Skate Shop {' '}
                <span className="text-yellow-400 underline under text-xl ">VASK8</span>
            </h1>
        </Link>

    )
}