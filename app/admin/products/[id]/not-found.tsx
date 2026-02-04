import Heading from "@/components/UI/Heading";
import Link from "next/link";

export default function NotFound() {
    return(
        <div className={"text-center"}>
            <Heading>no salio</Heading>
            <p>
                Tal vez quieras volver a {' '}
                <Link className={"text-green-400"} href={'/admin/products?pages=1'}>
                    Productos
                </Link>
            </p>
        </div>
    )
}