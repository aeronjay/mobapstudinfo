import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { announcements, professorClasses, Announcement } from '../../utils/professorMockData';

const Announcements: React.FC = () => {
  const [notices, setNotices] = useState<Announcement[]>(announcements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    classId: professorClasses[0].id,
    important: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNotice) {
      // Edit existing announcement
      setNotices(notices.map(notice =>
        notice.id === editingNotice.id ? { ...notice, ...formData } : notice
      ));
    } else {
      // Add new announcement
      const newNotice: Announcement = {
        ...formData as Omit<Announcement, 'id' | 'date'>,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString()
      };
      setNotices([newNotice, ...notices]);
    }
    handleCloseModal();
  };

  const handleDelete = (noticeId: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setNotices(notices.filter(n => n.id !== noticeId));
    }
  };

  const handleEdit = (notice: Announcement) => {
    setEditingNotice(notice);
    setFormData(notice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNotice(null);
    setFormData({
      title: '',
      content: '',
      classId: professorClasses[0].id,
      important: false
    });
  };

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Announcements</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg"
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          New Announcement
        </button>
      </div>

      {/* Announcements list */}
      <div className="space-y-4">
        {notices.map(notice => {
          const class_ = professorClasses.find(c => c.id === notice.classId);
          return (
            <div key={notice.id} className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{notice.title}</h3>
                    {notice.important && (
                      <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full">
                        Important
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {class_?.name} ({class_?.code})
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(notice)}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {notice.content}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Posted on {new Date(notice.date).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingNotice ? 'Edit Announcement' : 'New Announcement'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Class
                </label>
                <select
                  value={formData.classId}
                  onChange={e => setFormData({ ...formData, classId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                  required
                >
                  {professorClasses.map(class_ => (
                    <option key={class_.id} value={class_.id}>
                      {class_.name} ({class_.code})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                  rows={4}
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="important"
                  checked={formData.important}
                  onChange={e => setFormData({ ...formData, important: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="important" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Mark as important
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {editingNotice ? 'Save Changes' : 'Post Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;