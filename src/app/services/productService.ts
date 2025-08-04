import { supabase } from "../lib/supabase";
import { IProduct } from "../types";

export const getAllProducts = async (): Promise<IProduct[]> => {
    const { data: products, error } = await supabase.from("products").select('*');

    if (error) {
        console.error("Erro ao buscar produtos: ", error.message);
        throw new Error(`Erro ao buscar produtos: ${error.message}`);
    }

    return products || [];
}