"use client";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { motion } from "framer-motion";

export default function Pricing() {
  const plans = [
    {
      name: "Essencial",
      desc: "Pequenos negócios que estão começando com agendamentos online.",
      price: 29,
      isMostPop: false,
      features: [
        "Página personalizada de agendamentos com link exclusivo",
        "Agendamento ilimitado para clientes",
        "Notificações por e-mail",
        "Design clean e responsivo",
      ],
    },
    {
      name: "Avançado",
      desc: "Negócios que precisam de mais personalização e ferramentas de gestão.",
      price: 59,
      isMostPop: true,
      features: [
        "Todas as funcionalidades do plano Essencial",
        "Notificações automáticas por WhatsApp",
        "Adição de serviços específicos",
        "Exportação de relatórios de agendamentos",
        "Personalização de cores e temas",
      ],
    },
    {
      name: "Premium",
      desc: "Solução completa para gerenciar agendamentos e melhorar a experiência do cliente.",
      price: 99,
      isMostPop: false,
      features: [
        "Todas as funcionalidades do plano Avançado",
        "Calendário administrativo com visão semanal e mensal",
        "Lembretes automáticos para clientes e proprietários",
        "Remarcação e cancelamento facilitados",
        "Suporte premium com resposta prioritária",
      ],
    },
  ];

  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5, type: "spring", bounce: 0 }}
      className="max-w-screen-xl w-full mx-auto px-4 py-28 gap-5 md:px-8 flex flex-col justify-center items-center"
      id="precos"
    >
      <div className="flex flex-col gap-3" >
        <h3 className="text-3xl font-semibold sm:text-4xl text-center bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          Planos para o seu negócio
        </h3>
        <p className="max-w-xl text-muted-foreground text-center">
          Escolha o plano que melhor atende às suas necessidades.
        </p>
      </div>
      <div className="mt-16 gap-10 grid lg:grid-cols-3 place-content-center">
        {plans.map((item, idx) => (
          <Card
            key={idx}
            shadow="none"
            className={`relative rounded-[20px] p-[2px] will-change-transform ${
              item.isMostPop ? "sm:scale-110" : ""
            }`}
          >
            {item.isMostPop ? (
              <span className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#016FEE_70%,#C7DBFB_100%)]" />
            ) : (
              <span className="absolute inset-[-1000%] bg-border" />
            )}
            <div className="z-[2] flex flex-col justify-between w-full h-full bg-card rounded-[18px] p-5">
              <CardBody className="w-full flex items-start gap-3">
                <div className="flex flex-col">
                  <h4 className="text-2xl font-medium text-[#28282B]">{item.name}</h4>
                  <span className="text-muted-foreground text-sm font-light">
                    {item.desc}
                  </span>
                </div>
                <span className="text-2xl font-medium text-[#28282B]">R$ {item.price}/mês</span>

                <Divider />

                <div className="flex flex-col gap-5 pb-5">
                  <ul className="flex flex-col gap-2">
                    {item.features.map((feature, index) => (
                      <li key={index} className="text-sm font-light text-[#28282B]">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardBody>
              <CardFooter className="p-0">
                <Button
                  className={`w-full border font-medium ${
                    item.isMostPop
                      ? "bg-primary text-white border-transparent"
                      : "bg-transparent text-black border-gray-300 hover:bg-black hover:text-white"
                  }`}
                  variant="solid"
                >
                  Começar agora
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}