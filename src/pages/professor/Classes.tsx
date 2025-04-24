import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { professorClasses, enrolledStudents, Class } from '../../utils/professorMockData';

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>(professorClasses);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [formData, setFormData] = useState<Partial<Class>>({
    name: '',
    code: '',
    room: '',
    description: '',
    schedule: [{ day: 'Monday', time: '09:00 - 10:30' }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClass) {
      // Edit existing class
      setClasses(classes.map(c => 
        c.id === editingClass.id ? { ...c, ...formData } : c
      ));
    } else {
      // Add new class
      const newClass: Class = {
        ...formData as Class,
        id: Math.random().toString(36).substr(2, 9),
        enrolledStudents: 0
      };
      setClasses([...classes, newClass]);
    }
    handleCloseModal();
  };

  const handleDelete = (classId: string) => {
    if (confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(c => c.id !== classId));
    }
  };

  const handleEdit = (class_: Class) => {
    setEditingClass(class_);
    setFormData(class_);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingClass(null);
    setFormData({
      name: '',
      code: '',
      room: '',
      description: '',
      schedule: [{ day: 'Monday', time: '09:00 - 10:30' }]
    });
  };

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Classes</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg"
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          Add Class
        </button>
      </div>

      {/* Classes list */}
      <div className="space-y-4">
        {classes.map(class_ => (
          <div key={class_.id} className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{class_.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{class_.code}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(class_)}
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(class_.id)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{class_.description}</p>
            <div className="flex justify-between text-sm">
              <div className="text-gray-600 dark:text-gray-400">
                {class_.schedule.map(s => `${s.day} ${s.time}`).join(', ')}
              </div>
              <div className="text-blue-600 dark:text-blue-400">
                {enrolledStudents[class_.id]?.length || 0} students
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingClass ? 'Edit Class' : 'Add New Class'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Class Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Class Code
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={e => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Room
                </label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={e => setFormData({ ...formData, room: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                  rows={3}
                  required
                />
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
                  {editingClass ? 'Save Changes' : 'Add Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;