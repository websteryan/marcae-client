import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateTime } from 'luxon';

interface DatePickerDemoProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export const DatePickerDemo: React.FC<DatePickerDemoProps> = ({
  selectedDate,
  setSelectedDate,

}) => {
  // Converta minDate e maxDate para o fuso horário local
  
  return (
    <DatePicker
      showIcon
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
    />
  );
};