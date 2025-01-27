"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ServiceCard from '@/components/ServiceCard';
import AppointmentModal from '@/components/AppointmentModal';
import { adicionarAgendamento } from '@/firebase/firebaseUtils';

const ServicosPage = () => {
  const [servicos, setServicos] = useState<any[]>([]);
  const [selectedServico, setSelectedServico] = useState<any | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({ name: '', email: '', phone: '' });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const { estabelecimentoId } = useParams();
  const estabelecimentoIdStr = Array.isArray(estabelecimentoId) ? estabelecimentoId[0] : estabelecimentoId;

  if (!estabelecimentoIdStr) {
    return <div>Erro: Estabelecimento não encontrado</div>;
  }

  const fetchServicos = async () => {
    if (!estabelecimentoIdStr) return;

    try {
      setLoading(true);
      const servicosCollectionRef = collection(db, `estabelecimentos/${estabelecimentoIdStr}/servicos`);
      const querySnapshot = await getDocs(servicosCollectionRef);

      const fetchedServicos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setServicos(fetchedServicos);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      alert('Erro ao carregar os serviços. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, [estabelecimentoIdStr]);

  const handleSelectServico = (servico: any) => {
    setSelectedServico(servico);
    setShowModal(true);
  };

  const handleAgendar = async (values: any) => {
    if (!selectedServico || !selectedDate || !selectedTime || !isAvailable) return;

    try {
      const date = selectedDate.toISOString().split('T')[0];
      await adicionarAgendamento(estabelecimentoIdStr, values, selectedServico, selectedTime, date);
      setShowModal(false);
      alert('Agendamento realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao agendar:', error);
      alert('Erro ao realizar o agendamento, tente novamente.');
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">Serviços Disponíveis</h2>

      {loading ? (
        <div className="spinner">Carregando serviços...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 align-middle justify-center">
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

      {selectedServico && (
        <AppointmentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleAgendar}
          servico={selectedServico}
          formValues={formValues}
          setFormValues={setFormValues}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate} // Garantindo que setSelectedDate seja passado corretamente
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          isAvailable={isAvailable}
          loadingAvailability={loadingAvailability}
          estabelecimentoId={estabelecimentoIdStr}
        />
      )}
    </div>
  );
};

export default ServicosPage;