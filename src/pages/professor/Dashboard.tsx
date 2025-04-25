import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon, UsersIcon } from 'lucide-react';
import { professorClasses, enrolledStudents, announcements } from '../../utils/professorMockData';
import { useAuth } from '../../context/AuthContext';

const ProfessorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  console.log('ProfessorDashboard rendering:', { 
    user,
    professorClasses,
    enrolledStudents,
    announcements 
  });
  
  // Get total number of students across all classes
  const totalStudents = Object.values(enrolledStudents).reduce(
    (total, students) => total + students.length,
    0
  );

  return (
    <div className="py-4">
      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
          <h3 className="text-blue-800 dark:text-blue-200 font-medium mb-1">Classes</h3>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {professorClasses.length}
          </p>
        </div>
        <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
          <h3 className="text-green-800 dark:text-green-200 font-medium mb-1">Students</h3>
          <p className="text-2xl font-bold text-green-900 dark:text-green-100">
            {totalStudents}
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => navigate('/professor/classes')}
          className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg"
        >
          <BookOpenIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Manage Classes</span>
        </button>
        <button
          onClick={() => navigate('/professor/students')}
          className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg"
        >
          <UsersIcon className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">View Students</span>
        </button>
      </div>

      {/* Recent announcements */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Announcements</h2>
          <button
            onClick={() => navigate('/professor/announcements')}
            className="text-sm text-blue-600 dark:text-blue-400"
          >
            View all
          </button>
        </div>
        <div className="space-y-3">
          {announcements.slice(0, 3).map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h3>
                {announcement.important && (
                  <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full">
                    Important
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{announcement.content}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {new Date(announcement.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Today's classes */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Classes</h2>
          <button
            onClick={() => navigate('/professor/schedule')}
            className="text-sm text-blue-600 dark:text-blue-400"
          >
            Full Schedule
          </button>
        </div>
        <div className="space-y-3">
          {professorClasses.map((class_) => (
            <div
              key={class_.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4"
            >
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">{class_.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{class_.code} • {class_.room}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {class_.schedule[0].time}
                </span>
                <span className="text-blue-600 dark:text-blue-400">
                  {enrolledStudents[class_.id]?.length || 0} students
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfessorDashboard;