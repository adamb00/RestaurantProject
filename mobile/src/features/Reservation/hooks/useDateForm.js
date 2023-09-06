import { useState } from 'react';

export const useDateForm = () => {
   const [selectedDate, setSelectedDate] = useState(null);

   const onDateChange = (e, selectedDate) => {
      const currentDate = new Date(selectedDate);
      setSelectedDate(currentDate);
   };

   return { selectedDate, onDateChange, setSelectedDate };
};
