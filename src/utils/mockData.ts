export const studentInfo = {
  id: "ST12345",
  name: "Alex Johnson",
  email: "alex.johnson@student.edu",
  grade: "11th Grade",
  profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
};
export const courses = [{
  id: 1,
  name: "Mathematics",
  teacher: "Dr. Rebecca Smith",
  room: "Room 203",
  color: "bg-blue-500"
}, {
  id: 2,
  name: "Physics",
  teacher: "Mr. Robert Johnson",
  room: "Room 105",
  color: "bg-green-500"
}, {
  id: 3,
  name: "English Literature",
  teacher: "Mrs. Emily Wilson",
  room: "Room 310",
  color: "bg-purple-500"
}, {
  id: 4,
  name: "History",
  teacher: "Mr. Michael Brown",
  room: "Room 208",
  color: "bg-yellow-500"
}, {
  id: 5,
  name: "Computer Science",
  teacher: "Ms. Jessica Lee",
  room: "Lab 102",
  color: "bg-red-500"
}];
export const schedule = [{
  day: "Monday",
  periods: [{
    time: "8:00 - 9:30",
    courseId: 1
  }, {
    time: "9:45 - 11:15",
    courseId: 3
  }, {
    time: "11:30 - 13:00",
    courseId: 2
  }, {
    time: "14:00 - 15:30",
    courseId: 5
  }]
}, {
  day: "Tuesday",
  periods: [{
    time: "8:00 - 9:30",
    courseId: 4
  }, {
    time: "9:45 - 11:15",
    courseId: 1
  }, {
    time: "11:30 - 13:00",
    courseId: 5
  }, {
    time: "14:00 - 15:30",
    courseId: 3
  }]
}, {
  day: "Wednesday",
  periods: [{
    time: "8:00 - 9:30",
    courseId: 2
  }, {
    time: "9:45 - 11:15",
    courseId: 4
  }, {
    time: "11:30 - 13:00",
    courseId: 1
  }, {
    time: "14:00 - 15:30",
    courseId: 3
  }]
}, {
  day: "Thursday",
  periods: [{
    time: "8:00 - 9:30",
    courseId: 5
  }, {
    time: "9:45 - 11:15",
    courseId: 2
  }, {
    time: "11:30 - 13:00",
    courseId: 3
  }, {
    time: "14:00 - 15:30",
    courseId: 4
  }]
}, {
  day: "Friday",
  periods: [{
    time: "8:00 - 9:30",
    courseId: 3
  }, {
    time: "9:45 - 11:15",
    courseId: 5
  }, {
    time: "11:30 - 13:00",
    courseId: 4
  }, {
    time: "14:00 - 15:30",
    courseId: 1
  }]
}];
export const assignments = [{
  id: 1,
  courseId: 1,
  title: "Calculus Problem Set",
  description: "Complete problems 1-15 from Chapter 4",
  dueDate: "2023-10-25",
  status: "pending"
}, {
  id: 2,
  courseId: 3,
  title: "Essay on Shakespeare",
  description: "Write a 1000-word analysis of Hamlet",
  dueDate: "2023-10-30",
  status: "pending"
}, {
  id: 3,
  courseId: 2,
  title: "Lab Report",
  description: "Write up the results from our pendulum experiment",
  dueDate: "2023-11-05",
  status: "pending"
}, {
  id: 4,
  courseId: 5,
  title: "Programming Project",
  description: "Build a simple calculator application",
  dueDate: "2023-11-10",
  status: "pending"
}, {
  id: 5,
  courseId: 4,
  title: "Research Paper",
  description: "5-page paper on a significant historical event",
  dueDate: "2023-11-15",
  status: "pending"
}, {
  id: 6,
  courseId: 1,
  title: "Algebra Quiz",
  description: "Prepare for quiz on linear equations",
  dueDate: "2023-10-20",
  status: "completed"
}];
export const grades = [{
  courseId: 1,
  assignments: [{
    name: "Homework 1",
    score: 92,
    maxScore: 100
  }, {
    name: "Quiz 1",
    score: 88,
    maxScore: 100
  }, {
    name: "Midterm Exam",
    score: 90,
    maxScore: 100
  }],
  overallGrade: 90
}, {
  courseId: 2,
  assignments: [{
    name: "Lab Report 1",
    score: 85,
    maxScore: 100
  }, {
    name: "Project",
    score: 95,
    maxScore: 100
  }, {
    name: "Quiz 1",
    score: 78,
    maxScore: 100
  }],
  overallGrade: 86
}, {
  courseId: 3,
  assignments: [{
    name: "Essay 1",
    score: 88,
    maxScore: 100
  }, {
    name: "Presentation",
    score: 92,
    maxScore: 100
  }, {
    name: "Participation",
    score: 95,
    maxScore: 100
  }],
  overallGrade: 92
}, {
  courseId: 4,
  assignments: [{
    name: "Research Paper",
    score: 91,
    maxScore: 100
  }, {
    name: "Quiz 1",
    score: 84,
    maxScore: 100
  }, {
    name: "Group Project",
    score: 89,
    maxScore: 100
  }],
  overallGrade: 88
}, {
  courseId: 5,
  assignments: [{
    name: "Coding Assignment 1",
    score: 96,
    maxScore: 100
  }, {
    name: "Project",
    score: 98,
    maxScore: 100
  }, {
    name: "Quiz 1",
    score: 92,
    maxScore: 100
  }],
  overallGrade: 95
}];
export const notifications = [{
  id: 1,
  title: "New Assignment Posted",
  message: "A new assignment has been posted for Physics class.",
  date: "2023-10-18T14:30:00",
  read: false
}, {
  id: 2,
  title: "Grade Updated",
  message: "Your grade for the Mathematics midterm has been updated.",
  date: "2023-10-17T10:15:00",
  read: true
}, {
  id: 3,
  title: "Class Canceled",
  message: "English Literature class is canceled tomorrow due to teacher conference.",
  date: "2023-10-16T16:45:00",
  read: false
}, {
  id: 4,
  title: "Upcoming Quiz",
  message: "Reminder: Computer Science quiz scheduled for next Monday.",
  date: "2023-10-15T09:00:00",
  read: true
}, {
  id: 5,
  title: "School Event",
  message: "Don't forget the Science Fair this Friday at the main hall.",
  date: "2023-10-14T11:20:00",
  read: true
}];
export const events = [{
  id: 1,
  title: "Science Fair",
  date: "2023-10-27",
  time: "13:00 - 16:00",
  location: "Main Hall"
}, {
  id: 2,
  title: "Parent-Teacher Conference",
  date: "2023-11-03",
  time: "16:00 - 19:00",
  location: "School Campus"
}, {
  id: 3,
  title: "Basketball Game",
  date: "2023-11-10",
  time: "17:00 - 19:00",
  location: "School Gymnasium"
}, {
  id: 4,
  title: "Career Day",
  date: "2023-11-17",
  time: "09:00 - 14:00",
  location: "Auditorium"
}, {
  id: 5,
  title: "Field Trip - Museum",
  date: "2023-11-24",
  time: "08:30 - 15:00",
  location: "City Museum"
}];
export const contacts = [{
  id: 1,
  name: "Dr. Rebecca Smith",
  role: "Mathematics Teacher",
  email: "r.smith@school.edu",
  phone: "(555) 123-4567",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
}, {
  id: 2,
  name: "Mr. Robert Johnson",
  role: "Physics Teacher",
  email: "r.johnson@school.edu",
  phone: "(555) 234-5678",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
}, {
  id: 3,
  name: "Mrs. Emily Wilson",
  role: "English Literature Teacher",
  email: "e.wilson@school.edu",
  phone: "(555) 345-6789",
  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
}, {
  id: 4,
  name: "Mr. Michael Brown",
  role: "History Teacher",
  email: "m.brown@school.edu",
  phone: "(555) 456-7890",
  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
}, {
  id: 5,
  name: "Ms. Jessica Lee",
  role: "Computer Science Teacher",
  email: "j.lee@school.edu",
  phone: "(555) 567-8901",
  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
}, {
  id: 6,
  name: "Principal Jennifer Adams",
  role: "School Principal",
  email: "j.adams@school.edu",
  phone: "(555) 678-9012",
  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
}];
export const messages = [{
  id: 1,
  contactId: 1,
  messages: [{
    id: 1,
    sender: "contact",
    text: "Hello Alex, I wanted to remind you about the extra credit assignment due next week.",
    timestamp: "2023-10-17T10:30:00"
  }, {
    id: 2,
    sender: "user",
    text: "Thank you for the reminder, Dr. Smith. I'm working on it now.",
    timestamp: "2023-10-17T10:35:00"
  }, {
    id: 3,
    sender: "contact",
    text: "Great! Let me know if you have any questions.",
    timestamp: "2023-10-17T10:40:00"
  }]
}, {
  id: 2,
  contactId: 3,
  messages: [{
    id: 1,
    sender: "contact",
    text: "Hi Alex, I've posted the essay guidelines for our next assignment.",
    timestamp: "2023-10-16T14:20:00"
  }, {
    id: 2,
    sender: "user",
    text: "Thanks Mrs. Wilson, I'll take a look at them today.",
    timestamp: "2023-10-16T15:45:00"
  }]
}, {
  id: 3,
  contactId: 5,
  messages: [{
    id: 1,
    sender: "user",
    text: "Ms. Lee, I'm having trouble with the programming assignment. Could I schedule a time to meet?",
    timestamp: "2023-10-15T09:10:00"
  }, {
    id: 2,
    sender: "contact",
    text: "Of course, Alex. How about tomorrow during lunch break?",
    timestamp: "2023-10-15T09:25:00"
  }, {
    id: 3,
    sender: "user",
    text: "That works for me. Thank you!",
    timestamp: "2023-10-15T09:30:00"
  }, {
    id: 4,
    sender: "contact",
    text: "Perfect, I'll see you at my office at 12:30.",
    timestamp: "2023-10-15T09:35:00"
  }]
}];