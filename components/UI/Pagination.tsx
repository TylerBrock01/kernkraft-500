// components/UI/Pagination.tsx
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
    page: number;
    totalPages: number;
    baseUrl: string;
};

export default function Pagination({ page, totalPages, baseUrl }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const baseStyles = "relative flex items-center justify-center px-5 py-2 font-black italic uppercase tracking-tighter transition-all duration-300 transform -skew-x-12 border";

    return (
        <nav className="flex justify-center items-center py-10 gap-3">
            {/* Botón Anterior */}
            {page > 1 && (
                <Link
                    href={`${baseUrl}?page=${page - 1}`}
                    className={`${baseStyles} bg-zinc-950 border-white/10 text-white hover:border-yellow-400 hover:text-yellow-400 group`}
                >
                    <span className="transform skew-x-12">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </span>
                </Link>
            )}

            {/* Números de Página */}
            <div className="flex gap-2">
                {pages.map((currentPage) => (
                    <Link
                        key={currentPage}
                        href={`${baseUrl}?page=${currentPage}`}
                        className={`${baseStyles} ${
                            page === currentPage
                                ? "bg-yellow-400 border-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                                : "bg-zinc-950 border-white/5 text-zinc-500 hover:border-white/20 hover:text-white"
                        }`}
                    >
                        <span className="transform skew-x-12 text-sm">
                            {currentPage.toString().padStart(2, '0')}
                        </span>
                    </Link>
                ))}
            </div>

            {/* Botón Siguiente */}
            {page < totalPages && (
                <Link
                    href={`${baseUrl}?page=${page + 1}`}
                    className={`${baseStyles} bg-zinc-950 border-white/10 text-white hover:border-yellow-400 hover:text-yellow-400 group`}
                >
                    <span className="transform skew-x-12">
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </Link>
            )}
        </nav>
    );
}