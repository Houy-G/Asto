import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import Error from "@/app/error";
import {Suspense} from "react";
import Loading from "@/components/Loading";
import {AppSidebar} from "@/components/sidebar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
        <ErrorBoundary errorComponent={Error}>
            <AppSidebar/>
                <Suspense fallback={Loading()}>
                    <SidebarTrigger />
                    {children}
                </Suspense>
        </ErrorBoundary>
        </SidebarProvider>
    );
}