"use client";
/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@nextui-org/link";
import { AnimatedGridPattern } from "../ui/animated-grid-pattern";
import { Typewriter } from "../ui/typewriter";
import { useState } from "react";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);

  // Função para abrir o pop-up
  const handleOpenModal = () => {
  
    setShowModal(true);
  };
  return (
    <div className="relative justify-center items-center">
      <section className="max-w-screen-xl mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={1}
        repeatDelay={0}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center"
        >
          <span className="w-fit h-full text-sm bg-card px-2 py-1 border border-border rounded-full text-[#28282B]">
            Simples, prático e automatizado
          </span>
          <h1 className="text-5xl font-medium tracking-tighter mx-auto md:text-6xl text-pretty text-[#28282B]">
            Agenda cheia, sem <Typewriter
          text={[
            "stress",
            "demora",
            "esforço",
            
          ]}
          speed={70}
          className="text-[#006FEE]"
          waitTime={1500}
          deleteSpeed={40}
          cursorChar={"_"}
        />
          </h1>
          <p className="max-w-2xl text-lg mx-auto text-muted-foreground text-balance font-normal">
            Configure em minutos e comece a crescer
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0"
          >
            <Button onPress={handleOpenModal} color="primary" variant="shadow" className="text-white">
              Saiba mais
            </Button>
           
          </motion.div>
        </motion.div>
      </section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, type: "spring", bounce: 0 }}
        className="w-full h-full absolute -top-32 flex justify-end items-center pointer-events-none "
      >
        
      </motion.div>
      
    </div>
  );
}
