import Link from "next/link"
type PaginationProps = {
    page: number
    totalPages: number
    baseUrl: string
}

export default function Pagination({page, totalPages, baseUrl}: PaginationProps) {
    const pages = Array.from({ length: totalPages },(_,i)=> i+1)

    return (
        <nav className="flex justify-center py-5 gap-1">
            {page>1&&(
                <Link href={`${baseUrl}?page=${page -1}`}
                      className="bg-black/30  text-white ring-yellow-400 px-4 py-2 text-sm  ring-1 ring-inset    focus:z-20 focus:outline-offset-0">
                    &laquo;
                </Link>
            )}

            {pages.map(currentPage =>(
                <Link
                    key={currentPage}
                    href={`${baseUrl}?page=${currentPage}`}
                    className={`${page === currentPage
                        ? "bg-yellow-400 text-black font-black ring-gray-900  ":"bg-black/30 text-white ring-yellow-400 "} px-4 py-2 text-sm  ring-1 ring-inset  focus:z-20 focus:outline-offset-0`}
                >
                    {currentPage}
                </Link>
            ))}

            {page<totalPages&&(
                <Link href={`${baseUrl}?page=${page +1}`}
                      className="bg-black/30  text-white ring-yellow-400 px-4 py-2 text-sm  ring-1 ring-inset    focus:z-20 focus:outline-offset-0">
                    &raquo;
                </Link>
            )}
        </nav>
    )
}