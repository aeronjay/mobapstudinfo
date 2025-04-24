import React, { useState } from 'react';
import { notifications as notificationsData } from '../utils/mockData';
const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({
      ...notif,
      read: true
    })));
  };
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => notif.id === id ? {
      ...notif,
      read: true
    } : notif));
  };
  return <div className="py-4">
      {/* Header with mark all as read */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Notifications
        </h2>
        <button onClick={markAllAsRead} className="text-sm text-blue-600 dark:text-blue-400">
          Mark all as read
        </button>
      </div>
      {/* Notifications list */}
      <div className="space-y-4">
        {notifications.map(notification => {
        const notifDate = new Date(notification.date);
        const formattedDate = notifDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
        const formattedTime = notifDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        });
        return <div key={notification.id} className={`p-4 rounded-lg ${notification.read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/20'}`} onClick={() => markAsRead(notification.id)}>
              <div className="flex justify-between">
                <h3 className={`font-medium ${notification.read ? 'text-gray-800 dark:text-white' : 'text-blue-800 dark:text-blue-200'}`}>
                  {notification.title}
                </h3>
                {!notification.read && <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {notification.message}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                {formattedDate} at {formattedTime}
              </div>
            </div>;
      })}
      </div>
    </div>;
};
export default Notifications;