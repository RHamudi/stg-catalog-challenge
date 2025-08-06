"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import ProductCard from "../components/productCard";
import { UserAuth } from "../context/authContext";

const Home = () => {
  const { products } = UserAuth();

  return (
    <div>
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 flex items-center pt-24">
        <div className="max-w-[1200px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-gray-700 to-green-500 bg-clip-text text-transparent animate-slide-in-left">
              Produtos Sustentáveis para um Futuro Verde
            </h1>
            <p className="text-lg text-gray-500 animate-slide-in-left animation-delay-200">
              Descubra nossa coleção cuidadosamente selecionada de produtos ecológicos que fazem a diferença para você e para o planeta.
            </p>
            <div className="flex gap-4 animate-slide-in-left animation-delay-400">
              <button className="bg-gradient-to-br from-green-500 to-green-700 text-white py-3 px-6 rounded-full font-semibold shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
                Explorar Produtos
              </button>
              <button className="border-2 border-green-500 text-green-600 py-3 px-6 rounded-full font-semibold hover:bg-green-500 hover:text-white transition-transform hover:-translate-y-1">
                Saiba Mais
              </button>
            </div>
          </div>
          <div className="relative animate-slide-in-right">
            <div className="rounded-2xl overflow-hidden shadow-xl hover:scale-[1.05] transition-transform">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Produtos Sustentáveis"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Produtos com Filtro */}
      <section className="py-24 bg-white" id="produtos">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-br from-gray-700 to-green-500 bg-clip-text text-transparent mb-4">
            Produtos em destaque
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-br from-gray-700 to-green-500 bg-clip-text text-transparent mb-4">
            Por que Escolher a EcoStore?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-16">
            Comprometidos com a sustentabilidade e qualidade, oferecemos produtos que respeitam o meio ambiente sem abrir mão da excelência.
          </p>

          <div className="grid gap-8 md:grid-cols-3 mt-8">
            {[
              {
                icon: '🌱',
                title: '100% Sustentável',
                desc: 'Todos os nossos produtos são cuidadosamente selecionados para garantir o menor impacto ambiental possível.',
              },
              {
                icon: '🚚',
                title: 'Entrega Rápida',
                desc: 'Entregamos seus produtos com rapidez e segurança, usando embalagens biodegradáveis.',
              },
              {
                icon: '💚',
                title: 'Qualidade Premium',
                desc: 'Produtos de alta qualidade que duram mais, reduzindo o desperdício e proporcionando melhor custo-benefício.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-green-50 to-green-100 p-10 rounded-2xl text-center shadow hover:-translate-y-2 transition-all border border-green-200 relative overflow-hidden"
              >
                <div className="w-20 h-20 flex items-center justify-center text-3xl mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-full shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-500 to-green-700 text-white text-center relative">
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Pronto para Fazer a Diferença?</h2>
          <p className="text-lg mb-10 opacity-90">
            Junte-se a milhares de pessoas que já escolheram um estilo de vida mais sustentável
          </p>
          <button className="bg-white text-green-600 py-4 px-10 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1">
            Começar Agora
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
