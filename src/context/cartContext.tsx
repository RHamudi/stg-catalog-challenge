'use client';
import { ICart, ICartReturn } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { UserAuth } from "./authContext";
import { GetUserCart, AddProductCart, RemoveFromCart, UpdateCartItemQuantity } from "@/services/productService";

interface CartContextType {
    cartItems: ICartReturn[];
    addToCart: (productId: string, quantity?: number) => Promise<void>;
    removeFromCart: (itemId: string) => Promise<void>;
    updateQuantity: (itemId: string, newQuantity: number) => Promise<void>;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
    isLoading: boolean;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<ICartReturn[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { session } = UserAuth();

    // Buscar itens do carrinho quando o usuário estiver logado
    const fetchCartItems = async () => {
        if (!session?.user?.id) return;

        setIsLoading(true);
        try {
            const data = await GetUserCart(session.user.id);
            setCartItems(data || []);
        } catch (error) {
            console.error('Erro ao buscar itens do carrinho:', error);
            setCartItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Adicionar produto ao carrinho
    const addToCart = async (productId: string, quantity: number = 1) => {
        if (!session?.user?.id) {
            console.error('Usuário não está logado');
            return;
        }

        setIsLoading(true);
        try {
            const cartItem: ICart = {
                user_id: session.user.id,
                product_id: productId,
                quantity: quantity
            };

            await AddProductCart(cartItem);

            // Recarregar o carrinho após adicionar
            await fetchCartItems();
        } catch (error) {
            console.error('Erro ao adicionar produto ao carrinho:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Remover item do carrinho
    const removeFromCart = async (itemId: string) => {
        if (!session?.user?.id) return;

        setIsLoading(true);
        try {
            await RemoveFromCart(itemId);
            // Recarregar o carrinho após remover
            await fetchCartItems();
        } catch (error) {
            console.error('Erro ao remover item do carrinho:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Atualizar quantidade de um item
    const updateQuantity = async (itemId: string, newQuantity: number) => {
        if (!session?.user?.id || newQuantity < 1) return;

        setIsLoading(true);
        try {
            await UpdateCartItemQuantity(itemId, newQuantity);
            // Recarregar o carrinho após atualizar
            await fetchCartItems();
        } catch (error) {
            console.error('Erro ao atualizar quantidade:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Limpar carrinho
    const clearCart = () => {
        setCartItems([]);
    };

    // Calcular total do carrinho
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.products.price * item.quantity);
        }, 0);
    };

    // Obter quantidade total de itens no carrinho
    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    // Recarregar carrinho
    const refreshCart = async () => {
        await fetchCartItems();
    };

    // Buscar itens do carrinho quando o usuário mudar
    useEffect(() => {
        fetchCartItems();
    }, [session?.user?.id]);

    const value: CartContextType = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isLoading,
        refreshCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para usar o contexto do carrinho
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart deve ser usado dentro de um CartContextProvider');
    }
    return context;
};