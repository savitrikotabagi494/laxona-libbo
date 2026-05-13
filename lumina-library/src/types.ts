export enum Role {
  STUDENT = 'student',
  EMPLOYEE = 'employee',
  ADMIN = 'admin'
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  available: boolean;
  coverImage?: string;
  description?: string;
  publisher?: string;
  pages?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  lastLogin?: string;
  isActive?: boolean;
}

export interface SessionUser {
  name: string;
  role: Role;
  isTrial: boolean;
  email?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: 'Bronze' | 'Silver' | 'Gold';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}
