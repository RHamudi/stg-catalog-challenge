"use client"
import { useEffect } from "react";
import Navbar from "./components/navbar"
import ProductCard from "./components/productCard"
import { IProduct } from "./types";
import { UserAuth } from "./context/authContext";

export default function Home() {

  const { products } = UserAuth();

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
