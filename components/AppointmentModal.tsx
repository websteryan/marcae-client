import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { format, parse } from 'date-fns';
import { DatePickerDemo } from './InputDemo'; // Componente do DatePicker
import getHorariosDisponiveis, {  Horario } from '../utils/scheduleManager'; // Função de horários
import { DateTime } from 'luxon';

const customStyles = {
  content: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formValues: any) => void;
  servico: { nome: string; duracao: number };
  formValues: { name: string; email: string; phone: string };
  setFormValues: React.Dispatch<React.SetStateAction<{ name: string; email: string; phone: string }>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedTime: string | null;
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
  isAvailable: boolean;
  loadingAvailability: boolean;
  estabelecimentoId: string;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  servico,
  formValues,
  setFormValues,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  isAvailable,
  loadingAvailability,
  estabelecimentoId,
}) => {
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      const formattedDate = DateTime.fromJSDate(selectedDate).toFormat('yyyy-MM-dd');

      getHorariosDisponiveis(estabelecimentoId, formattedDate, servico.duracao)
        .then((horarios: Horario[]) => {
          const horariosFiltrados = horarios.filter((horario) => {
            const [hora, minuto] = horario.horario.split(':').map(Number);
            const horarioFormatado = new Date(selectedDate);
            horarioFormatado.setHours(hora, minuto, 0);

            const abertura = parse('07:00', 'HH:mm', new Date(selectedDate));
            const fechamento = parse('18:00', 'HH:mm', new Date(selectedDate));
            const pausaAlmocoInicio = parse('12:00', 'HH:mm', new Date(selectedDate));
            const pausaAlmocoFim = parse('13:00', 'HH:mm', new Date(selectedDate));

            return (
              horarioFormatado >= abertura &&
              horarioFormatado <= fechamento &&
              !(horarioFormatado >= pausaAlmocoInicio && horarioFormatado < pausaAlmocoFim)
            );
          });

          setHorariosDisponiveis(horariosFiltrados);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao obter os horários:', error);
          setLoading(false);
        });
    }
  }, [selectedDate, estabelecimentoId, servico.duracao]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, ''); // Remove caracteres não numéricos
      const formattedPhone = formatPhone(cleaned); // Aplica a máscara visual
      setFormValues({ ...formValues, [name]: cleaned }); // Armazena o valor sem máscara
      e.target.value = formattedPhone; // Exibe o valor com a máscara
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTime && selectedDate) {
      onConfirm(formValues);
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  };

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 14);

  const formatPhone = (phone: string) => {
    // Remove caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '');
  
    // Aplica a máscara
    if (cleaned.length <= 2) {
      return `(${cleaned}`;
    }
    if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  };
  

  return (
      <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false} className="appointment-modal" style={customStyles}>
      <h2>Agendar {servico?.nome}</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <label>
          Nome Completo:
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleFormChange}
            placeholder='John Doe'
            required
            className="input-field"
          />
        </label>
        <label>
          E-mail:
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleFormChange}
            className="input-field"
          />
        </label>
        <label>
          Telefone:
          <input
            type="tel"
            name="phone"
            value={formatPhone(formValues.phone)}
            onChange={handleFormChange}
            required
            className="input-field"
          />
        </label>
        <label>
          Data:
          <DatePickerDemo
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            minDate={today}
            maxDate={maxDate}
          />
        </label>

        <div>
          <h3>Selecione o horário:</h3>
          {loading || loadingAvailability ? (
            <p>Carregando horários...</p>
          ) : (
            <div className="time-buttons">
              {horariosDisponiveis.length > 0 ? (
                horariosDisponiveis.map((horario, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleTimeSelect(horario.horario)}
                    disabled={horario.indisponivel || selectedTime === horario.horario}
                    className={`time-button ${horario.indisponivel ? 'disabled' : ''} ${selectedTime === horario.horario ? 'selected' : ''}`}
                  >
                    {horario.horario}
                  </button>
                ))
              ) : (
                <p>Não há horários disponíveis para esta data.</p>
              )}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !isAvailable || !selectedTime}
          className="submit-button"
        >
          Agendar
        </button>
      </form>
    </Modal>
  );
};

export default AppointmentModal;
