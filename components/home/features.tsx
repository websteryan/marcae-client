"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Smartphone, MessageCircle } from "lucide-react"; // Ícones sugeridos
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";

const Features = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Garantir que o código só seja executado no cliente
    setIsClient(true);
  }, []);

  const features = [
    {
      icon: <Calendar className="w-10 h-10 text-primary" />,
      title: "Gerenciamento de Agendamentos",
      description:
        "Visualize, edite ou exclua seus agendamentos de forma rápida e organizada com nossa interface intuitiva.",
    },
    {
      icon: <Smartphone className="w-10 h-10 text-primary" />,
      title: "Página de Agendamento para Clientes",
      description:
        "Forneça um link único e personalizado para seus clientes agendarem diretamente.",
    },
    {
      icon: <MessageCircle className="w-10 h-10 text-primary" />,
      title: "Mensagens Automáticas",
      description:
        "Envie lembretes e confirmações automáticas via WhatsApp para você e seus clientes.",
    },
  ];

  return (
    <section className="relative py-32 text-center px-6 min-h-screen" id="funcionalidades">
      {/* Efeito de fade-in suave no topo */}
      {isClient && (
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-background to-transparent h-18"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      )}

      {/* Background animado */}
      {isClient && (
        <AnimatedGradient colors={["#006FEE", "#3A8DFF", "#5B9DF9"]} speed={0.01} blur="light" />
      )}

      {/* Conteúdo da seção */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto text-foreground backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          O que o Marcaê faz por você?
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Descubra como o Marcaê pode transformar sua gestão de agendamentos e
          facilitar a comunicação com seus clientes.
        </p>

        {/* Cards de funcionalidades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white/80 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Efeito de fade-out suave no final */}
      {isClient && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      )}
    </section>
  );
};

export default Features;