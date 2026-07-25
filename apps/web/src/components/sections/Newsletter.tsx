"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-primary rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pastel-yellow opacity-20 rounded-full -translate-x-1/4 translate-y-1/4"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Receba Novidades e Descontos Exclusivos
              </h2>
              <p className="text-primary-foreground/80 text-lg">
                Cadastre-se na nossa newsletter e ganhe 10% de desconto na sua primeira compra!
              </p>
            </motion.div>

            <motion.div 
              className="flex-1 w-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-full border-0 focus:ring-4 focus:ring-white/20 bg-white text-gray-900 placeholder:text-gray-400 outline-none transition-shadow"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="px-8 py-4 bg-secondary hover:bg-secondary-foreground text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-80 shadow-lg"
                >
                  {status === "idle" && (
                    <>
                      Assinar <Send className="h-4 w-4" />
                    </>
                  )}
                  {status === "loading" && "Enviando..."}
                  {status === "success" && "Inscrito! 🎉"}
                </button>
              </form>
              <p className="text-primary-foreground/70 text-xs mt-3 text-center sm:text-left">
                Ao se inscrever, você concorda com nossa Política de Privacidade.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
