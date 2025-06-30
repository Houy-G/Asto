'use client'
import Card from "@/components/Card";
import Link from "next/link";
import {Product} from "@/app/types/productTypes";
import {Suspense, useEffect, useState} from "react";
import api from "@/lib/axios";
import {useRouter, useSearchParams} from "next/navigation";
import Loading from "@/components/Loading";


export default function productPage () {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [product, setProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [filtered, setFiltered] = useState<Product[]>([]);
    useEffect(() => {

        const search = searchParams.get("search")||'';
        setQuery(search);
        api.get("product/")
            .then((res) => {
                const products = res.data;
                console.log(products);
                const result = search != null ? products.filter((product: Product) => (product.tittle.toLowerCase().includes(search.toLowerCase()))) : product;
                console.log("result : " , result );
                setFiltered(result);
            })

            .catch(error => console.error('Error fetching users:', error));
    }, [searchParams]);
    console.table(filtered);
    return (
        <section className={"bg-gradient-to-r from-blue-300 to-gray-400 h-auto flex flex-col items-center py-20"}>
            <div className={"w-auto mx-auto bg-blue-500 p-2"}>

                <input
                    className={"focus:outline-none  "}
                    type='text'
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        router.push(`/product?search=${encodeURIComponent(e.target.value)}`);}}
                    placeholder="Search..."
                />x
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 py-20 '>
                {
                    filtered.map((item) => (
                        <Link href={`/product/${item.uuid}`} key={item.id}>
                        <Card
                            id={item.id}
                            uuid={item.uuid}
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