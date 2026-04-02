import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/axios';
import { Course, Category, Lesson, CourseState } from '@/types/course';

const initialState: CourseState = {
  courses: [],
  instructorCourses: [],
  categories: [],
  selectedCourse: null,
  loading: false,
  error: null,
};

// Course Thunks
export const fetchCourses = createAsyncThunk(
  'courses/fetchAll',
  async (filters: { categoryId?: string; search?: string } | undefined, { rejectWithValue }) => {
    try {
      const response = await api.get('/courses', { params: filters });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses');
    }
  }
);

export const fetchInstructorCourses = createAsyncThunk(
  'courses/fetchInstructor',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/courses/instructor');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch instructor courses');
    }
  }
);

export const createCourse = createAsyncThunk(
  'courses/create',
  async (courseData: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/courses', courseData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create course');
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch course');
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courses/update',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/courses/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update course');
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/courses/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete course');
    }
  }
);

// Category Thunks
export const fetchCategories = createAsyncThunk(
  'courses/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

// Lesson Thunks
export const addLesson = createAsyncThunk(
  'courses/addLesson',
  async (lessonData: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/lessons', lessonData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add lesson');
    }
  }
);

export const updateLesson = createAsyncThunk(
  'courses/updateLesson',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/lessons/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update lesson');
    }
  }
);

export const deleteLesson = createAsyncThunk(
  'courses/deleteLesson',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/lessons/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete lesson');
    }
  }
);

export const reorderLessons = createAsyncThunk(
  'courses/reorderLessons',
  async ({ courseId, lessonIds }: { courseId: string; lessonIds: string[] }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/lessons/reorder/${courseId}`, { lessonIds });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reorder lessons');
    }
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSelectedCourse: (state, action: PayloadAction<Course | null>) => {
      state.selectedCourse = action.payload;
    },
    clearCourseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.courses = action.payload.data || action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Instructor Courses
      .addCase(fetchInstructorCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.instructorCourses = action.payload;
      })
      // Fetch One course
      .addCase(fetchCourseById.fulfilled, (state, action: PayloadAction<Course>) => {
        state.selectedCourse = action.payload;
      })
      // Update course
      .addCase(updateCourse.fulfilled, (state, action: PayloadAction<Course>) => {
        state.selectedCourse = action.payload;
      })
      // Create Course
      .addCase(createCourse.fulfilled, (state, action: PayloadAction<Course>) => {
        state.instructorCourses.unshift(action.payload);
      })
      // Delete Course
      .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<string>) => {
        state.courses = state.courses.filter(c => c.id !== action.payload);
        state.instructorCourses = state.instructorCourses.filter(c => c.id !== action.payload);
      })
      // Categories
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
      })
      // Lessons
      .addCase(addLesson.fulfilled, (state, action: PayloadAction<Lesson>) => {
        if (state.selectedCourse && state.selectedCourse.id === action.payload.courseId) {
            state.selectedCourse.lessons = [...(state.selectedCourse.lessons || []), action.payload];
        }
      })
      .addCase(updateLesson.fulfilled, (state, action: PayloadAction<Lesson>) => {
        if (state.selectedCourse && state.selectedCourse.lessons) {
             state.selectedCourse.lessons = state.selectedCourse.lessons.map(l => l.id === action.payload.id ? action.payload : l);
        }
      })
      .addCase(deleteLesson.fulfilled, (state, action: PayloadAction<string>) => {
        if (state.selectedCourse && state.selectedCourse.lessons) {
             state.selectedCourse.lessons = state.selectedCourse.lessons.filter(l => l.id !== action.payload);
        }
      });
  },
});

export const { setSelectedCourse, clearCourseError } = courseSlice.actions;
export default courseSlice.reducer;
