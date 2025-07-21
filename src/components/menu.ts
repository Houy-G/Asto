import {NavbarType} from "@/app/types/productTypes";


export const navLink: NavbarType[] = [
    {
        path: '/',
        name: 'Home',
        active: true,
    },
    {
        path: '/product',
        name: 'Product',
        active: false,
    },
    {
        path: '/user',
        name: 'User',
        active: false,
    },
    {
        path: '/blog',
        name: 'Blog',
        active: false,
    },
    {
        path: '/about',
        name: 'About',
        active: false,
    },
]