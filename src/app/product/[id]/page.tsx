'use client';

import React, { useEffect, useState } from "react";
import {Product} from "@/app/types/productTypes";
import api from "@/lib/axios";
import {useParams} from "next/navigation";

type Props = {
    params: Promise<{ id: string }>;
};

export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get(`product/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.response?.data?.message || err.message);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="py-40">
            <h1 className="text-2xl font-bold mb-4">Product Details</h1>
            {product ? (
                <div>
                    <p><strong>Name:</strong> {product.tittle}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                </div>
            ) : (
                <p>No product found.</p>
            )}
        </div>
    );
}

