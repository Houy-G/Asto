import axios from 'axios';
import {product} from "@/app/types/productTypes";

async function getProduct(id:number){
    const res = await axios.get(`http://localhost:1234/api/v2/product/${id}`);
    const product:product = res.data;
    return product;
}

export default async function page({ params }: { params: { id: string } }) {
    const id: number = Number(params.id);

    const product: product = await getProduct(id);
    console.table(product);
    return (
        <div className={"py-40"}>
            <h1>Product Details</h1>
            <p>{product.id}</p>
        </div>
    );
}
