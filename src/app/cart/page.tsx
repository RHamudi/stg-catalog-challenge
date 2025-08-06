"use client"
import { useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color?: string;
    storage?: string;
    material?: string;
    wireless?: boolean;
}

interface Coupon {
    code: string;
    discount: number;
    type: 'percentage' | 'shipping';
}

export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "Smartphone Galaxy A54",
            price: 1299.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
            color: "Preto",
            storage: "128GB"
        },
        {
            id: 2,
            name: "Fone de Ouvido Bluetooth",
            price: 299.99,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
            color: "Branco",
            wireless: true
        },
        {
            id: 3,
            name: "Capa Protetora Premium",
            price: 59.99,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
            color: "Transparente",
            material: "Silicone"
        }
    ]);

    const [couponCode, setCouponCode] = useState<string>('');
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateQuantity = (id: number, newQuantity: number): void => {
        if (newQuantity < 1) return;
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id: number): void => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const applyCoupon = (): void => {
        setIsLoading(true);
        setTimeout(() => {
            if (couponCode.toLowerCase() === 'desconto10') {
                setAppliedCoupon({ code: couponCode, discount: 0.1, type: 'percentage' });
                setCouponCode('');
            } else if (couponCode.toLowerCase() === 'frete20') {
                setAppliedCoupon({ code: couponCode, discount: 20, type: 'shipping' });
                setCouponCode('');
            }
            setIsLoading(false);
        }, 1000);
    };

    const removeCoupon = (): void => {
        setAppliedCoupon(null);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 29.99;
    const couponDiscount = appliedCoupon ?
        (appliedCoupon.type === 'percentage' ? subtotal * appliedCoupon.discount : 0) : 0;
    const shippingDiscount = appliedCoupon?.type === 'shipping' ? Math.min(shipping, appliedCoupon.discount) : 0;
    const total = subtotal + shipping - couponDiscount - shippingDiscount;

    const handleCheckout = (): void => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert('Redirecionando para o pagamento...');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Voltar"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
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

                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                                                    <div className="flex gap-4 text-sm text-gray-600">
                                                        {item.color && <span>Cor: {item.color}</span>}
                                                        {item.storage && <span>Armazenamento: {item.storage}</span>}
                                                        {item.material && <span>Material: {item.material}</span>}
                                                        {item.wireless && <span>Sem fio: Sim</span>}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                    aria-label={`Remover ${item.name} do carrinho`}
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                        aria-label="Diminuir quantidade"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                        </svg>
                                                    </button>
                                                    <span className="w-8 text-center font-medium" aria-label={`Quantidade: ${item.quantity}`}>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                        aria-label="Aumentar quantidade"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-gray-900">
                                                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                                                    </p>
                                                    {item.quantity > 1 && (
                                                        <p className="text-sm text-gray-500">
                                                            R$ {item.price.toFixed(2).replace('.', ',')} cada
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cupom de Desconto */}
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
                                            disabled={!couponCode || isLoading}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isLoading ? 'Aplicando...' : 'Aplicar'}
                                        </button>
                                    </div>
                                )}
                                <p className="text-xs text-gray-500 mt-2">
                                    Cupons válidos: DESCONTO10, FRETE20
                                </p>
                            </div>
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

                                {subtotal <= 500 && (
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
                                onClick={handleCheckout}
                                disabled={isLoading || cartItems.length === 0}
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                aria-label="Finalizar compra"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-label="Carregando"></div>
                                        <span>Processando...</span>
                                    </div>
                                ) : (
                                    'Finalizar Compra'
                                )}
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