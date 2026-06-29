import React, { createContext, useContext, useState, ReactNode } from 'react';
import { loginUser } from '@/services/api';
import { extractUserIdFromToken } from '@/lib/jwt';

export type UserRole = 'student' | 'admin' | 'instructor';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  token?: string;
  // Static fields kept for dashboard compatibility
  faculty?: string;
  nationalId?: string;
  year?: number;
  gpa?: number;
  cgpa?: number;
  totalCredits?: number;
  completedCredits?: number;
  department?: string;
  title?: string;
  coursesCount?: number;
  totalStudents?: number;
}

// Keep backward compat alias
export type Student = User;

interface AuthContextType {
  user: User | null;
  /** @deprecated use `user` */
  student: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: UserRole }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapRole(apiRole: string): UserRole {
  const lower = apiRole.toLowerCase();
  if (lower === 'admin') return 'admin';
  if (lower === 'instructor' || lower === 'doctor') return 'instructor';
  return 'student';
}

// Static fallback data per role for dashboard compatibility
function getStaticFields(role: UserRole): Partial<User> {
  if (role === 'student') {
    return {
      faculty: 'Computer Science',
      year: 3,
      gpa: 3.5,
      cgpa: 3.42,
      totalCredits: 120,
      completedCredits: 48,
    };
  }
  if (role === 'instructor') {
    return {
      faculty: 'Computer Science',
      department: 'Computer Science',
      title: 'Associate Professor',
      coursesCount: 3,
      totalStudents: 113,
    };
  }
  return { faculty: 'Administration' };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<{ success: boolean; role?: UserRole }> => {
    try {
      const data = await loginUser(email, password);

      if (!data.success) {
        return { success: false };
      }

      const role = mapRole(data.role);
      const userId = extractUserIdFromToken(data.token);

      localStorage.setItem('token', data.token);
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
      if (userId) localStorage.setItem('userId', userId);
      localStorage.setItem('userName', data.name || '');
      localStorage.setItem('userEmail', data.email || '');
      localStorage.setItem('userRole', role);


      setUser({
        name: data.name,
        email: data.email,
        role,
        token: data.token,
        ...getStaticFields(role),
      });

      return { success: true, role };
    } catch {
      return { success: false };
    }
  };

  const logout = () => {
    ['token', 'refreshToken', 'userId', 'userName', 'userEmail', 'userRole'].forEach((k) =>
      localStorage.removeItem(k),
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, student: user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
