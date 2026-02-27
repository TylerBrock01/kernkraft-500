import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const transactionDate = searchParams.get('transactionDate');

    // 1. CAPTURAMOS el token que viene del frontend
    const authHeader = request.headers.get('authorization');

    const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions?transactionDate=${transactionDate}`;

    // 2. Se lo REENVIAMOS a NestJS
    const req = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': authHeader || '', // Si no hay token, mandamos vacío
            'Content-Type': 'application/json'
        }
    });

    // 3. Manejo de errores básico
    if (!req.ok) {
        const errorStatus = req.status;
        return Response.json({ message: 'Error desde el Backend' }, { status: errorStatus });
    }

    const response = await req.json();
    return Response.json(response);
}