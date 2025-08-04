'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { Session } from "@supabase/supabase-js";

interface AuthContextType {
    session: Session | null;
    signUpNewUser: (email: string, password: string, name: string) => Promise<{ success?: boolean; error?: string; data?: any }>;
    signInUser: (email: string, password: string) => Promise<{ success?: boolean; error?: string; data?: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);

    const signUpNewUser = async (email: string, password: string, name: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name,
                }
            }
        })

        if (error) {
            console.log(error);
            return { error: error.message };
        }

        return { success: true, data: data };
    }

    const signInUser = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) {
                console.log("erro no login", error.message)
            }
            console.log("Logado com sucesso", data)
            return { success: true, data }
        } catch (error) {
            console.error("Unexpected error during sign-in:", error);
            return {
                success: false,
                error: "An unexpected error occurred. Please try again.",
            };
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser }}>
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