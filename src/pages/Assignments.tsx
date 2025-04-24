import React, { useState } from 'react';
import { assignments, courses } from '../utils/mockData';
import { CheckIcon, ClockIcon } from 'lucide-react';
const Assignments: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });
  // Group assignments by due date
  const groupedAssignments: Record<string, typeof assignments> = {};
  filteredAssignments.forEach(assignment => {
    const dueDate = new Date(assignment.dueDate);
    const formattedDate = dueDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    if (!groupedAssignments[formattedDate]) {
      groupedAssignments[formattedDate] = [];
    }
    groupedAssignments[formattedDate].push(assignment);
  });
  // Sort dates
  const sortedDates = Object.keys(groupedAssignments).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  return <div className="py-4">
      {/* Filter tabs */}
      <div className="flex mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[{
        value: 'all',
        label: 'All'
      }, {
        value: 'pending',
        label: 'Pending'
      }, {
        value: 'completed',
        label: 'Completed'
      }].map(tab => <button key={tab.value} className={`flex-1 py-2 rounded-md text-sm font-medium ${filter === tab.value ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-600 dark:text-gray-400'}`} onClick={() => setFilter(tab.value as any)}>
            {tab.label}
          </button>)}
      </div>
      {/* Assignments list */}
      {sortedDates.length > 0 ? sortedDates.map(date => <div key={date} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              {date}
            </h3>
            <div className="space-y-3">
              {groupedAssignments[date].map(assignment => {
          const course = courses.find(c => c.id === assignment.courseId);
          return <div key={assignment.id} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${course?.color}`}>
                      <span className="text-white font-bold">
                        {course?.name.substring(0, 1)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        {assignment.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {course?.name}
                      </p>
                    </div>
                    <div>
                      {assignment.status === 'pending' ? <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                          <ClockIcon size={16} className="mr-1" />
                          <span className="text-xs">Pending</span>
                        </div> : <div className="flex items-center text-green-600 dark:text-green-400">
                          <CheckIcon size={16} className="mr-1" />
                          <span className="text-xs">Completed</span>
                        </div>}
                    </div>
                  </div>;
        })}
            </div>
          </div>) : <div className="text-center py-10">
          <p className="text-gray-600 dark:text-gray-400">
            No assignments found
          </p>
        </div>}
    </div>;
};
export default Assignments;