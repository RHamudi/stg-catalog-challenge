"use client"
import { UserAuth } from '@/context/authContext';
import { getOrdersByEmail } from '@/services/orderService';
import { IOrders } from '@/types';
import { Undo2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type OrderItem = {
    id: string;
    order_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
};

type Order = {
    id: string;
    created_at: string; // ISO date string
    customer_name: string;
    customer_email: string;
    total_amount: number;
    shipping: string | number; // pode ser "Free" ou número
    notes: string | null;
    order_items: OrderItem[];
};

export default function OrdersList() {
    const [orders, setOrders] = useState<IOrders[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<IOrders | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { session } = UserAuth();

    useEffect(() => {
        setIsLoading(true);
        if (session) {
            getOrdersByEmail(session.user.user_metadata.email).then((data) => setOrders(data))
        }
        setIsLoading(false)
    }, []);

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando pedidos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className='flex'>
                            <Link href={'/products'}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex"
                                aria-label="Voltar"
                            >
                                <Undo2 size={40} color="#0f0f0f" strokeWidth={1.75} />
                            </Link >
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
                                <p className="text-gray-600 mt-1">Gerencie todos os seus pedidos</p>
                            </div>
                        </div>


                        {/* Estatísticas */}
                        <div className="flex gap-4">
                            <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-2 rounded-lg border border-green-200">
                                <div className="text-sm text-green-700">Receita Total</div>
                                <div className="text-lg font-bold text-green-800">
                                    R$ {totalRevenue.toFixed(2).replace('.', ',')}
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-lg border border-blue-200">
                                <div className="text-sm text-blue-700">Total de Pedidos</div>
                                <div className="text-lg font-bold text-blue-800">{orders.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Lista de Pedidos */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg">

                            {/* Busca */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Buscar por cliente, email ou ID..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Lista */}
                            <div className="divide-y divide-gray-200">
                                {filteredOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-gray-900">{order.customer_name}</h3>
                                                    {order.notes && (
                                                        <span className="px-3 py-1 text-xs font-medium rounded-full border bg-blue-100 text-blue-800 border-blue-200">
                                                            Com observações
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="space-y-1 text-sm text-gray-600">
                                                    <p>📧 {order.customer_email}</p>
                                                    <p>🆔 {order.id.slice(0, 8)}...</p>
                                                    <p>📅 {formatDate(order.created_at)}</p>
                                                    {order.notes && <p>📝 {order.notes}</p>}
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                                    R$ {order.total_amount}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {order.items.length} item(s)
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Frete: {order.shipping === 'Free' ? 'Grátis' : `R$ ${order.shipping}`}
                                                </div>
                                            </div>
                                        </div>

                                        {selectedOrder?.id === order.id && (
                                            <div className="mt-6 pt-6 border-t border-gray-200">
                                                <h4 className="font-medium text-gray-900 mb-4">Itens do Pedido</h4>
                                                <div className="space-y-3">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                                                            <div className="flex-1">
                                                                <div className="font-medium text-gray-900">{item.product_name}</div>
                                                                <div className="text-sm text-gray-600">
                                                                    Quantidade: {item.quantity} × R$ {item.unit_price}
                                                                </div>
                                                            </div>
                                                            <div className="font-bold text-gray-900">
                                                                R$ {item.total_price}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {filteredOrders.length === 0 && (
                                    <div className="p-12 text-center">
                                        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
                                        <p className="text-gray-600">Tente ajustar sua busca.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar com Resumo */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumo Geral</h2>

                            <div className="space-y-6">
                                {/* Total de Pedidos */}
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-blue-900">{orders.length}</div>
                                            <div className="text-sm text-blue-700">Total de Pedidos</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Receita Total */}
                                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-green-900">
                                                R$ {totalRevenue.toFixed(2).replace('.', ',')}
                                            </div>
                                            <div className="text-sm text-green-700">Receita Total</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Informações sobre Frete */}
                                <div className="space-y-3">
                                    <h3 className="font-medium text-gray-900">Frete</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Frete Grátis:</span>
                                            <span className="font-medium">{orders.filter(order => order.shipping === 'Free').length} pedidos</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Frete Pago:</span>
                                            <span className="font-medium">{orders.filter(order => order.shipping !== 'Free').length} pedidos</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Informações sobre Observações */}
                                <div className="space-y-3">
                                    <h3 className="font-medium text-gray-900">Observações</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Com observações:</span>
                                            <span className="font-medium">{orders.filter(order => order.notes).length} pedidos</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Sem observações:</span>
                                            <span className="font-medium">{orders.filter(order => !order.notes).length} pedidos</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}