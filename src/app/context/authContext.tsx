'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { getAuthErrorMessage, getSignUpErrorMessage } from "@/app/lib/authErrors";
import { signInUser, signUpNewUser } from "../services/authService";
import { IProduct } from "../types";
import { getAllProducts } from "../services/productService";

interface AuthContextType {
    session: Session | null;
    signUpNewUser: (email: string, password: string, name: string) => Promise<{ success?: boolean; error?: string; data?: any }>;
    signInUser: (email: string, password: string) => Promise<{ success?: boolean; error?: string; data?: any }>;
    products: IProduct[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        getAllProducts().then((data) => setProducts(data))
    }, []);

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, products }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('UserAuth deve ser usado dentro de um AuthContextProvider');
    }
    return context;
}
