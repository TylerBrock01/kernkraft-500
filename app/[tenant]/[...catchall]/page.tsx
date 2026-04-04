import { redirect } from 'next/navigation';

// Como es un Server Component en Next.js 15+, las params son una Promesa y podemos usar 'await' directamente
export default async function TenantBlackHole({ params }: { params: Promise<{ tenant: string }> }) {
    // 1. Desempaquetamos los parámetros
    const resolvedParams = await params;

    // 2. Extraemos el nombre del negocio (ej. "ferreteria-san-juan")
    const tenantSlug = resolvedParams.tenant;

    // 3. Redirección instantánea y forzosa a la raíz del tenant
    redirect(`/${tenantSlug}`);
}