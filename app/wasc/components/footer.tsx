import Link from "next/link";
import {logoWasc0} from "@/app/wasc/data/properties";
import {emailWasc, facebookWasc, instagramWasc, whatssapWasc} from "@/app/wasc/data/url";

export default function WascFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* Columna 1: Branding y Propósito (Ocupa 2 columnas en desktop) */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/wasc/properties" className="inline-block">
                            <img
                                src={logoWasc0}
                                alt="WASC Inmobiliaria Logo"
                                className="h-10 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Desarrollo e infraestructura digital para bienes raíces. Conectamos propiedades exclusivas con compradores e inversionistas de alto valor.
                        </p>
                        <div className="pt-2 flex space-x-4 text-gray-400">
                            <a href={`${facebookWasc}`} className="hover:text-blue-400 transition-colors text-red-600" aria-label="Facebook">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                            </a>
                            <a href={`${instagramWasc}`} className="hover:text-fuchsia-600 transition-colors text-red-600" aria-label="Instagram">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Columna 2: Navegación Rápida */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navegación</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/wasc/properties" className="hover:text-blue-400 transition-colors">
                                    Catálogo de Inmuebles
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-blue-400 transition-colors">
                                    Desarrollos Preventa
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-blue-400 transition-colors">
                                    Vender mi Propiedad
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-blue-400 transition-colors">
                                    Nosotros
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Tipos de Propiedad */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Propiedades</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/wasc/properties" className="hover:text-blue-400 transition-colors">
                                    Casas Residenciales
                                </Link>
                            </li>
                            <li>
                                <Link href="/wasc/properties" className="hover:text-blue-400 transition-colors">
                                    Departamentos
                                </Link>
                            </li>
                            <li>
                                <Link href="/wasc/properties" className="hover:text-blue-400 transition-colors">
                                    Terrenos y Lotes
                                </Link>
                            </li>
                            <li>
                                <Link href="/wasc/properties" className="hover:text-blue-400 transition-colors">
                                    Oficinas Comerciales
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 4: Contacto Operativo */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Atención a Clientes</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400 font-bold">📍</span>
                                <span>Oficinas Centrales, Zona Metropolitana</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-emerald-400 font-bold">💬</span>
                                <a href={`https://wa.me/${whatssapWasc}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    +52 (123) 456-7890
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-blue-400 font-bold">✉️</span>
                                <a href={`mailto:${emailWasc}`} className="hover:text-white transition-colors">
                                    contacto@wascinmobiliaria.com
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Sub-footer con Copyright y Avisos Legales */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
                    <p>© {currentYear} WASC Inmobiliaria. Todos los derechos reservados.</p>
                    <div className="flex space-x-6">
                        <Link href="#" className="hover:text-gray-400 transition-colors">
                            Aviso de Privacidad
                        </Link>
                        <Link href="#" className="hover:text-gray-400 transition-colors">
                            Términos y Condiciones
                        </Link>
                        <Link href="#" className="hover:text-gray-400 transition-colors">
                            Mapa del Sitio
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}