'use client'
import {Button as button} from "@/module/Button.module";
import {useState} from "react";
import Link from "next/link";

export function Button ({name,link}: {name: string, link: string}) {
    return  (
        <button className={button}>
            <Link href={link}>{name}</Link>
         </button>);
}