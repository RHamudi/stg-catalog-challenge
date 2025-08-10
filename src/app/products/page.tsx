"use client"
import Navbar from "@/components/navbar";
import { UserAuth } from "@/context/authContext";
import isAuth from "@/lib/isAuth";
import { IProduct } from "@/types";
import { lazy, useEffect, useState, Suspense } from "react";
import { SlidersHorizontal } from 'lucide-react';

const ProductCard = lazy(() => import("@/components/productCard"));

// Tipos para os filtros
type PriceRange = [number, number];
type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

function Products() {
    const { products } = UserAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // Filtros avançados
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<PriceRange>([0, 1000]);
    const [sortOption, setSortOption] = useState<SortOption>('name-asc');

    // Obter categorias únicas
    const categories = [...new Set(products.map(product => product.category))];

    // Aplicar todos os filtros
    useEffect(() => {
        if (products.length > 0) {
            setIsLoading(false);

            let filtered = [...products];

            // Filtro por termo de busca
            if (searchTerm.trim() !== "") {
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            // Filtro por categoria
            if (selectedCategories.length > 0) {
                filtered = filtered.filter(product =>
                    selectedCategories.includes(product.category)
                );
            }

            // Filtro por faixa de preço
            filtered = filtered.filter(product =>
                product.price >= priceRange[0] && product.price <= priceRange[1]
            );

            // Ordenação
            filtered.sort((a, b) => {
                switch (sortOption) {
                    case 'price-asc':
                        return a.price - b.price;
                    case 'price-desc':
                        return b.price - a.price;
                    case 'name-asc':
                        return a.name.localeCompare(b.name);
                    case 'name-desc':
                        return b.name.localeCompare(a.name);
                    default:
                        return 0;
                }
            });

            setFilteredProducts(filtered);
        }
    }, [products, searchTerm, selectedCategories, priceRange, sortOption]);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = parseFloat(e.target.value);
        setPriceRange(prev => {
            const newRange = [...prev] as PriceRange;
            newRange[index] = value;
            return newRange;
        });
    };

    if (isLoading) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-30 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-30">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-green-800 text-center mb-2">
                        Nossos Produtos
                    </h1>
                    <p className="text-green-600 text-center mb-12">
                        Melhores produtos com as melhores qualidades.
                    </p>

                    {/* Barra de busca e filtros */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        {/* Campo de busca */}
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar produtos por nome..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full text-black px-4 py-3 pl-12 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Botão de filtros */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <SlidersHorizontal size={18} />
                            <span>Filtros</span>
                        </button>
                    </div>

                    {/* Painel de filtros avançados */}
                    {showFilters && (
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-green-100">
                            <h3 className="text-lg font-semibold text-green-800 mb-4">Filtros Avançados</h3>

                            {/* Filtro por categoria */}
                            <div className="mb-6">
                                <h4 className="text-md font-medium text-green-700 mb-3">Categorias</h4>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => toggleCategory(category)}
                                            className={`px-3 py-1 rounded-full text-sm ${selectedCategories.includes(category)
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filtro por preço */}
                            <div className="mb-6">
                                <h4 className="text-md font-medium text-green-700 mb-3">Faixa de Preço</h4>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm text-green-600 mb-1">Mínimo</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">R$</span>
                                            <input
                                                type="number"
                                                value={priceRange[0]}
                                                onChange={(e) => handlePriceChange(e, 0)}
                                                min="0"
                                                className="w-full pl-10 pr-3 py-2 border border-green-300 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm text-green-600 mb-1">Máximo</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">R$</span>
                                            <input
                                                type="number"
                                                value={priceRange[1]}
                                                onChange={(e) => handlePriceChange(e, 1)}
                                                min={priceRange[0]}
                                                className="w-full pl-10 pr-3 py-2 border border-green-300 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={priceRange[0]}
                                        onChange={(e) => handlePriceChange(e, 0)}
                                        className="w-full accent-green-600"
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={priceRange[1]}
                                        onChange={(e) => handlePriceChange(e, 1)}
                                        className="w-full accent-green-600 mt-2"
                                    />
                                </div>
                            </div>

                            {/* Ordenação */}
                            <div>
                                <h4 className="text-md font-medium text-green-700 mb-3">Ordenar por</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setSortOption('name-asc')}
                                        className={`px-4 py-2 rounded-lg border ${sortOption === 'name-asc'
                                                ? 'bg-green-100 border-green-600 text-green-800'
                                                : 'border-green-300 hover:bg-green-50'
                                            }`}
                                    >
                                        Nome (A-Z)
                                    </button>
                                    <button
                                        onClick={() => setSortOption('name-desc')}
                                        className={`px-4 py-2 rounded-lg border ${sortOption === 'name-desc'
                                                ? 'bg-green-100 border-green-600 text-green-800'
                                                : 'border-green-300 hover:bg-green-50'
                                            }`}
                                    >
                                        Nome (Z-A)
                                    </button>
                                    <button
                                        onClick={() => setSortOption('price-asc')}
                                        className={`px-4 py-2 rounded-lg border ${sortOption === 'price-asc'
                                                ? 'bg-green-100 border-green-600 text-green-800'
                                                : 'border-green-300 hover:bg-green-50'
                                            }`}
                                    >
                                        Preço (Menor)
                                    </button>
                                    <button
                                        onClick={() => setSortOption('price-desc')}
                                        className={`px-4 py-2 rounded-lg border ${sortOption === 'price-desc'
                                                ? 'bg-green-100 border-green-600 text-green-800'
                                                : 'border-green-300 hover:bg-green-50'
                                            }`}
                                    >
                                        Preço (Maior)
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Resultados da busca */}
                    {searchTerm && (
                        <div className="text-center mb-6">
                            <p className="text-green-600">
                                {filteredProducts.length === 0
                                    ? `Nenhum produto encontrado para "${searchTerm}"`
                                    : `${filteredProducts.length} produto(s) encontrado(s) para "${searchTerm}"`
                                }
                            </p>
                        </div>
                    )}

                    {/* Mensagem quando não há produtos */}
                    {filteredProducts.length === 0 && !isLoading && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🌿</div>
                            <h3 className="text-xl font-semibold text-green-800 mb-2">
                                Nenhum produto disponível
                            </h3>
                            <p className="text-green-600">
                                {searchTerm ? "Tente ajustar sua busca" : "Volte mais tarde para ver nossos produtos"}
                            </p>
                        </div>
                    )}

                    {/* Lista de produtos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Suspense fallback={<div className="col-span-3 text-center py-12">Carregando produtos...</div>}>
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;