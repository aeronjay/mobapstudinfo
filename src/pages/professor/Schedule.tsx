import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { professorClasses } from '../../utils/professorMockData';

const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '8:00 - 9:30',
    '9:45 - 11:15',
    '11:30 - 13:00',
    '14:00 - 15:30',
    '15:45 - 17:15'
  ];

  // Get classes for the selected day
  const getDayClasses = (day: string) => {
    return professorClasses.filter(class_ =>
      class_.schedule.some(s => s.day === day)
    );
  };

  // Get class at specific time slot
  const getClassAtTime = (day: string, time: string) => {
    return professorClasses.find(class_ =>
      class_.schedule.some(s => s.day === day && s.time === time)
    );
  };

  return (
    <div className="py-4">
      {/* Day selector */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setSelectedDay(prev => (prev === 0 ? days.length - 1 : prev - 1))}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronLeftIcon size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {days[selectedDay]}
        </h2>
        <button
          onClick={() => setSelectedDay(prev => (prev === days.length - 1 ? 0 : prev + 1))}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronRightIcon size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Time slots grid */}
      <div className="space-y-4">
        {timeSlots.map((timeSlot) => {
          const classAtTime = getClassAtTime(days[selectedDay], timeSlot);
          return (
            <div key={timeSlot} className="flex">
              {/* Time */}
              <div className="w-24 pr-4 flex flex-col items-center">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {timeSlot.split(' - ')[0]}
                </div>
                <div className="h-full border-r-2 border-gray-300 dark:border-gray-700 mx-2"></div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {timeSlot.split(' - ')[1]}
                </div>
              </div>
              {/* Class slot */}
              {classAtTime ? (
                <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {classAtTime.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {classAtTime.code} • {classAtTime.room}
                      </p>
                    </div>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      {classAtTime.enrolledStudents} students
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex-1 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Available
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Weekly overview */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Weekly Overview
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {days.map((day, index) => {
            const dayClasses = getDayClasses(day);
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(index)}
                className={`p-2 rounded-lg text-center ${
                  selectedDay === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }`}
              >
                <span className="text-xs block">{day.substring(0, 3)}</span>
                <span className="text-xs mt-1 block">
                  {dayClasses.length} classes
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's classes summary */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Classes on {days[selectedDay]}
        </h3>
        <div className="space-y-3">
          {getDayClasses(days[selectedDay]).map((class_) => (
            <div
              key={class_.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {class_.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {class_.schedule
                    .filter((s) => s.day === days[selectedDay])
                    .map((s) => s.time)
                    .join(', ')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {class_.room}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {class_.enrolledStudents} students
                </p>
              </div>
            </div>
          ))}
          {getDayClasses(days[selectedDay]).length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-400 py-4">
              No classes scheduled for this day
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;