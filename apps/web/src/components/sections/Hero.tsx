"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pastel-blue/40 to-white pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-pastel-pink text-secondary-foreground text-sm font-semibold mb-6">
              ✨ Nova Coleção Primavera-Verão
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Tudo para deixar a infância ainda mais <span className="text-primary relative inline-block">
                especial
                <svg className="absolute -bottom-2 w-full h-3 text-pastel-yellow" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Roupas confortáveis, brinquedos educativos e acessórios encantadores para acompanhar cada fase do seu pequeno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/roupas" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary hover:bg-primary-foreground transition-colors rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Comprar Roupas
              </Link>
              <Link 
                href="/brinquedos" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary bg-white border-2 border-primary hover:bg-pastel-blue/10 transition-colors rounded-full"
              >
                Ver Brinquedos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100">
              {/* Placeholder for the main image, in a real app this would be next/image */}
              <img 
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Criança feliz com roupas da MaFê Kids" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating badge */}
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="w-12 h-12 bg-pastel-yellow rounded-full flex items-center justify-center text-xl">
                ⭐
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Avaliações</p>
                <p className="text-sm font-bold text-gray-900">4.9/5 de 2.000+ mães</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-pastel-pink rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-pastel-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pastel-blue rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </section>
  );
}
