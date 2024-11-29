import React from 'react';
import Window from './Window';

const Calendar = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  return (
    <Window title="Calendar">
      <div className="grid grid-cols-7 gap-1">
        <div className="font-bold">Sun</div>
        <div className="font-bold">Mon</div>
        <div className="font-bold">Tue</div>
        <div className="font-bold">Wed</div>
        <div className="font-bold">Thu</div>
        <div className="font-bold">Fri</div>
        <div className="font-bold">Sat</div>

        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={index} className="bg-gray-200"></div>
        ))}

        {days.map((day) => (
          <div key={day} className="text-center p-2">
            {day}
          </div>
        ))}
      </div>
    </Window>
  );
};

export default Calendar;
