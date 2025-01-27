import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

// Tipagem para os dados do agendamento
export interface Agendamento {
  nome: string;
  email: string;
  telefone: string;
}

export const adicionarAgendamento = async (
  estabelecimentoId: string,
  dadosUsuario: Agendamento,
  servicoId: string,
  horario: string,
  data: string
): Promise<void> => {
  try {
    const agendamentoRef = collection(
      db,
      "estabelecimentos",
      estabelecimentoId,
      "agendamentos"
    );

    const agendamentoDocRef = doc(agendamentoRef, `${data}_${horario}`);
    const agendamentoSnapshot = await getDoc(agendamentoDocRef);

    if (agendamentoSnapshot.exists()) {
      throw new Error("Este horário já está reservado. Por favor, escolha outro horário.");
    }

    await setDoc(agendamentoDocRef, {
      ...dadosUsuario,
      servicoId,
      data,
      horario,
      criadoEm: new Date().toISOString(),
    });

    console.log("Agendamento adicionado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar agendamento:", error);
    throw error;
  }
};