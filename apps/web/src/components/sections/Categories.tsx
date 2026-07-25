"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Meninas",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop",
    link: "/roupas/meninas",
    color: "bg-pastel-pink",
  },
  {
    title: "Meninos",
    image: "https://images.unsplash.com/photo-1519238263530-99abad672f23?q=80&w=800&auto=format&fit=crop",
    link: "/roupas/meninos",
    color: "bg-pastel-blue",
  },
  {
    title: "Bebês",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=800&auto=format&fit=crop",
    link: "/roupas/bebes",
    color: "bg-pastel-yellow",
  },
  {
    title: "Brinquedos",
    image: "https://images.unsplash.com/photo-1558066531-1550c8fc0280?q=80&w=800&auto=format&fit=crop",
    link: "/brinquedos",
    color: "bg-pastel-green",
  },
];

export function Categories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Navegue por Categorias
            </h2>
            <p className="text-gray-600 max-w-2xl text-lg">
              Encontre exatamente o que você procura para deixar o dia a dia dos pequenos ainda mais especial.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-0"
          >
            <Link href="/categorias" className="inline-flex items-center text-primary font-semibold hover:text-primary-foreground transition-colors group">
              Ver todas as categorias
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={category.link} className="group block relative rounded-3xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-300">
                <div className={`absolute inset-0 ${category.color} mix-blend-multiply opacity-20 group-hover:opacity-10 transition-opacity z-10`}></div>
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20"></div>
                <div className="absolute bottom-0 left-0 p-6 z-30 w-full flex justify-between items-end">
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
