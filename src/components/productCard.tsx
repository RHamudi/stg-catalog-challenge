'use client'
import React, { useState } from 'react';
import { IProduct } from '../types';
import { UserAuth } from '@/context/authContext';
import { useCart } from '@/context/cartContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui';


const ProductCard = ({ product }: { product: IProduct }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageError, setImageError] = useState(false);
    const router = useRouter();
    const { session } = UserAuth();
    const { addToCart } = useCart();

    const handleAddToCart = async (productId: string) => {
        if (!session) {
            alert('Faça login para adicionar produtos ao carrinho!');
            return;
        }

        setIsLoading(true);
        try {
            await addToCart(productId, 1);
            toast.success(`${product.name} adicionado ao carrinho!`);
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
            toast.error('Erro ao adicionar produto ao carrinho. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const handleClick = (id: string) => {
        router.push(`/products/${id}`);
    };

    return (
        <div className="group bg-white rounded-2xl p-6 shadow-lg shadow-green-500/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/20 border border-green-100/50 relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-50/50 to-transparent group-hover:translate-x-full transition-transform duration-700"></div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
                <span className="bg-gradient-to-r from-green-500 to-green-400 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {product.category}
                </span>
            </div>

            {/* Product Image */}
            <div className="relative mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-green-100/50">
                {imageError ? (
                    <div className="w-full h-48 flex items-center justify-center text-6xl text-green-400">
                        🌿
                    </div>
                ) : (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        onError={handleImageError}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                )}

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button onClick={() => handleClick(product.id)} className="bg-white text-green-600 px-4 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Visualizar
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
                <h3 className="text-lg font-semibold text-green-800 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                    {product.name}
                </h3>

                <p className="text-sm text-green-700/70 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-600">
                        {formatPrice(product.price)}
                    </div>

                    {/* Rating Stars (mock) */}
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-sm">★</span>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                    <Button
                        onClick={() => handleAddToCart(product.id)}
                        disabled={isLoading}
                        loading={isLoading}
                        variant='primary'
                        className='w-full'
                    >
                        {isLoading ? (
                            <>
                                Adicionando...
                            </>
                        ) : (
                            <>
                                <ShoppingCart /> Adicionar
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;