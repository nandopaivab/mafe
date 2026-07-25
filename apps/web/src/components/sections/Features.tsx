"use client";

import { Truck, ShieldCheck, Heart, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: "Frete Grátis",
    description: "Para compras acima de R$ 199,00",
    bgColor: "bg-pastel-blue",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-secondary" />,
    title: "Compra Segura",
    description: "Ambiente 100% criptografado",
    bgColor: "bg-pastel-pink",
  },
  {
    icon: <Heart className="h-8 w-8 text-red-400" />,
    title: "Qualidade Premium",
    description: "Materiais pensados no conforto",
    bgColor: "bg-pastel-yellow",
  },
  {
    icon: <RotateCcw className="h-8 w-8 text-emerald-500" />,
    title: "Troca Fácil",
    description: "Primeira troca é por nossa conta",
    bgColor: "bg-pastel-green",
  },
];

export function Features() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50/50 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-xl ${feature.bgColor} bg-opacity-30`}>
                {feature.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
