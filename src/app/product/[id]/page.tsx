import {Metadata} from "next";
import ProductDetail from "@/app/product/[id]/productdetail";
import {Product} from "@/app/types/productTypes";

export async function generateMetadata(
    // ✅ Let Next.js infer the correct type
    props: any
): Promise<Metadata> {
    const { params } = props

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}product/${params.id}`)
        if (!res.ok) {
            return { title: 'User not found' }
        }

        const user:Product = await res.json()
        console.table(user)
        return {
            title: `${user.tittle}`,
            openGraph: {
                title: `${user.tittle}`,
                images: [{url: user.image,width:200,height:200}],
                type:"website",
            },
        }
    } catch {
        return {
            title: 'User not found',
        }
    }
}

export default function page (){
    return (
        <ProductDetail/>
    )
}