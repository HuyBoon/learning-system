import { User } from './auth';

export interface Category {
  id: string;
  name: string;
  description?: string;
  _count?: {
    courses: number;
  };
}

export enum LessonType {
  VIDEO = 'VIDEO',
  ARTICLE = 'ARTICLE',
  MIXED = 'MIXED'
}

export enum FileType {
  PDF = 'PDF',
  ZIP = 'ZIP',
  IMAGE = 'IMAGE',
  CODE = 'CODE',
  OTHER = 'OTHER'
}

export interface Material {
  id: string;
  title: string;
  fileUrl: string;
  fileType: FileType;
  size: number;
  publicId: string;
  lessonId: string;
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl?: string;
  content?: string;
  type: LessonType;
  courseId: string;
  order: number;
  materials?: Material[];
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
