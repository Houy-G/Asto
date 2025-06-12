'use client'
import {Button as button} from "@/module/Button.module";
import {useState} from "react";

export function Button ({name}: {name: string}) {
    let [count, setCount] = useState(0);
    return  (
        <button className={button} onClick={()=>setCount(count + 1)}>
        {name}
         </button>);
}