import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('http://138.199.224.156:2007/product?isBestSeller=true');
        if (!response.ok) {
            return NextResponse.json({ error: `API error ${response.status}` }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data); // віддаємо клієнту
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}