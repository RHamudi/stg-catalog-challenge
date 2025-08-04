"use client"
import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: any) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
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
                    Verde Store
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-8">
                    {[
                        { name: 'Início', id: 'home' },
                        { name: 'Produtos', id: 'produtos' },
                        { name: 'Sobre', id: 'sobre' },
                        { name: 'Contato', id: 'contato' }
                    ].map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => scrollToSection(item.id)}
                                className="text-green-800 font-medium relative group transition-all duration-300 hover:text-green-600 hover:-translate-y-0.5"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-green-400 group-hover:w-full transition-all duration-300"></span>
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Cart Button */}
                <div className="hidden md:flex items-center gap-3">
                    <button className="text-green-600 font-medium px-4 py-2 rounded-full border border-green-600 transition-all duration-300 hover:bg-green-50 hover:-translate-y-0.5">
                        Login
                    </button>
                    <button className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/30">
                        Registre-se
                    </button>
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
                            { name: 'Início', id: 'home' },
                            { name: 'Produtos', id: 'produtos' },
                            { name: 'Sobre', id: 'sobre' },
                            { name: 'Contato', id: 'contato' }
                        ].map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className="block w-full text-left text-green-800 font-medium py-2 px-4 rounded-lg hover:bg-green-50 transition-colors duration-200"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                        <li className="pt-4 space-y-3">
                            <button className="text-green-600 font-medium px-4 py-2 rounded-full border border-green-600 w-full transition-all duration-300 hover:bg-green-50">
                                Login
                            </button>
                            <button className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-full font-medium w-full">
                                Registre-se
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;