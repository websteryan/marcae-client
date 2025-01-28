"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import ServiceCard from "@/components/estabelecimentoComponents/ServiceCard";
import AppointmentModal from "@/components/estabelecimentoComponents/AppointmentModal";
import { adicionarAgendamento } from "@/firebase/firebaseUtils";

const ServicosPage = () => {
  const [servicos, setServicos] = useState<any[]>([]);
  const [selectedServico, setSelectedServico] = useState<any | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({ name: "", email: "", phone: "" });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [estabelecimentoInfo, setEstabelecimentoInfo] = useState<any | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  const { estabelecimentoId } = useParams();
  const estabelecimentoIdStr = Array.isArray(estabelecimentoId) ? estabelecimentoId[0] : estabelecimentoId || "";

  useEffect(() => {
    if (!estabelecimentoIdStr) return;

    // Função para buscar o banner do estabelecimento
    const fetchBanner = async () => {
      const docRef = doc(db, "estabelecimentos", estabelecimentoIdStr);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBannerUrl(docSnap.data()?.bannerUrl || null);
      }
    };

    // Função para buscar as informações do estabelecimento
    const fetchInfo = async () => {
      try {
        const infosRef = collection(db, "estabelecimentos");
        const docSnapshot = await getDocs(infosRef);
        const data = docSnapshot.docs.find((doc) => doc.id === estabelecimentoIdStr)?.data();
        setEstabelecimentoInfo(data);
      } catch (error) {
        console.error("Erro ao buscar informações do estabelecimento:", error);
      }
    };

    // Função para buscar os serviços do estabelecimento
    const fetchServicos = async () => {
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
        console.error("Erro ao buscar serviços:", error);
        alert("Erro ao carregar os serviços. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    // Executa as funções de busca
    fetchBanner();
    fetchInfo();
    fetchServicos();
  }, [estabelecimentoIdStr]);

  const handleAgendar = async (values: any) => {
    if (!selectedServico || !selectedDate || !selectedTime || !estabelecimentoIdStr) return;

    try {
      const date = selectedDate.toISOString().split("T")[0];
      await adicionarAgendamento(estabelecimentoIdStr, values, selectedServico, selectedTime, date);
      setShowModal(false);
      alert("Agendamento realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao agendar:", error);
      alert("Erro ao realizar o agendamento, tente novamente.");
    }
  };

  const isOpenNow = () => {
    if (!estabelecimentoInfo?.horarios) return false;

    const now = new Date();
    const dayOfWeek = now.toLocaleString("pt-BR", { weekday: "long" }).toLowerCase();

    const horarioHoje = estabelecimentoInfo.horarios[dayOfWeek];

    if (!horarioHoje || !horarioHoje.abertura || !horarioHoje.fechamento) {
      return false;
    }

    const [aberturaHora, aberturaMinuto] = horarioHoje.abertura.split(":").map(Number);
    const [fechamentoHora, fechamentoMinuto] = horarioHoje.fechamento.split(":").map(Number);

    const horarioAbertura = new Date();
    horarioAbertura.setHours(aberturaHora, aberturaMinuto, 0, 0);

    const horarioFechamento = new Date();
    horarioFechamento.setHours(fechamentoHora, fechamentoMinuto, 0, 0);

    if (horarioFechamento <= horarioAbertura) {
      if (now >= horarioAbertura) {
        return true;
      }
      horarioFechamento.setDate(horarioFechamento.getDate() + 1);
    }

    return now >= horarioAbertura && now < horarioFechamento;
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {estabelecimentoInfo && (
            <div className="mb-6">
              {bannerUrl ? (
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={bannerUrl}
                    alt="Banner do estabelecimento"
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="relative h-48 bg-gray-300 rounded-lg overflow-hidden">
                  <p className="text-center text-white">Banner não disponível</p>
                </div>
              )}
              <div className="mt-4">
                <h1 className="text-xl font-bold">{estabelecimentoInfo.nome}</h1>
                <p className="text-gray-600">{estabelecimentoInfo.endereco}</p>
                <p className={isOpenNow() ? "text-green-600" : "text-red-600"}>
                  {isOpenNow() ? "Aberto agora" : "Fechado"}
                </p>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold mb-4">Serviços</h2>
            <div className="grid grid-cols-1 gap-4">
              {servicos.map((servico) => (
                <ServiceCard
                  key={servico.id}
                  nome={servico.nome}
                  preco={servico.preco}
                  duracao={servico.duracao}
                  onSelect={() => setSelectedServico(servico)}
                />
              ))}
            </div>
          </div>

          <div className="fixed bottom-4 left-0 right-0 px-4">
            <button
              className="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-lg shadow-md"
              onClick={() => setShowModal(true)}
            >
              Agendar agora
            </button>
          </div>

          {showModal && (
            <AppointmentModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={handleAgendar}
              servicos={servicos}
              selectedServico={selectedServico}
              setSelectedServico={setSelectedServico}
              formValues={formValues}
              setFormValues={setFormValues}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              estabelecimentoId={estabelecimentoIdStr}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ServicosPage;