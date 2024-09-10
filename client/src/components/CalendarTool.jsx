import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../src/index.css'


const CalendarTool = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(true);

  const onChange = newDate => {
    setDate(newDate);
    setShowCalendar(false);
  };

  // Format the date to 'dd/MM/yyyy' format
  const formattedDate = date.toLocaleDateString('en-GB');

  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  const handleHideCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <div className='relative font-app w-[450px] text-center m-auto'>
      <button onClick={handleShowCalendar}>Show</button>
      <button onClick={handleHideCalendar}>Hide</button>
      {showCalendar && <Calendar onChange={onChange} value={date} />}
      <p>Selected Date: {formattedDate}</p>
    </div>
  );
};

export default CalendarTool;