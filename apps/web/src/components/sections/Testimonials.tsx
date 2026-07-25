"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";

const testimonials = [
  {
    id: 1,
    name: "Mariana Silva",
    role: "Mãe do Lucas (2 anos)",
    content: "As roupinhas são maravilhosas! O tecido é super macio e resistente. O Lucas brinca o dia todo e fica super confortável. A entrega foi super rápida, recomendo muito!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Carolina Mendes",
    role: "Mãe da Sofia (5 anos)",
    content: "Comprei o vestido floral para o aniversário da minha filha e ela não quer mais tirar! O acabamento é impecável e o atendimento pelo WhatsApp me ajudou a escolher o tamanho perfeito.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Fernanda Costa",
    role: "Mãe dos Gêmeos (6 meses)",
    content: "Estava com receio de comprar roupinhas de bebê online, mas me surpreendi com a MaFê Kids. Os bodies são fáceis de vestir, lavam super bem e não desbotam. Já virou minha loja preferida.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=150&auto=format&fit=crop"
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="py-24 bg-pastel-blue/20 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pastel-pink rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pastel-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/3 -translate-x-1/4"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O Que as Mães Dizem
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A alegria e a satisfação de quem confia na MaFê Kids para vestir seus pequenos.
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="flex-none w-full min-w-0 pl-4">
                  <motion.div 
                    className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 mx-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Quote className="h-12 w-12 text-pastel-blue mb-6 opacity-50" />
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-pastel-yellow text-pastel-yellow" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-14 h-14 rounded-full object-cover border-2 border-pastel-pink"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
