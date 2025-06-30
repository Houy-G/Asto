'use client';
import Link from "next/link";
import Image from "next/image";
import {navItems} from "@/app/data/rountPage";
import {Button} from "@/components/Button";
import {defaults} from "@/module/Button.module";
import {ModeToggle} from "@/components/modeToggle";
import {usePathname} from "next/navigation";

export default function NavbarComponent() {
    const pathname = usePathname();
    if (pathname === '/dashboard' || pathname === '/BlogTable') {
        return null;
    }
    return (
            <nav className="fixed w-full bg-opacity-30 backdrop-blur-md py-4 z-20 text-white">
                <div className={"flex items-center px-4 justify-between w-auto align-middle"}>
                    <Link href={"/"} className={"flex items-center px-4 space-x-4"}>
                        <Image src={"/img.png"} alt={"logo"} width={30} height={30}/>
                    <h3 className={"text-2xl "}>Astro Shop</h3>
                    </Link>
                <ul className="md:flex items-center space-x-4 h-10 hidden">
                    {
                     navItems.map((item,i) => (
                         <li key={item.id}>
                         <Link href={item.path}  className={"text-white hover:text-gray-200"}>{item.name}</Link>
                         </li>
                     ))
                    }
                </ul>
                    <div className={"md:flex items-center space-x-4 h-10 hidden"}>
                    <ModeToggle/>
                    <div className={"space-x-2 items-center "}>
                        <Button name={"login"} link={"/login"} button={defaults}/>
                        <Button name={"log out"} link={"/logout"} button={defaults}/>
                    </div>
                    </div>
                </div>
            </nav>
    );
}