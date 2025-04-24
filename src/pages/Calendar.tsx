import React, { useState } from 'react';
import { events } from '../utils/mockData';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from 'lucide-react';
const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthName = currentMonth.toLocaleDateString('en-US', {
    month: 'long'
  });
  const year = currentMonth.getFullYear();
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  // Create calendar grid
  const calendarDays = [];
  // Add empty cells for days before the first of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  // Check if a date has events
  const getEventsForDate = (day: number) => {
    const date = new Date(year, currentMonth.getMonth(), day);
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };
  return <div className="py-4">
      {/* Month selector */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <ChevronLeftIcon size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {monthName} {year}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <ChevronRightIcon size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      {/* Calendar grid */}
      <div className="mb-6">
        {/* Day names */}
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400">
              {day}
            </div>)}
        </div>
        {/* Calendar cells */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-12 bg-gray-50 dark:bg-gray-900 rounded"></div>;
          }
          const dateEvents = getEventsForDate(day);
          const isToday = new Date().toDateString() === new Date(year, currentMonth.getMonth(), day).toDateString();
          const hasEvents = dateEvents.length > 0;
          return <div key={`day-${day}`} className={`h-12 rounded flex flex-col items-center justify-center ${isToday ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100' : 'bg-white dark:bg-gray-800'}`}>
                <span className={`text-sm ${isToday ? 'font-bold' : 'font-medium text-gray-800 dark:text-white'}`}>
                  {day}
                </span>
                {hasEvents && <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-0.5"></div>}
              </div>;
        })}
        </div>
      </div>
      {/* Upcoming events */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Upcoming Events
      </h3>
      <div className="space-y-4">
        {events.map(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
        return <div key={event.id} className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg mr-3">
                <CalendarIcon size={20} className="text-purple-800 dark:text-purple-100" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 dark:text-white">
                  {event.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formattedDate} • {event.time}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {event.location}
                </p>
              </div>
            </div>;
      })}
      </div>
    </div>;
};
export default Calendar;