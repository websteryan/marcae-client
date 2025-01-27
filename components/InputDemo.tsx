import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateTime } from 'luxon';

interface DatePickerDemoProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  maxDate: Date;
  minDate: Date;
}

export const DatePickerDemo: React.FC<DatePickerDemoProps> = ({
  selectedDate,
  setSelectedDate,
  maxDate,
  minDate,
}) => {
  // Converta minDate e maxDate para o fuso horário local
  const minLocalDate = DateTime.fromJSDate(minDate).toLocal().toJSDate();
  const maxLocalDate = DateTime.fromJSDate(maxDate).toLocal().toJSDate();

  return (
    <DatePicker
      showIcon
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      minDate={minLocalDate}
      maxDate={maxLocalDate}
    />
  );
};