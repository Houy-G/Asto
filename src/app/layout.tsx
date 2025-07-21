import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import Error from "./error";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Providers } from "@/lib/Providers";
import Loading from "@/components/Loading";
import {NavbarComponent} from "@/components/NavbarComponent";

const ubuntu = Ubuntu({
    variable: "--font-ubuntu",
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
    title: "Home | FullStack Morning",
    description: "A simple Next.js app with TypeScript, Tailwind CSS, and Geist UI",
    keywords: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Geist UI",
        "FullStack Morning",
        "Web Development",
        "React",
        "Frontend Development",
    ],
    openGraph: {
        title: "Home | FullStack Morning",
        description: "A simple Next.js app with TypeScript, Tailwind CSS, and Geist UI",
        url: "https://fullstack-nextjs-morning.vercel.app/",
        siteName: "FullStack Morning",
        images: "https://media.licdn.com/dms/image/v2/C5612AQFxx3XzXO9Vew/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1583841493429?e=2147483647&v=beta&t=nOghzOBbkw7pVweJUyiUzSYZtqz8l5EPsdHcnWvy-DU",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Home | FullStack Morning",
        description: "A simple Next.js app with TypeScript, Tailwind CSS, and Geist UI",
        images: "",
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${ubuntu.variable} antialiased`}
        >
        <Providers>
            <ErrorBoundary errorComponent={Error}>
                <NavbarComponent/>
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </ErrorBoundary>
        </Providers>
        </body>
        </html>
    );
}