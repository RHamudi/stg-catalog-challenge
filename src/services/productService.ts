'use client';

import { supabase } from "../lib/supabase";
import { ICart, IProduct } from "../types";

export const getAllProducts = async (): Promise<IProduct[]> => {
    const { data: products, error } = await supabase.from("products").select('*');

    if (error) {
        console.error("Erro ao buscar produtos: ", error.message);
        throw new Error(`Erro ao buscar produtos: ${error.message}`);
    }

    return products || [];
}

export const AddProductCart  = async (cartModal: ICart): Promise<unknown> => {
    const {data: cart, error} = await supabase.from('cart_items')
    .insert([
        cartModal
    ]);

    if(error) {
        console.log("erro ao adicionar ao carrinho", error.message)
    } else {
        console.log("Item adicionado", cart)
    }

    return cart;
}

export const GetUserCart = async (userId: string): Promise<unknown> => {
    const { data, error } = await supabase.from('cart_items')
    .select(`id,
            quantity,
            product_id,
            products (
                id,
                name,
                price,
                description,
                image_url,
                category)`).eq('user_id', userId);

    return data;
}

export const RemoveFromCart = async (itemId: string): Promise<unknown> => {
    const { data, error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

    if (error) {
        console.error("Erro ao remover item do carrinho: ", error.message);
        throw new Error(`Erro ao remover item do carrinho: ${error.message}`);
    }

    return data;
}

export const UpdateCartItemQuantity = async (itemId: string, newQuantity: number): Promise<unknown> => {
    const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

    if (error) {
        console.error("Erro ao atualizar quantidade: ", error.message);
        throw new Error(`Erro ao atualizar quantidade: ${error.message}`);
    }

    return data;
}

export const GetProductById = async (productId: string): Promise<unknown> => {
    const { data, error } = await supabase.from('products')
    .select('*').eq('id', productId)
    .single();

    if (error){
        console.error("erro ao buscar produto")
        throw new Error("erro ao buscar produto")
    }

    return data;
}