import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "./firebase"; // Importe sua instância do Firebase

// Função para criar a estrutura no Firestore com a estrutura correta
export const criarEstruturaFirestore = async () => {
  try {
    const estabelecimentoId = "salon123"; // ID do estabelecimento
    const estabelecimentoRef = doc(db, "estabelecimentos", estabelecimentoId);

    // Criação de dados do Estabelecimento
    await setDoc(estabelecimentoRef, {
      nome: "Salão Beleza e Estilo",
      descricao: "Corte de cabelo, manicure e outros serviços de beleza.",
      endereco: "Rua das Flores, 123",
      telefone: "+55 11 1234-5678",
      telefone2: "+55 11 8765-4321"
    });

    console.log("Dados do estabelecimento criados com sucesso!");

    // Criação de horários dentro da subcoleção "horarios"
    const horariosRef = collection(db, `estabelecimentos/${estabelecimentoId}/horarios`);
    const horarios = [
      { data: "2025-01-19", horario: "10:00", indisponivel: false },
      { data: "2025-01-19", horario: "11:00", indisponivel: true },
      { data: "2025-01-19", horario: "14:00", indisponivel: false },
      { data: "2025-01-19", horario: "15:00", indisponivel: false }
    ];

    for (const horario of horarios) {
      const horarioRef = doc(horariosRef); // Cria um novo documento para cada horário
      await setDoc(horarioRef, horario);
    }

    console.log("Horários criados com sucesso!");
    
  } catch (error) {
    console.error("Erro ao criar estrutura:", error);
  }
};

// Chame a função para criar a estrutura no Firestore
criarEstruturaFirestore();