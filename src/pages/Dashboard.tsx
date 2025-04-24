import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, BookOpenIcon, BellIcon, ClipboardListIcon, MessageCircleIcon } from 'lucide-react';
import { studentInfo, courses, assignments, notifications, events } from '../utils/mockData';
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  // Get today's classes
  const dayOfWeek = today.toLocaleDateString('en-US', {
    weekday: 'long'
  });
  // Get upcoming assignments (due within 7 days)
  const upcomingAssignments = assignments.filter(assignment => {
    const dueDate = new Date(assignment.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7 && assignment.status === 'pending';
  }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).slice(0, 3);
  // Get unread notifications
  const unreadNotifications = notifications.filter(notification => !notification.read).slice(0, 3);
  return <div className="py-4">
      {/* Student greeting */}
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img src={studentInfo.profileImage} alt={studentInfo.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Hello, {studentInfo.name.split(' ')[0]}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{formattedDate}</p>
        </div>
      </div>
      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[{
        icon: CalendarIcon,
        label: 'Schedule',
        color: 'bg-blue-100 dark:bg-blue-900',
        textColor: 'text-blue-800 dark:text-blue-100',
        path: '/schedule'
      }, {
        icon: ClipboardListIcon,
        label: 'Tasks',
        color: 'bg-green-100 dark:bg-green-900',
        textColor: 'text-green-800 dark:text-green-100',
        path: '/assignments'
      }, {
        icon: BookOpenIcon,
        label: 'Grades',
        color: 'bg-purple-100 dark:bg-purple-900',
        textColor: 'text-purple-800 dark:text-purple-100',
        path: '/grades'
      }, {
        icon: MessageCircleIcon,
        label: 'Messages',
        color: 'bg-yellow-100 dark:bg-yellow-900',
        textColor: 'text-yellow-800 dark:text-yellow-100',
        path: '/messages'
      }].map((item, index) => <button key={index} className={`flex flex-col items-center justify-center p-3 rounded-lg ${item.color}`} onClick={() => navigate(item.path)}>
            <item.icon className={`w-6 h-6 ${item.textColor}`} />
            <span className={`text-xs mt-1 font-medium ${item.textColor}`}>
              {item.label}
            </span>
          </button>)}
      </div>
      {/* Upcoming assignments */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Upcoming Tasks
          </h3>
          <button onClick={() => navigate('/assignments')} className="text-sm text-blue-600 dark:text-blue-400">
            View all
          </button>
        </div>
        <div className="space-y-3">
          {upcomingAssignments.length > 0 ? upcomingAssignments.map(assignment => {
          const course = courses.find(c => c.id === assignment.courseId);
          const dueDate = new Date(assignment.dueDate);
          const formattedDueDate = dueDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          });
          return <div key={assignment.id} className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
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
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {formattedDueDate}
                    </span>
                  </div>
                </div>;
        }) : <p className="text-gray-600 dark:text-gray-400 text-center py-3">
              No upcoming assignments
            </p>}
        </div>
      </section>
      {/* Notifications */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Notifications
          </h3>
          <button onClick={() => navigate('/notifications')} className="text-sm text-blue-600 dark:text-blue-400">
            View all
          </button>
        </div>
        <div className="space-y-3">
          {unreadNotifications.length > 0 ? unreadNotifications.map(notification => {
          const notifDate = new Date(notification.date);
          const formattedNotifDate = notifDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          });
          return <div key={notification.id} className="flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                    <BellIcon size={16} className="text-blue-800 dark:text-blue-100" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {notification.message}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formattedNotifDate}
                    </span>
                  </div>
                </div>;
        }) : <p className="text-gray-600 dark:text-gray-400 text-center py-3">
              No new notifications
            </p>}
        </div>
      </section>
      {/* Upcoming events */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Upcoming Events
          </h3>
          <button onClick={() => navigate('/calendar')} className="text-sm text-blue-600 dark:text-blue-400">
            View all
          </button>
        </div>
        <div className="space-y-3">
          {events.slice(0, 2).map(event => {
          const eventDate = new Date(event.date);
          const formattedEventDate = eventDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          });
          return <div key={event.id} className="flex items-start p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="bg-purple-100 dark:bg-purple-900 px-3 py-2 rounded-lg mr-3 flex flex-col items-center justify-center">
                  <span className="text-xs font-medium text-purple-800 dark:text-purple-100">
                    {eventDate.toLocaleDateString('en-US', {
                  month: 'short'
                })}
                  </span>
                  <span className="text-lg font-bold text-purple-800 dark:text-purple-100">
                    {eventDate.getDate()}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {event.time} • {event.location}
                  </p>
                </div>
              </div>;
        })}
        </div>
      </section>
    </div>;
};
export default Dashboard;