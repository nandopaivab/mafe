"use client";

import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Conjunto Moletom Dino Explore",
    price: 129.90,
    oldPrice: 159.90,
    image1: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=600&auto=format&fit=crop",
    image2: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?q=80&w=600&auto=format&fit=crop", // secondary image
    category: "Meninos",
    rating: 5,
    reviews: 42,
    badge: "Mais Vendido"
  },
  {
    id: 2,
    name: "Vestido Floral Princesa Verão",
    price: 99.90,
    oldPrice: null,
    image1: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=600&auto=format&fit=crop",
    image2: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop",
    category: "Meninas",
    rating: 4.8,
    reviews: 28,
    badge: "Lançamento"
  },
  {
    id: 3,
    name: "Macacão Fofura Algodão Urso",
    price: 79.90,
    oldPrice: 99.90,
    image1: "https://images.unsplash.com/photo-1560508180-03f285f67eae?q=80&w=600&auto=format&fit=crop",
    image2: "https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=600&auto=format&fit=crop",
    category: "Bebês",
    rating: 4.9,
    reviews: 156,
    badge: "Oferta"
  },
  {
    id: 4,
    name: "Tênis Infantil Magic Confort",
    price: 149.90,
    oldPrice: null,
    image1: "https://images.unsplash.com/photo-1515347619362-e5b15be6251b?q=80&w=600&auto=format&fit=crop",
    image2: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop",
    category: "Calçados",
    rating: 5,
    reviews: 19,
    badge: null
  }
];

export function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Trend <span className="text-primary italic font-serif font-medium">Alert</span>
            </h2>
            <p className="text-gray-500 text-lg">
              As peças mais amadas pelas mamães nesta coleção.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/colecao" className="group inline-flex items-center font-bold text-gray-900 hover:text-primary transition-colors">
              Ver Coleção Completa 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group flex flex-col cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-50 mb-5 shadow-sm group-hover:shadow-xl transition-all duration-500">
                
                {/* Badges */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/80 backdrop-blur-md text-xs font-bold text-gray-900 rounded-full shadow-sm border border-white/50">
                    {product.badge}
                  </div>
                )}
                
                {/* Favorite Button */}
                <button className="absolute top-4 right-4 z-20 p-2.5 bg-white/80 backdrop-blur-md text-gray-400 hover:text-primary hover:bg-white rounded-full shadow-sm transition-all border border-white/50">
                  <Heart className="h-4 w-4" />
                </button>

                {/* Images with crossfade on hover */}
                <Link href={`/produto/${product.id}`} className="block w-full h-full relative z-10">
                  <img 
                    src={product.image1} 
                    alt={product.name} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${hoveredProduct === product.id ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <img 
                    src={product.image2} 
                    alt={`${product.name} - Detalhe`} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out transform group-hover:scale-105 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}
                  />
                </Link>

                {/* Quick Action Buttons (Glassmorphism) */}
                <div 
                  className={`absolute bottom-4 left-4 right-4 flex gap-2 z-20 transition-all duration-500 ease-out ${
                    hoveredProduct === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  <button className="flex-1 py-3 bg-white/90 backdrop-blur-md text-gray-900 font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:bg-white transition-colors border border-white/50 text-sm">
                    <ShoppingBag className="h-4 w-4" />
                    Sacola
                  </button>
                  <button className="w-12 bg-white/90 backdrop-blur-md text-gray-900 font-bold rounded-2xl shadow-lg flex items-center justify-center hover:bg-white transition-colors border border-white/50">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1 px-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{product.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[#FFD166] text-[#FFD166]" />
                    <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-gray-900 font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                  <Link href={`/produto/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
                
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-extrabold text-gray-900">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm font-medium text-gray-400 line-through">
                      R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ArrowRight icon for the header link
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
