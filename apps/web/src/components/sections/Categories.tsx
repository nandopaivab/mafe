"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    title: "Meninas",
    subtitle: "Vestidos, Conjuntos e mais",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop",
    link: "/roupas/meninas",
    className: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto", // Large block
  },
  {
    title: "Meninos",
    subtitle: "Para todas as aventuras",
    image: "https://images.unsplash.com/photo-1519238263530-99abad672f23?q=80&w=800&auto=format&fit=crop",
    link: "/roupas/meninos",
    className: "md:col-span-1 md:row-span-1 aspect-[4/3] md:aspect-auto", // Small block top right
  },
  {
    title: "Bebês",
    subtitle: "Conforto para os primeiros passos",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=800&auto=format&fit=crop",
    link: "/roupas/bebes",
    className: "md:col-span-1 md:row-span-1 aspect-[4/3] md:aspect-auto", // Small block bottom right
  },
  {
    title: "Brinquedos Educativos",
    subtitle: "Aprender brincando",
    image: "https://images.unsplash.com/photo-1558066531-1550c8fc0280?q=80&w=1200&auto=format&fit=crop",
    link: "/brinquedos",
    className: "md:col-span-3 md:row-span-1 aspect-[21/9] md:aspect-[3/1]", // Wide block bottom
  },
];

export function Categories() {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Descubra por <span className="text-secondary italic font-serif font-medium">Universo</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Organizamos cada seção com carinho para facilitar sua busca pelo look perfeito.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 md:gap-6 md:h-[800px]">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${category.className}`}
            >
              <Link href={category.link} className="block w-full h-full">
                {/* Background Image with Zoom */}
                <div className="absolute inset-0">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                  <div className="flex justify-between items-end">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white/80 font-medium mb-1 text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {category.subtitle}
                      </p>
                      <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        {category.title}
                      </h3>
                    </div>
                    
                    {/* Glass Circle Button */}
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-xl">
                      <ArrowUpRight className="h-6 w-6" />
                    </div>
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
