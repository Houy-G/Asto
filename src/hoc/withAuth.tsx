'use client';

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type WithAuthProps = {
   id: string;
};

export function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    const AuthenticatedComponent: React.FC<P & WithAuthProps> = (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.replace("/login");
            } else {
                setLoading(false);
            }
        }, [router]);

        if (loading) return <div>Loading...</div>;

        return <WrappedComponent {...props} />;
    };

    // Optional: Set display name for easier debugging
    const wrappedName =
        WrappedComponent.displayName || WrappedComponent.name || "Component";
    AuthenticatedComponent.displayName = `withAuth(${wrappedName})`;

    return AuthenticatedComponent;
}
