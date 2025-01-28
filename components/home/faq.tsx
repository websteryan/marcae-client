"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { motion } from "framer-motion";

export default function Faq() {
  const accordionItems = [
    {
      title: "O que é o Marcaê?",
      content: (
        <div className="text-muted-foreground">
          O Marcaê é um sistema de agendamento online que ajuda estabelecimentos a gerenciar horários de forma eficiente. Oferecemos páginas personalizadas de agendamento, notificações automáticas e outras ferramentas para facilitar a gestão do seu negócio.
        </div>
      ),
    },
    {
      title: "Como os clientes podem agendar no meu estabelecimento?",
      content: (
        <div className="text-muted-foreground">
          Seus clientes podem acessar sua página de agendamento personalizada através de um link exclusivo que você compartilha. Lá, eles escolhem o serviço, o horário e fornecem as informações necessárias para confirmar o agendamento.
        </div>
      ),
    },
    {
      title: "É possível personalizar a página do meu estabelecimento?",
      content: (
        <div className="text-muted-foreground">
          Sim! Você pode personalizar cores, temas e até mesmo os serviços exibidos na página do seu estabelecimento, para garantir que ela reflita a identidade visual do seu negócio.
        </div>
      ),
    },
    {
      title: "O Marcaê envia notificações aos clientes?",
      content: (
        <div className="text-muted-foreground">
          Sim, o Marcaê envia notificações por e-mail e WhatsApp para lembrar os clientes sobre seus agendamentos, reduzindo o risco de faltas. As notificações são configuradas automaticamente.
        </div>
      ),
    },
    {
      title: "Como posso começar a usar o Marcaê?",
      content: (
        <div className="text-muted-foreground">
          Você pode começar criando sua conta no nosso site e configurando seu estabelecimento. Oferecemos um período de teste gratuito para que você experimente todas as funcionalidades antes de assinar um plano.
        </div>
      ),
    },
    {
      title: "Quais formas de pagamento são aceitas?",
      content: (
        <div className="text-muted-foreground">
          Aceitamos pagamentos via cartão de crédito e PIX para maior conveniência. Você pode escolher o plano que melhor se adapta ao seu negócio diretamente no painel de administração.
        </div>
      ),
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
      className="relative w-full px-4 py-28 gap-5 md:px-8 flex flex-col justify-center items-center"
      id="faq"
    >
      <div className="flex flex-col gap-3 justify-center items-center">
        <h4 className="text-2xl font-bold sm:text-3xl bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          FAQ
        </h4>
        <p className="max-w-xl text-muted-foreground text-center">
          Veja as perguntas mais frequentes sobre o Marcaê.
        </p>
      </div>
      <div className="max-w-screen-xl w-full">
        <div className="max-w-lg mx-auto w-full">
          <Accordion
            fullWidth
            selectionMode="multiple"
            variant="splitted"
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.25,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
          >
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={index}
                aria-label={item.title}
                title={item.title}
                className="text-muted-foreground"
              >
                {item.content}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </motion.section>
  );
}