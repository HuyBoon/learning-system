import { User } from './auth';

export interface Category {
  id: string;
  name: string;
  description?: string;
  _count?: {
    courses: number;
  };
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  content?: string;
  courseId: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  instructorId: string;
  categoryId?: string;
  createdAt: string;
  updatedAt: string;
  instructor?: Partial<User>;
  category?: Category;
  lessons?: Lesson[];
  _count?: {
    lessons: number;
    enrollments: number;
  };
}

export interface CourseState {
  courses: Course[];
  instructorCourses: Course[];
  categories: Category[];
  selectedCourse: Course | null;
  loading: boolean;
  error: string | null;
}
