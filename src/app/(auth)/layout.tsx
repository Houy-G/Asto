import type React from "react"
export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">{children}</div>
        </div>
    )
}
