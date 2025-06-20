import Link from "next/link";
import {navItems} from "@/app/data/rountPage";

export default function NavbarComponent() {
    return (
        <nav className="fixed w-full bg-opacity-30 backdrop-blur-md py-4 z-20">
            <div className={"flex items-center px-4 justify-between w-auto"}>
                <Link href={"/"}>
                <h3 className={"text-2xl"}>Asto Shop</h3>
                </Link>
            <ul className="md:flex items-center space-x-4 h-10 hidden">
                {
                 navItems.map((item,i) => (
                     <li key={item.id}>
                     <Link href={item.path}  className={"text-while hover:text-gray-200"}>{item.name}</Link>
                     </li>
                 ))
                }
            </ul>
            </div>
        </nav>
    );
}