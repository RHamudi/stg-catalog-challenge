"use client"
import Navbar from "@/components/navbar";
import ProductCard from "@/components/productCard";
import { UserAuth } from "@/context/authContext";
import isAuth from "@/lib/isAuth";
import { IProduct } from "@/types";
import { useEffect, useState } from "react";


function Products() {

    const { products } = UserAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filtra os produtos baseado no termo de busca
    useEffect(() => {
        if (products.length > 0) {
            setIsLoading(false);
        }

        if (searchTerm.trim() === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    if (isLoading) {
        return (
            <div>
                <Navbar></Navbar>
                <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-30 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-30 ">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-green-800 text-center mb-2">
                        Nossos Produtos
                    </h1>
                    <p className="text-green-600 text-center mb-12">
                        Descubra nossa seleção de produtos sustentáveis e de alta qualidade
                    </p>

                    {/* Campo de busca */}
                    <div className="mb-8">
                        <div className="max-w-md mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar produtos por nome..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 pl-12 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;