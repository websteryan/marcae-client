import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { ptBR } from 'date-fns/locale';

interface DateSelectorProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, setSelectedDate }) => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const handleNextWeek = () => {
    setStartDate(addDays(startDate, 4));
  };

  const handlePrevWeek = () => {
    setStartDate(subDays(startDate, 4));
  };

  const generateWeekDays = () => {
    return Array.from({ length: 4 }, (_, i) => addDays(startDate, i));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-4">
        <button onClick={handlePrevWeek} className="p-2 rounded-full hover:bg-gray-300">
          {"<"}
        </button>
        <h2 className="text-lg font-semibold">{format(startDate, "MMMM yyyy", { locale: ptBR })}</h2>
        <button onClick={handleNextWeek} className="p-2 rounded-full hover:bg-gray-300">
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {generateWeekDays().map((date) => (
          <div key={date.toISOString()} className="flex flex-col items-center">
            <button
              onClick={() => setSelectedDate(date)}
              className={`p-4 w-16 h-16 rounded-full border flex items-center justify-center ${
                date.toDateString() === selectedDate?.toDateString()
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              <span className="text-lg font-bold">{format(date, "dd", { locale: ptBR })}</span>
            </button>
            <span className="text-sm mt-2">
              {/* Nome do dia abreviado */}
              {format(date, "EEEEEE", { locale: ptBR }).toLowerCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateSelector;
