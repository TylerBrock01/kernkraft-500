import Link from "next/link";

const logoWasc = 'https://res.cloudinary.com/tyler-brock/image/upload/v1792034299/logo_wasc_3x_lx5snu.png'

export default function WascNavbar() {
    return(
        <div>
            <p>WascNavBar</p>
            <Link className={'bg-white'} href={'wasc/propierties'}>
                WascNavBarLink
            </Link>
        </div>

    )
}