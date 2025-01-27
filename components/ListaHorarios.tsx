import React, { useState, useEffect } from 'react';
import getHorariosDisponiveis, { Horario } from '../utils/scheduleManager';

interface ListaHorariosProps {
  estabelecimentoId: string;
  dataSelecionada: string; // Formato ISO, ex: "2025-01-28"
  duracaoServico: number; // Duração do serviço em minutos
}

const ListaHorarios: React.FC<ListaHorariosProps> = ({ estabelecimentoId, dataSelecionada, duracaoServico }) => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarHorarios = async () => {
      setCarregando(true);
      const horariosDisponiveis = await getHorariosDisponiveis(estabelecimentoId, dataSelecionada, duracaoServico);
      setHorarios(horariosDisponiveis);
      setCarregando(false);
    };

    if (estabelecimentoId && dataSelecionada) {
      carregarHorarios();
    }
  }, [estabelecimentoId, dataSelecionada, duracaoServico]);

  if (carregando) {
    return <p>Carregando horários...</p>;
  }

  if (horarios.length === 0) {
    return <p>Não há horários disponíveis para esta data.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {horarios.map(({ horario, indisponivel }, index) => (
        <button
          key={index}
          className={`p-2 rounded-lg text-center ${
            indisponivel
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
          disabled={indisponivel}
        >
          {horario}
        </button>
      ))}
    </div>
  );
};

export default ListaHorarios;