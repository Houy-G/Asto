'use client';
import React from 'react'

import ProductCard from "@/components/ProductCard";
import {useGetProductsQuery} from "@/lib/fetchApi/productApi";
import Loading from "@/components/Loading";
import {ProductType} from "@/app/types/productTypes";


export default function ProductPage() {

    // Using RTK Query to fetch products
    const { data, isLoading, error } = useGetProductsQuery();
    if (isLoading) return <Loading/>;
    if (error) return <p className='text-red-500 text-center'>Failed to load products</p>;
    const products = data?.products as ProductType[];

    return (
        <section className='w-[90%] mx-auto my-10'>
            <h2 className='font-bold text-[24px] text-blue-500 uppercase'>Product Page</h2>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
                {
                    products.map((product: ProductType) => (
                        <ProductCard
                            product={product}
                            key={product.id}
                        />
                    ))
                }
            </div>
        </section>
    )
}
