import React, { useState } from 'react';
import { contacts } from '../utils/mockData';
import { SearchIcon, PhoneIcon, MailIcon, MessageCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Directory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.role.toLowerCase().includes(searchQuery.toLowerCase()));
  return <div className="py-4">
      {/* Search */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon size={18} className="text-gray-500 dark:text-gray-400" />
        </div>
        <input type="text" className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Search contacts..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>
      {/* Contacts list */}
      <div className="space-y-4">
        {filteredContacts.map(contact => <div key={contact.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                <img src={contact.image} alt={contact.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 dark:text-white">
                  {contact.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {contact.role}
                </p>
              </div>
            </div>
            <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 flex justify-around">
              <button className="flex flex-col items-center py-1 px-3 text-gray-700 dark:text-gray-300">
                <PhoneIcon size={18} />
                <span className="text-xs mt-1">Call</span>
              </button>
              <button className="flex flex-col items-center py-1 px-3 text-gray-700 dark:text-gray-300">
                <MailIcon size={18} />
                <span className="text-xs mt-1">Email</span>
              </button>
              <button className="flex flex-col items-center py-1 px-3 text-gray-700 dark:text-gray-300" onClick={() => navigate('/messages')}>
                <MessageCircleIcon size={18} />
                <span className="text-xs mt-1">Message</span>
              </button>
            </div>
          </div>)}
        {filteredContacts.length === 0 && <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No contacts found
            </p>
          </div>}
      </div>
    </div>;
};
export default Directory;