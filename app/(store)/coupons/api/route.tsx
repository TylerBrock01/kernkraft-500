// app/(store)/coupons/api/route.ts
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const couponData = await request.json();

    // 1. Extraemos el token de las cookies (Ajusta el nombre 'jwt' al que uses)
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt_token')?.value;

    const url = `${process.env.API_URL}/coupons/apply-coupon`;

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 2. INYECTAMOS EL TOKEN EN EL HANDSHAKE
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(couponData)
    });

    const response = await req.json();
    return Response.json(response, { status: req.status });
}