'use client'
import Link from "next/link";

export function Button ({name,link,button}: {name: string, link: string, button:string}) {
    return  (
        <button className={button}>
            <Link href={link}>{name}</Link>
         </button>);
}