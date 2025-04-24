import React, { useState } from 'react';
import { messages, contacts } from '../utils/mockData';
import { SearchIcon, SendIcon } from 'lucide-react';
const Messages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const getLastMessage = (contactId: number) => {
    const chat = messages.find(m => m.contactId === contactId);
    if (!chat || chat.messages.length === 0) return null;
    return chat.messages[chat.messages.length - 1];
  };
  const selectedChatData = selectedChat ? messages.find(m => m.contactId === selectedChat) : null;
  const selectedContactData = selectedChat ? contacts.find(c => c.id === selectedChat) : null;
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message to a backend
    // For now, we'll just clear the input
    setNewMessage('');
  };
  return <div className="py-4">
      {selectedChat ?
    // Chat view
    <div className="flex flex-col h-[calc(100vh-180px)]">
          {/* Contact header */}
          <div className="flex items-center mb-4">
            <button className="mr-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800" onClick={() => setSelectedChat(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img src={selectedContactData?.image} alt={selectedContactData?.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white">
                {selectedContactData?.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {selectedContactData?.role}
              </p>
            </div>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-3">
            {selectedChatData?.messages.map(message => <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white'}`}>
                  {message.text}
                  <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
                  </div>
                </div>
              </div>)}
          </div>
          {/* Message input */}
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-2">
            <input type="text" className="flex-1 border-0 bg-transparent focus:outline-none text-gray-800 dark:text-white" placeholder="Type a message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} />
            <button className="p-2 rounded-full bg-blue-500 text-white" onClick={handleSendMessage}>
              <SendIcon size={18} />
            </button>
          </div>
        </div> :
    // Chats list view
    <>
          {/* Search */}
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon size={18} className="text-gray-500 dark:text-gray-400" />
            </div>
            <input type="text" className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Search messages..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          {/* Chats list */}
          <div className="space-y-2">
            {filteredContacts.map(contact => {
          const lastMessage = getLastMessage(contact.id);
          if (!lastMessage) return null;
          return <button key={contact.id} className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg flex items-center" onClick={() => setSelectedChat(contact.id)}>
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img src={contact.image} alt={contact.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-800 dark:text-white truncate">
                        {contact.name}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(lastMessage.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {lastMessage.text}
                    </p>
                  </div>
                </button>;
        })}
          </div>
        </>}
    </div>;
};
export default Messages;