"use client";

import { UserAuth } from "@/context/authContext";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const { session } = UserAuth();
        const [isLoading, setIsLoading] = useState(true);
        console.log(session)
        useEffect(() => {
            if (!session) {
                redirect("/login");
            } else {
                setIsLoading(false);
            }
        }, [session]);

        if (isLoading) {
            return <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
            </div>;
        }

        if (!session) {
            return null;
        }

        return <Component {...props} />;
    }
}