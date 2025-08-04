import { getAuthErrorMessage, getSignUpErrorMessage } from "../lib/authErrors";
import { supabase } from "../lib/supabase";

export const signUpNewUser = async (email: string, password: string, name: string) => {
    try {
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
            console.error("Erro no cadastro:", error.message);

            const errorMessage = getSignUpErrorMessage(error.message);
            return {
                success: false,
                error: errorMessage
            };
        }

        return {
            success: true,
            data
        };

    } catch (error) {
        console.error("Erro inesperado durante cadastro:", error);
        return {
            success: false,
            error: "Erro interno. Tente novamente em alguns minutos."
        };
    }
}

export const signInUser = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            // Tratamento específico por tipo de erro
            const errorMessage = getAuthErrorMessage(error.message);
            return {
                success: false,
                error: errorMessage
            };
        }

        return {
            success: true,
            data
        };

    } catch (error) {
        console.error("Erro inesperado durante login:", error);
        return {
            success: false,
            error: "Erro interno. Tente novamente em alguns minutos."
        };
    }
}