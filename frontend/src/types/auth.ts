export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';
  _count?: {
    enrollments: number;
    coursesCreated?: number;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  usersLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  users: User[];
}
