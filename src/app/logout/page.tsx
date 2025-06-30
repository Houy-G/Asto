'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Loading from "@/components/Loading";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        Cookies.remove('token');

        router.push('/');
    }, [router]);

    return <>
        <Loading/>
    </>;
}
