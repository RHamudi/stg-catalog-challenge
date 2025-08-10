"use client"
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { UserAuth } from '@/context/authContext';
import { useCart } from '@/context/cartContext';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { session, Logout } = UserAuth();
    const { getCartCount } = useCart();
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fechar menu do usuário quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await Logout();
            setIsUserMenuOpen(false);
            // Opcional: redirecionar ou mostrar mensagem de sucesso
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <header
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/98 backdrop-blur-md shadow-lg shadow-green-500/10'
                : 'bg-white/95 backdrop-blur-md'
                }`}
        >
            <nav className="max-w-6xl mx-auto flex justify-between items-center px-8 py-4">
                {/* Logo */}
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                    GreenGo
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-8">
                    {[
                        { name: 'Início', id: '/' },
                        { name: 'Produtos', id: 'products' }
                    ].map((item) => (
                        <li key={item.id}>
                            <Link href={item.id}
                                className="text-green-800 font-medium relative group transition-all duration-300 hover:text-green-600 hover:-translate-y-0.5"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-green-400 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Cart Button / Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {session ? (
                        // Usuário logado - mostrar carrinho e menu do usuário
                        <>
                            {/* Botão do Carrinho */}
                            <Link href={'/cart'} className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/30 flex items-center gap-2">
                                <ShoppingCart />
                                Carrinho {getCartCount()}
                            </Link>

                            {/* Menu do Usuário */}
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 text-green-600 font-medium px-4 py-2 rounded-full border border-green-600 transition-all duration-300 hover:bg-green-50 hover:-translate-y-0.5"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {session.user?.email?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div className={`absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-green-100 transition-all duration-200 origin-top-right ${isUserMenuOpen
                                    ? 'opacity-100 scale-100 translate-y-0'
                                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                    }`}>
                                    <div className="py-2">
                                        {/* User Info */}
                                        <div className="px-4 py-3 border-b border-green-100">
                                            <p className="text-sm font-medium text-green-800">
                                                {'Usuário'}
                                            </p>
                                            <p className="text-sm text-green-600 truncate">
                                                {session.user?.email}
                                            </p>
                                        </div>

                                        <Link href="/orders"
                                            className="flex items-center gap-3 px-4 py-3 text-green-700 hover:bg-green-50 transition-colors duration-200"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            Meus Pedidos
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Sair
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Usuário não logado - mostrar botões de login/registro
                        <>
                            <Link href={'/login'} className="text-green-600 font-medium px-4 py-2 rounded-full border border-green-600 transition-all duration-300 hover:bg-green-50 hover:-translate-y-0.5">
                                Login
                            </Link>
                            <Link href={'/register'} className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/30">
                                Registre-se
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden flex flex-col gap-1 p-2"
                >
                    <span className={`w-6 h-0.5 bg-green-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-green-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-green-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="bg-white/95 backdrop-blur-md border-t border-green-100 px-8 py-6">
                    <ul className="space-y-4">
                        {[
                            { name: 'Início', id: '/' },
                            { name: 'Produtos', id: 'products' },
                            { name: 'Sobre', id: 'sobre' },
                            { name: 'Contato', id: 'contato' }
                        ].map((item) => (
                            <li key={item.id}>
                                <Link href={item.id}
                                    className="block w-full text-left text-green-800 font-medium py-2 px-4 rounded-lg hover:bg-green-50 transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <li className="pt-4 space-y-3">
                            {session ? (
                                // Usuário logado - mostrar opções no mobile
                                <>
                                    <Link href={'/cart'} className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-full font-medium w-full flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                        </svg>
                                        Carrinho {getCartCount()}
                                    </Link>

                                    {/* User Info Mobile */}
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-sm font-medium text-green-800 mb-2">
                                            {'Usuário'}
                                        </p>
                                        <p className="text-xs text-green-600 mb-3">
                                            {session.user?.email}
                                        </p>

                                        <div className="space-y-2">
                                            <Link href="/profile" className="block w-full text-left text-green-700 font-medium py-2 px-3 rounded-lg hover:bg-green-100 transition-colors duration-200">
                                                👤 Meu Perfil
                                            </Link>
                                            <Link href="/orders" className="block w-full text-left text-green-700 font-medium py-2 px-3 rounded-lg hover:bg-green-100 transition-colors duration-200">
                                                📦 Meus Pedidos
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left text-red-600 font-medium py-2 px-3 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                            >
                                                🚪 Sair
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                // Usuário não logado - mostrar botões de login/registro no mobile
                                <>
                                    <Link href={'/login'} className="text-green-600 font-medium px-4 py-2 rounded-full border border-green-600 w-full block text-center transition-all duration-300 hover:bg-green-50">
                                        Login
                                    </Link>
                                    <Link href={'/register'} className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-full font-medium w-full block text-center">
                                        Registre-se
                                    </Link>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;