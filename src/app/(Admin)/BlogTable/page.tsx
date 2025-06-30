import React from 'react'
import {BlogType, columns} from './columns'
import BlogTable from "@/app/(Admin)/BlogTable/BlogTable";

async function getData():Promise<BlogType[]> {
    const res = await fetch(`https://dummyjson.com/posts`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data.posts as BlogType[]
}

export default async function page() {
    const data  = await getData()
    return (
        <section className='w-[95%] mx-auto mt-5'>
            <h1 className='text-2xl font-bold mb-5'>Blog Dashboard</h1>
            <BlogTable
                columns={columns} data={data}
            />
        </section>
    )
}
