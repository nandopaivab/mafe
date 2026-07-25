"use client";

import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Conjunto Moletom Infantil Dino",
    price: 129.90,
    oldPrice: 159.90,
    image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=600&auto=format&fit=crop",
    category: "Meninos",
    rating: 5,
    reviews: 42,
    badge: "Mais Vendido"
  },
  {
    id: 2,
    name: "Vestido Floral Primavera",
    price: 99.90,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=600&auto=format&fit=crop",
    category: "Meninas",
    rating: 4.8,
    reviews: 28,
    badge: "Lançamento"
  },
  {
    id: 3,
    name: "Macacão Bebê Algodão Urso",
    price: 79.90,
    oldPrice: 99.90,
    image: "https://images.unsplash.com/photo-1560508180-03f285f67eae?q=80&w=600&auto=format&fit=crop",
    category: "Bebês",
    rating: 4.9,
    reviews: 156,
    badge: "Oferta"
  },
  {
    id: 4,
    name: "Tênis Infantil Conforto",
    price: 149.90,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1515347619362-e5b15be6251b?q=80&w=600&auto=format&fit=crop",
    category: "Calçados",
    rating: 5,
    reviews: 19,
    badge: null
  }
];

export function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Os Favoritos da Estação
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Peças escolhidas com carinho para garantir o conforto e o estilo que as crianças merecem.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 mb-4">
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-full shadow-sm">
                    {product.badge}
                  </div>
                )}
                
                <button className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 rounded-full shadow-sm transition-colors">
                  <Heart className="h-4 w-4" />
                </button>

                <Link href={`/produto/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Quick Add Button overlay */}
                <div 
                  className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
                    hoveredProduct === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <button className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-primary-foreground transition-colors">
                    <ShoppingBag className="h-4 w-4" />
                    Comprar
                  </button>
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3.5 w-3.5 fill-pastel-yellow text-pastel-yellow" />
                  <span className="text-xs font-medium text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>
                
                <h3 className="text-gray-900 font-medium mb-1 line-clamp-2">
                  <Link href={`/produto/${product.id}`} className="hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                </h3>
                
                <div className="mt-auto pt-2 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
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
