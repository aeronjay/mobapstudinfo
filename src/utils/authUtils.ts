export type UserRole = "student" | "professor";
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage: string;
}

// Mock user data
export const mockUsers: User[] = [{
  id: "ST12345",
  name: "Alex Johnson",
  email: "alex.johnson@student.edu",
  role: "student",
  profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
}, {
  id: "PR12345",
  name: "Dr. Rebecca Smith",
  email: "r.smith@professor.edu",
  role: "professor",
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
}];

// Mock authentication functions
export const mockLogin = (email: string, password: string, role: UserRole): Promise<User | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
      if (user) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", role);
        localStorage.setItem("userId", user.id);
      }
      resolve(user || null);
    }, 1000);
  });
};
export const mockLogout = (): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      resolve();
    }, 500);
  });
};
export const checkAuth = (): {
  isAuthenticated: boolean;
  role: UserRole | null;
  userId: string | null;
} => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const role = localStorage.getItem("userRole") as UserRole | null;
  const userId = localStorage.getItem("userId");
  return {
    isAuthenticated,
    role,
    userId
  };
};