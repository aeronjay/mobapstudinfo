import React, { useState } from 'react';
import { professorClasses, enrolledStudents, assignments, Student } from '../../utils/professorMockData';
import { ChevronDownIcon, SearchIcon } from 'lucide-react';

const Students: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>(professorClasses[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingGrades, setEditingGrades] = useState<string | null>(null);
  const [gradeInputs, setGradeInputs] = useState<Record<string, number>>({});

  const students = enrolledStudents[selectedClass] || [];
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGradeChange = (studentId: string, assignmentId: string, value: number) => {
    setGradeInputs({
      ...gradeInputs,
      [`${studentId}-${assignmentId}`]: value
    });
  };

  const handleGradeSubmit = (studentId: string) => {
    // In a real app, this would update the backend
    setEditingGrades(null);
    setGradeInputs({});
  };

  return (
    <div className="py-4">
      {/* Header with class selector */}
      <div className="mb-6">
        <div className="relative">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 pr-10 text-gray-900 dark:text-white"
          >
            {professorClasses.map(class_ => (
              <option key={class_.id} value={class_.id}>
                {class_.name} ({class_.code})
              </option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Students list */}
      <div className="space-y-4">
        {filteredStudents.map(student => (
          <div key={student.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            {/* Student info */}
            <div className="p-4">
              <div className="flex items-center">
                <img
                  src={student.profileImage}
                  alt={student.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{student.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{student.email}</p>
                </div>
              </div>
            </div>

            {/* Grades section */}
            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Grades</h4>
                  {editingGrades !== student.id ? (
                    <button
                      onClick={() => setEditingGrades(student.id)}
                      className="text-sm text-blue-600 dark:text-blue-400"
                    >
                      Edit Grades
                    </button>
                  ) : (
                    <div className="space-x-2">
                      <button
                        onClick={() => setEditingGrades(null)}
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleGradeSubmit(student.id)}
                        className="text-sm text-green-600 dark:text-green-400"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {assignments
                    .filter(a => a.classId === selectedClass)
                    .map(assignment => {
                      const studentGrade = student.grades.find(g => g.assignmentId === assignment.id);
                      const inputKey = `${student.id}-${assignment.id}`;
                      const currentGrade = gradeInputs[inputKey] ?? studentGrade?.score ?? 0;

                      return (
                        <div key={assignment.id} className="flex justify-between items-center">
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {assignment.title}
                          </span>
                          {editingGrades === student.id ? (
                            <input
                              type="number"
                              min="0"
                              max={assignment.maxScore}
                              value={currentGrade}
                              onChange={(e) => handleGradeChange(
                                student.id,
                                assignment.id,
                                Number(e.target.value)
                              )}
                              className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded"
                            />
                          ) : (
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {studentGrade ? `${studentGrade.score}/${assignment.maxScore}` : 'N/A'}
                            </span>
                          )}
                        </div>
                      );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-gray-600 dark:text-gray-400">
            No students found
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;