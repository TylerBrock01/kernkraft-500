import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href={'/'} className="grid grid-cols-1 md:flex md:justify-start md:items-end gap-1">
            <Image
                src={"https://raw.githubusercontent.com/TylerBrock01/tienda/refs/heads/main/img/void.jpeg"}
                alt={"vask8"}
                width={150}
                height={150}
                unoptimized={true}
                priority={true}
            />
            <h1 className="text-3xl font-extrabold text-white">CRUX AERO ZENITH AGENCY {' '}
                <span className="text-black underline under text-xl ">VASK8</span>
            </h1>
        </Link>

    )
}