import { doc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { DateTime } from 'luxon';

// Interface para representar os horários
export interface Horario {
  horario: string;
  indisponivel: boolean;
}

// Função para obter horários disponíveis
const getHorariosDisponiveis = async (
  estabelecimentoId: string,
  formattedDate: string,
  duracaoServico: number // Duração do serviço em minutos
): Promise<Horario[]> => {
  try {
    console.log("Iniciando a busca de horários disponíveis...");

    // Obtém os dados do estabelecimento
    const docRef = doc(db, 'estabelecimentos', estabelecimentoId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error(`Estabelecimento com ID ${estabelecimentoId} não encontrado.`);
      return [];
    }

    const estabelecimentoData = docSnap.data();
    const horariosFuncionamento = estabelecimentoData?.horarios;
    const timeZone = estabelecimentoData?.timezone; // Fuso horário do estabelecimento
    if (!horariosFuncionamento || !timeZone) {
      console.error('Horários de funcionamento ou fuso horário não encontrados.');
      return [];
    }

    console.log('Horários de funcionamento encontrados:', horariosFuncionamento);
    console.log('Fuso horário do estabelecimento:', timeZone);

    // Converte a data recebida para o fuso horário do estabelecimento
    const diaSemana = DateTime.fromISO(formattedDate)
      .setZone(timeZone)
      .setLocale('pt-BR')
      .toFormat('cccc')
      .toLowerCase();

    const { abertura, fechamento, pausaAlmocoInicio, pausaAlmocoFim } = horariosFuncionamento[diaSemana] || {};
    if (!abertura || !fechamento) {
      console.error(`Horários não configurados para ${diaSemana}.`);
      return [];
    }

    // Converte horários para objetos Date
    const aberturaDate = DateTime.fromISO(`${formattedDate}T${abertura}:00`, { zone: timeZone }).toJSDate();
    const fechamentoDate = DateTime.fromISO(`${formattedDate}T${fechamento}:00`, { zone: timeZone }).toJSDate();
    const pausaAlmocoInicioDate = pausaAlmocoInicio
      ? DateTime.fromISO(`${formattedDate}T${pausaAlmocoInicio}:00`, { zone: timeZone }).toJSDate()
      : null;
    const pausaAlmocoFimDate = pausaAlmocoFim
      ? DateTime.fromISO(`${formattedDate}T${pausaAlmocoFim}:00`, { zone: timeZone }).toJSDate()
      : null;

    let horarios: Horario[] = [];
    let horarioAtual = new Date(aberturaDate);

    // Função para verificar conflitos de horários com agendamentos existentes
    const checkAgendamentosExistentes = async (): Promise<string[]> => {
      const agendamentosRef = collection(db, `estabelecimentos/${estabelecimentoId}/agendamentos`);
      const q = query(agendamentosRef, where('data', '==', formattedDate));
      const querySnapshot = await getDocs(q);

      const horariosOcupados: string[] = [];
      querySnapshot.forEach((doc) => {
        const agendamento = doc.data();
        if (agendamento.horario) {
          horariosOcupados.push(agendamento.horario); // Adiciona o horário ocupado (ex.: "08:00")
        }
      });

      return horariosOcupados;
    };

    // Obtém horários ocupados no Firestore
    const horariosOcupados = await checkAgendamentosExistentes();
    console.log("Horários ocupados encontrados:", horariosOcupados);

    // Geração da lista de horários disponíveis
    while (horarioAtual < fechamentoDate) {
      const horarioStr = DateTime.fromJSDate(horarioAtual).setZone(timeZone).toFormat('HH:mm');

      // Ignora horários dentro do intervalo de almoço
      if (
        pausaAlmocoInicioDate &&
        pausaAlmocoFimDate &&
        horarioAtual >= pausaAlmocoInicioDate &&
        horarioAtual < pausaAlmocoFimDate
      ) {
        horarioAtual = new Date(horarioAtual.getTime() + 30 * 60 * 1000); // Incrementa 30 minutos
        continue;
      }

      // Verifica se o horário está ocupado
      const indisponivel = horariosOcupados.includes(horarioStr);

      horarios.push({ horario: horarioStr, indisponivel });

      horarioAtual = new Date(horarioAtual.getTime() + 30 * 60 * 1000); // Incrementa 30 minutos
    }

    console.log("Horários disponíveis:", horarios);
    return horarios;
  } catch (error) {
    console.error('Erro ao buscar horários:', error);
    return [];
  }
};

export default getHorariosDisponiveis;