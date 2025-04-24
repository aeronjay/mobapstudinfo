import React, { useState } from 'react';
import { schedule, courses } from '../utils/mockData';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const day = schedule[selectedDay];
  const handlePrevDay = () => {
    setSelectedDay(prev => prev === 0 ? schedule.length - 1 : prev - 1);
  };
  const handleNextDay = () => {
    setSelectedDay(prev => prev === schedule.length - 1 ? 0 : prev + 1);
  };
  return <div className="py-4">
      {/* Day selector */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePrevDay} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <ChevronLeftIcon size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {day.day}
        </h2>
        <button onClick={handleNextDay} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <ChevronRightIcon size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      {/* Schedule */}
      <div className="space-y-4">
        {day.periods.map((period, index) => {
        const course = courses.find(c => c.id === period.courseId);
        return <div key={index} className="flex">
              {/* Time */}
              <div className="w-24 pr-4 flex flex-col items-center">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {period.time.split(' - ')[0]}
                </div>
                <div className="h-full border-r-2 border-gray-300 dark:border-gray-700 mx-2"></div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {period.time.split(' - ')[1]}
                </div>
              </div>
              {/* Class */}
              <div className={`flex-1 rounded-lg p-4 ${course?.color} bg-opacity-20 dark:bg-opacity-30`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    {course?.name}
                  </h3>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {course?.room}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {course?.teacher}
                </p>
              </div>
            </div>;
      })}
      </div>
      {/* Weekly overview */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Weekly Overview
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {schedule.map((day, index) => <button key={index} onClick={() => setSelectedDay(index)} className={`p-2 rounded-lg text-center ${selectedDay === index ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}>
              <span className="text-xs">{day.day.substring(0, 3)}</span>
            </button>)}
        </div>
      </div>
    </div>;
};
export default Schedule;