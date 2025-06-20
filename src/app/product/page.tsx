'use client'
import Card from "@/components/Card";
import Link from "next/link";
import {product} from "@/app/types/productTypes";
import {useEffect, useState} from "react";
import api from "@/lib/axios";

export default function productPage () {
    const [product, setProducts] = useState<product[]>([]);
    const [error, setError] = useState("");
    useEffect(() => {
        api.get("product/")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.response?.data?.message || err.message);
            });
    }, []);

    console.table(product);

    return (
        <section className={"bg-gradient-to-r from-blue-300 to-gray-400 h-auto flex flex-col items-center"}>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 py-40 '>
                {
                    Array.isArray(product) &&product.map((item) => (
                        <Link href={`/product/${item.id}`} key={item.id}>
                        <Card
                            id={item.id}
                            tittle={item.tittle}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                            rating={item.rating}
                        />
                        </Link>
                    ))
                }
            </div>

        </section>
    )
}