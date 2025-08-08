"use client"
import { useCart } from '@/context/cartContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { finalizarCompra } from '@/services/whatsService';

interface Coupon {
    code: string;
    discount: number;
    type: 'percentage' | 'shipping';
}

export default function ShoppingCart() {
    const [couponCode, setCouponCode] = useState<string>('');
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
    const [isLoadingCoupon, setIsLoadingCoupon] = useState<boolean>(false);

    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartCount,
        isLoading: cartLoading
    } = useCart();

    const applyCoupon = (): void => {
        setIsLoadingCoupon(true);
        setTimeout(() => {
            if (couponCode.toLowerCase() === 'desconto10') {
                setAppliedCoupon({ code: couponCode, discount: 0.1, type: 'percentage' });
                setCouponCode('');
            } else if (couponCode.toLowerCase() === 'frete20') {
                setAppliedCoupon({ code: couponCode, discount: 20, type: 'shipping' });
                setCouponCode('');
            }
            setIsLoadingCoupon(false);
        }, 1000);
    };

    const removeCoupon = (): void => {
        setAppliedCoupon(null);
    };

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 29.99;
    const couponDiscount = appliedCoupon ?
        (appliedCoupon.type === 'percentage' ? subtotal * appliedCoupon.discount : 0) : 0;
    const shippingDiscount = appliedCoupon?.type === 'shipping' ? Math.min(shipping, appliedCoupon.discount) : 0;
    const total = subtotal + shipping - couponDiscount - shippingDiscount;



    const handleRemoveItem = async (itemId: string) => {
        await removeFromCart(itemId);
    };

    const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        await updateQuantity(itemId, newQuantity);
    };

    const handleFinalizarCompra = () => {
        finalizarCompra(cartItems, appliedCoupon, subtotal);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href={'/products'}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Voltar"
                            >
                                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link >
                            <h1 className="text-2xl font-bold text-gray-900">Meu Carrinho</h1>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                            </svg>
                            <span>Compra 100% segura</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Lista de Produtos */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Produtos ({cartItems.length})
                                </h2>
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    Continuar comprando
                                </button>
                            </div>

                            {cartLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="ml-3 text-gray-600">Carregando carrinho...</span>
                                </div>
                            ) : cartItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Seu carrinho está vazio</h3>
                                    <p className="text-gray-500 mb-4">Adicione alguns produtos para começar suas compras!</p>
                                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                        Ver Produtos
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.products.image_url}
                                                    alt={item.products.name}
                                                    className="w-24 h-24 object-cover rounded-lg"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-1">{item.products.name}</h3>
                                                        <div className="flex gap-4 text-sm text-gray-600">
                                                            {/* Propriedades opcionais do produto podem ser adicionadas aqui */}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id!)}
                                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                        aria-label={`Remover ${item.products.name} do carrinho`}
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.id!, item.quantity - 1)}
                                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                            aria-label="Diminuir quantidade"
                                                        >
                                                            <svg className="w-4 h-4 text-black border-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                            </svg>
                                                        </button>
                                                        <span className="w-8 text-center font-medium text-black" aria-label={`Quantidade: ${item.quantity}`}>{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.id!, item.quantity + 1)}
                                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                            aria-label="Aumentar quantidade"
                                                        >
                                                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-gray-900">
                                                            R$ {(item.products.price * item.quantity).toFixed(2).replace('.', ',')}
                                                        </p>
                                                        {item.quantity > 1 && (
                                                            <p className="text-sm text-gray-500">
                                                                R$ {item.products.price.toFixed(2).replace('.', ',')} cada
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Cupom de Desconto */}
                            {cartItems.length > 0 && (
                                <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                                    <h3 className="font-semibold text-gray-900 mb-3">Cupom de Desconto</h3>
                                    {appliedCoupon ? (
                                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="font-medium text-green-800">
                                                    Cupom "{appliedCoupon.code}" aplicado!
                                                </span>
                                            </div>
                                            <button
                                                onClick={removeCoupon}
                                                className="text-green-600 hover:text-green-700 text-sm"
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Digite seu cupom"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                aria-label="Código do cupom"
                                            />
                                            <button
                                                onClick={applyCoupon}
                                                disabled={!couponCode || isLoadingCoupon}
                                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                {isLoadingCoupon ? 'Aplicando...' : 'Aplicar'}
                                            </button>
                                        </div>
                                    )}
                                    <p className="text-xs text-gray-500 mt-2">
                                        Cupons válidos: DESCONTO10, FRETE20
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Resumo do Pedido */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumo do Pedido</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Frete</span>
                                    <div className="text-right">
                                        {shipping === 0 ? (
                                            <span className="font-medium text-green-600">Grátis</span>
                                        ) : (
                                            <span className="font-medium">R$ {shipping.toFixed(2).replace('.', ',')}</span>
                                        )}
                                        {shippingDiscount > 0 && (
                                            <div className="text-sm text-green-600">
                                                -R$ {shippingDiscount.toFixed(2).replace('.', ',')}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {couponDiscount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Desconto do cupom</span>
                                        <span>-R$ {couponDiscount.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                )}

                                {subtotal <= 500 && subtotal > 0 && (
                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-sm text-blue-800">
                                            <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Faltam R$ {(500 - subtotal).toFixed(2).replace('.', ',')} para frete grátis!
                                        </p>
                                    </div>
                                )}

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleFinalizarCompra}
                                disabled={cartItems.length === 0}
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                aria-label="Finalizar compra via WhatsApp"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                    </svg>
                                    <span>Finalizar via WhatsApp</span>
                                </div>
                            </button>

                            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                                </svg>
                                <span>Pagamento 100% seguro</span>
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                                <h3 className="font-medium text-gray-900 mb-2">Formas de Pagamento</h3>
                                <div className="flex gap-2">
                                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                                    <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                                    <div className="w-8 h-5 bg-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">ELO</div>
                                    <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">PIX</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}