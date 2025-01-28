import { useState, useEffect } from "react";
import Modal from "react-modal";
import { ChevronLeft, X, Check, Plus } from "lucide-react"; // Ícones de Check e Plus
import getHorariosDisponiveis, { Horario } from "@/utils/scheduleManager";
import DateSelector from "./DateSelector";


const AppointmentModal = ({
  isOpen,
  onClose,
  onConfirm,
  servicos,
  selectedServico,
  setSelectedServico,
  formValues,
  setFormValues,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  estabelecimentoId,
}: any) => {
  const [step, setStep] = useState(1);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedServicos, setSelectedServicos] = useState<any[]>([]);

  const nextStep = () => {
    if (step === 3) {
      // Verifica se os campos nome e telefone estão preenchidos
      if (!formValues.name || !formValues.phone) {
        alert('Por favor, preencha seu nome e telefone para continuar.');
        return; // Impede de avançar
      }
    }
    setStep(step + 1);
  };
  const prevStep = () => (step > 1 ? setStep(step - 1) : onClose()); // Fecha o modal no primeiro passo

  const handleServicoSelect = (servico: any) => {
    const isAlreadySelected = selectedServicos.some((item) => item.id === servico.id);
    if (isAlreadySelected) {
      // Se já foi selecionado, removemos da lista
      setSelectedServicos(selectedServicos.filter((item) => item.id !== servico.id));
    } else {
      // Caso contrário, adicionamos à lista
      setSelectedServicos([...selectedServicos, servico]);
    }
  };

  const handleConfirm = () => {
    const appointmentData = {
      ...formValues,
      servicos: selectedServicos,
      time: selectedTime,
    };
    onConfirm(appointmentData);
  };

  // Função para buscar horários disponíveis ao mudar a data
  useEffect(() => {
    const fetchHorarios = async () => {
      if (!selectedDate || selectedServicos.length === 0) return;
      setIsLoading(true);
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const horariosDisponiveis = await getHorariosDisponiveis(
        estabelecimentoId,
        formattedDate,
        selectedServicos.reduce((acc, servico) => acc + servico.duracao, 0) // Soma as durações dos serviços
      );
      setHorarios(horariosDisponiveis);
      setIsLoading(false);
    };

    fetchHorarios();
  }, [selectedDate, selectedServicos, estabelecimentoId]);

  // Função para resetar o estado ao fechar o modal
  const resetModalState = () => {
    setStep(1);
    setSelectedServicos([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormValues({
      name: "",
      phone: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        resetModalState();
        onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="w-full h-full flex flex-col relative">
        {/* Cabeçalho com botão de voltar ou fechar */}
        <div className="p-4 bg-white flex items-center">
          <button onClick={prevStep} className="text-gray-700 hover:text-gray-900">
            {step > 1 ? <ChevronLeft size={24} /> : <X size={24} />}
          </button>
        </div>

        {/* Conteúdo do modal */}
        <div className="flex-1 overflow-y-auto p-7 pt-0">
          {step === 1 && (
            <div className="h-full flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">Selecionar serviços</h2>
              <div className="flex flex-col pt-5 sm:grid sm:grid-cols-2 gap-4 overflow-y-auto flex-grow">
                {servicos.map((servico: any) => (
                  <div
                    key={servico.id}
                    className={`p-4 border-b border-gray-300 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out
                      ${selectedServicos.some((item) => item.id === servico.id) ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}
                    `}
                  >
                    <div className="flex-1 flex justify-between items-center">
                      <div className="flex-1">
                        <h2 className="font-medium text-lg">{servico.nome}</h2>
                        <div className="text-sm text-gray-600">
                          <p>{servico.duracao >= 60 ? `${Math.floor(servico.duracao / 60)}h` : `${servico.duracao} min`}</p>
                          <p className="text-sm">R$ {servico.preco}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleServicoSelect(servico)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full transition duration-200
                          ${selectedServicos.some((item) => item.id === servico.id)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                          }`}
                      >
                        {selectedServicos.some((item) => item.id === servico.id) ? <Check size={16} /> : <Plus size={16} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {selectedServicos.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
                  <button
                    onClick={nextStep}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                  >
                    Próximo
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Escolha a Data e Hora</h2>
              <DateSelector
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              {isLoading ? (
                <p>Carregando horários...</p>
              ) : (
                <div className="flex-box  mt-6">
                  {horarios
                  .filter(({ indisponivel }) => !indisponivel) // Filtra os horários disponíveis
                  .map(({ horario }) => (
                    <button
                      key={horario}
                      onClick={() => setSelectedTime(horario)}
                      className={`p-4 w-full m-0 border-b-1 text-left flex items-center font-medium text-lg ${
                        horario === selectedTime
                          ? "bg-white text-blue-500" // Muda a cor do texto quando selecionado
                          : "bg-white text-black"
                      }`}
                    >
                      {horario}
                      {horario === selectedTime && (
                        <Check className="ml-auto text-blue-500" size={16} />
                      )}
                    </button>
                  ))}
              </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Informações de Contato</h2>
              <input
                type="text"
                placeholder="Nome"
                value={formValues.name || ""}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                className="w-full border p-2 mb-4"
                required
              />
              <input
                type="tel"
                placeholder="Telefone"
                value={formValues.phone || ""}
                onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                className="w-full border p-2 mb-4"
                required
              />
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Resumo do Agendamento</h2>
              <div className="mb-4">
                <p><strong>Serviços:</strong> {selectedServicos.map((servico) => servico.nome).join(', ')}</p>
                <p><strong>Data:</strong> {selectedDate?.toLocaleDateString()}</p>
                <p><strong>Hora:</strong> {selectedTime}</p>
                <p><strong>Nome:</strong> {formValues.name}</p>
                <p><strong>Telefone:</strong> {formValues.phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Botão fixo inferior */}
        {step !== 1 && (
          <div className="p-3 border-t justify-center flex">
            {step === 4 ? (
              <button
                onClick={handleConfirm}
                className="w-3/4 bg-blue-600 text-white py-2 border rounded-xl"
              >
                Confirmar Agendamento
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="w-2/4 bg-blue-600 text-white py-2 border rounded-xl font-semibold text-lg"
              >
                Continuar
              </button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AppointmentModal;