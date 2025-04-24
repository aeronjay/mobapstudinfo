import { studentInfo } from './mockData';
export interface Class {
  id: string;
  name: string;
  code: string;
  schedule: {
    day: string;
    time: string;
  }[];
  room: string;
  enrolledStudents: number;
  description: string;
}
export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  profileImage: string;
  grades: {
    assignmentId: string;
    score: number;
    maxScore: number;
    comment?: string;
  }[];
}
export interface Assignment {
  id: string;
  classId: string;
  title: string;
  dueDate: string;
  maxScore: number;
  weight: number;
  description: string;
}
export interface Announcement {
  id: string;
  classId: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
}
// Mock professor's classes
export const professorClasses: Class[] = [{
  id: "MTH101",
  name: "Mathematics",
  code: "MATH-101",
  schedule: [{
    day: "Monday",
    time: "8:00 - 9:30"
  }, {
    day: "Wednesday",
    time: "8:00 - 9:30"
  }],
  room: "Room 203",
  enrolledStudents: 25,
  description: "Introduction to Calculus"
}, {
  id: "MTH201",
  name: "Advanced Mathematics",
  code: "MATH-201",
  schedule: [{
    day: "Tuesday",
    time: "10:00 - 11:30"
  }, {
    day: "Thursday",
    time: "10:00 - 11:30"
  }],
  room: "Room 205",
  enrolledStudents: 20,
  description: "Advanced Calculus and Linear Algebra"
}];
// Mock enrolled students
export const enrolledStudents: Record<string, Student[]> = {
  MTH101: [{
    ...studentInfo,
    grades: [{
      assignmentId: "A1",
      score: 92,
      maxScore: 100
    }, {
      assignmentId: "A2",
      score: 88,
      maxScore: 100
    }]
  }, {
    id: "ST12346",
    name: "Emma Wilson",
    email: "emma.wilson@student.edu",
    grade: "11th Grade",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    grades: [{
      assignmentId: "A1",
      score: 95,
      maxScore: 100
    }, {
      assignmentId: "A2",
      score: 90,
      maxScore: 100
    }]
  }],
  MTH201: [{
    id: "ST12347",
    name: "James Smith",
    email: "james.smith@student.edu",
    grade: "12th Grade",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    grades: [{
      assignmentId: "A1",
      score: 87,
      maxScore: 100
    }, {
      assignmentId: "A2",
      score: 91,
      maxScore: 100
    }]
  }]
};
// Mock assignments
export const assignments: Assignment[] = [{
  id: "A1",
  classId: "MTH101",
  title: "Calculus Quiz 1",
  dueDate: "2023-10-25",
  maxScore: 100,
  weight: 20,
  description: "Basic derivatives and integrals"
}, {
  id: "A2",
  classId: "MTH101",
  title: "Midterm Exam",
  dueDate: "2023-11-15",
  maxScore: 100,
  weight: 40,
  description: "Comprehensive exam covering all topics"
}];
// Mock announcements
export const announcements: Announcement[] = [{
  id: "AN1",
  classId: "MTH101",
  title: "Quiz Next Week",
  content: "Reminder: We will have a quiz covering chapters 1-3 next Monday.",
  date: "2023-10-18T14:30:00",
  important: true
}, {
  id: "AN2",
  classId: "MTH201",
  title: "Office Hours Changed",
  content: "Office hours will be moved to Tuesday 2-4 PM this week only.",
  date: "2023-10-17T10:15:00",
  important: false
}];