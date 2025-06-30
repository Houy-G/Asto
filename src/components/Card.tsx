import {Product} from "@/app/types/productTypes";
import Image from "next/image";

export default function card ({id,tittle,price,description,image,rating}:Product){
    return (<div key={id}>
        <section className={`h-80 w-60 bg-contain bg-no-repeat rounded-lg hover:-translate-y-1 hover:scale-110 transition delay-150 duration-300 ease-in-out`}>
            <div className={"bg-gray-700 opacity-90 rounded-lg w-full h-full flex flex-col justify-between p-3"}>
                <Image width={300} height={200} unoptimized src={image} alt={tittle} className={""}/>
                <div>
                    <h5 className={"text-start"}>{tittle}</h5>
                    <div className={"flex space-x-2 w-full"}>
                        <p>{price}</p>
                        <p>{rating}</p>
                    </div>

                </div>
            </div>
        </section>
        </div>
    )
}