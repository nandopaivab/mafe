"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#FFF5F5] to-[#F0FBFA]">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF6B6B]/10 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#4ECDC4]/20 rounded-full blur-[120px] mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-800 tracking-wide">Nova Coleção de Verão</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Moda infantil com <br className="hidden lg:block"/>
              <span className="relative inline-block text-primary">
                magia e conforto
                {/* Underline SVG */}
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-[#FFD166]/80 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
              Vestimos a infância com liberdade, cores e muita alegria. Descubra peças exclusivas feitas para acompanhar cada fase do seu pequeno.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <Link 
                href="/roupas" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gray-900 overflow-hidden rounded-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative z-10 flex items-center">
                  Comprar Agora
                </span>
              </Link>
              <Link 
                href="/brinquedos" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-700 bg-white/50 backdrop-blur-md border border-white hover:bg-white transition-all rounded-full shadow-sm hover:shadow-md"
              >
                Ver Catálogo
                <ArrowRight className="ml-2 h-5 w-5 text-primary" />
              </Link>
            </div>
          </motion.div>

          {/* Image & Glassmorphism Card */}
          <motion.div 
            className="relative w-full max-w-xl mx-auto lg:ml-auto lg:mr-0 h-[500px] sm:h-[600px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            {/* Main Image Masked */}
            <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Menina sorrindo com roupas MaFê Kids" 
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Glassmorphic Floating Card */}
            <motion.div 
              className="absolute -bottom-8 -left-4 sm:-left-12 md:-left-8 bg-white/70 backdrop-blur-xl border border-white/50 p-5 sm:p-6 rounded-3xl shadow-xl flex items-center gap-4 w-[280px] sm:w-[320px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="flex -space-x-4">
                <img className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Avatar 1"/>
                <img className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Avatar 2"/>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-sm font-bold shadow-sm z-10">
                  +2k
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex text-[#FFD166]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xs sm:text-sm font-bold text-gray-800 mt-1 leading-tight">Mães confiam &<br/>Crianças amam!</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
