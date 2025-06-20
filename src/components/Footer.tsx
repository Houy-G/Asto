import Link from "next/link";

export default function Footer (){
    return (
        <footer className="text-sm text-gray-600 z-0">
            <div>
                <ul className={"flex items-center space-x-4 justify-center py-20"}>
                    <li>
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link href={"/product"}>Product</Link>
                    </li>
                    <li>
                        <Link href={"/aboutUs"}>About Us</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}