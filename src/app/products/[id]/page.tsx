'use client'
import { UserAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import { AddProductCart, GetProductById } from "@/services/productService";
import { ICart, IProduct } from "@/types";
import { useEffect, useState } from "react";


export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [product, setProduct] = useState<IProduct>({
        name: "",
        category: "",
        description: "",
        id: "",
        image_url: "",
        price: 0
    });
    const { addToCart } = useCart();

    useEffect(() => {
        GetProductById(params.id).then((data) => setProduct(data))
    })

    const formatPrice = (price: number) => {
        return `R$ ${price.toFixed(2).replace('.', ',')}`;
    };

    const handleAddToCart = async () => {
        setIsLoading(true);
        // Simular chamada de API
        addToCart(product.id, quantity)
        setIsLoading(false);
        alert('Produto adicionado ao carrinho!');

    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-100">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <button className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors">
                        <span className="font-medium">Voltar aos produtos</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                            <div className="absolute top-6 left-6 z-10">
                                <span className="bg-gradient-to-r from-green-500 to-green-400 text-white text-sm font-medium px-4 py-2 rounded-full">
                                    {product?.category}
                                </span>
                            </div>

                            <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50">
                                {imageError ? (
                                    <div className="w-full h-full flex items-center justify-center text-8xl text-green-400">
                                        🌿
                                    </div>
                                ) : (
                                    <img
                                        src={product?.image_url}
                                        alt={product?.name}
                                        onError={handleImageError}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Thumbnail Images */}

                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-green-800 mb-2">
                                {product?.name}
                            </h1>

                            {/* Rating */}
                            {/* <div className="flex items-center gap-2 mb-4">
                                <div className="flex">

                                </div>
                                <span className="text-green-700 font-medium">{product}</span>
                                <span className="text-green-600">({product.reviewCount} avaliações)</span>
                            </div> */}
                        </div>

                        {/* Price */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                            <div className="flex items-center gap-4">
                                <div className="text-3xl font-bold text-green-600">
                                    {formatPrice(product?.price || 0)}
                                </div>
                                {/* <div className="text-lg text-gray-500 line-through">
                                    {formatPrice(product.originalPrice)}
                                </div>
                                <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                                    -25%
                                </div> */}
                            </div>

                            {/* <div className="mt-2 text-green-700 font-medium">
                                {product.inStock ? '✅ Em estoque' : '❌ Indisponível'}
                            </div> */}
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                            <h3 className="text-lg font-semibold text-green-800 mb-3">Descrição</h3>
                            <p className="text-green-700 leading-relaxed">
                                {product?.description}
                            </p>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 sticky top-4">
                            <div className="flex items-center gap-4 mb-4">
                                <label className="text-green-800 font-medium">Quantidade:</label>
                                <div className="flex items-center border border-green-200 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 text-green-600 hover:bg-green-50 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 text-green-800 font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-2 text-green-600 hover:bg-green-50 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isLoading}
                                    className={`flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 ${isLoading
                                        ? 'opacity-70 cursor-not-allowed'
                                        : 'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/30'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Adicionando...
                                        </>
                                    ) : (
                                        <>
                                            Adicionar ao Carrinho
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${isFavorite
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                                        }`}
                                >
                                </button>
                            </div>

                            {/* Garantees */}
                            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-xs text-green-700">Frete Grátis</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-xs text-green-700">Compra Segura</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-xs text-green-700">7 Dias Troca</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}