import React from 'react';
import { grades, courses } from '../utils/mockData';
const Grades: React.FC = () => {
  // Calculate overall GPA
  const totalPoints = grades.reduce((sum, grade) => sum + grade.overallGrade, 0);
  const gpa = totalPoints / grades.length;
  // Generate letter grade from percentage
  const getLetterGrade = (percentage: number) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };
  return <div className="py-4">
      {/* Overall GPA */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Overall Performance
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">GPA</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {gpa.toFixed(1)}
            </p>
          </div>
          <div className="w-24 h-24 rounded-full border-8 border-blue-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              {getLetterGrade(gpa)}
            </span>
          </div>
        </div>
      </div>
      {/* Courses grades */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Course Grades
      </h3>
      <div className="space-y-4">
        {grades.map((grade, index) => {
        const course = courses.find(c => c.id === grade.courseId);
        const letterGrade = getLetterGrade(grade.overallGrade);
        return <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    {course?.name}
                  </h4>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
                      {grade.overallGrade}%
                    </span>
                    <span className={`text-sm font-bold rounded-md px-2 py-1 ${letterGrade === 'A' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : letterGrade === 'B' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : letterGrade === 'C' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : letterGrade === 'D' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                      {letterGrade}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {course?.teacher}
                </p>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700">
                <div className={`h-full ${grade.overallGrade >= 90 ? 'bg-green-500' : grade.overallGrade >= 80 ? 'bg-blue-500' : grade.overallGrade >= 70 ? 'bg-yellow-500' : grade.overallGrade >= 60 ? 'bg-orange-500' : 'bg-red-500'}`} style={{
              width: `${grade.overallGrade}%`
            }}></div>
              </div>
              {/* Assignment breakdown */}
              <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
                {grade.assignments.map((assignment, i) => <div key={i} className="flex justify-between py-2 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      {assignment.name}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {assignment.score}/{assignment.maxScore}
                    </span>
                  </div>)}
              </div>
            </div>;
      })}
      </div>
    </div>;
};
export default Grades;