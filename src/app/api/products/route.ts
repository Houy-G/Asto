// app/api/products/route.ts
import { NextResponse } from 'next/server';

type Product = {
    id: number;
    name: string;
    price: number;
};

let products: Product[] = [];

export async function POST(req: Request) {
    const body = await req.json();
    const { name, price } = body;

    if (!name || typeof price !== 'number') {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const newProduct: Product = {
        id: Date.now(),
        name,
        price,
    };

    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
}

export async function GET() {
    return NextResponse.json(products);
}
