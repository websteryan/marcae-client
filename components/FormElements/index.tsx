// src/pages/[estabelecimentoId].tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase/firebase';
import { Loading, Button, Text } from '@nextui-org/react';
import ServiceCard from '@/components/ServiceCard';
import AppointmentModal from '@/components/AppointmentModal';
import { getServices } from '@/firebase/firebaseUtils';

const ServicosPage = () => {
  const [servicos, setServicos] = useState<any[]>([]);
  const [selectedServico, setSelectedServico] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const estabelecimentoId = router.query.estabelecimentoId as string;

  useEffect(() => {
    const fetchServicos = async () => {
      setLoading(true);
      try {
        const services = await getServices(estabelecimentoId);
        setServicos(services);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServicos();
  }, [estabelecimentoId]);

  const handleSelectServico = (servico: any) => {
    setSelectedServico(servico);
    setShowModal(true);
  };

  const handleAgendar = async (values: any) => {
    if (!selectedServico) return;

    // Adiciona o agendamento no Firestore
    try {
      const agendamentoData = {
        ...values,
        servico: selectedServico.nome,
        preco: selectedServico.preco,
        duracao: selectedServico.duracao,
        estabelecimentoId,
        data: new Date(),
      };
      // Salvar no Firestore (utilize sua função de salvar aqui)

      console.log("Agendamento criado com sucesso:", agendamentoData);

      setShowModal(false); // Fechar o modal após o agendamento ser criado
    } catch (error) {
      console.error("Erro ao agendar:", error);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Serviços Disponíveis</h2>

      {loading ? (
        <Loading type="spinner" size="lg" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicos.map((servico) => (
            <ServiceCard
              key={servico.id}
              nome={servico.nome}
              preco={servico.preco}
              duracao={servico.duracao}
              onSelect={() => handleSelectServico(servico)}
            />
          ))}
        </div>
      )}

      <AppointmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleAgendar}
        servico={selectedServico}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    </div>
  );
};

export default ServicosPage;