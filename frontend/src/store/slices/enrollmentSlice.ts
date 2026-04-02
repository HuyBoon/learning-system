import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/axios';

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: string;
  course?: any;
}

interface EnrollmentState {
  myEnrollments: Enrollment[];
  allEnrollments: Enrollment[];
  enrollmentStatus: Record<string, { enrolled: boolean; status: string | null }>;
  loading: boolean;
  error: string | null;
}

const initialState: EnrollmentState = {
  myEnrollments: [],
  allEnrollments: [],
  enrollmentStatus: {},
  loading: false,
  error: null,
};

export const enrollInCourse = createAsyncThunk(
  'enrollment/enroll',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await api.post(`/enrollments/${courseId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to enroll in course');
    }
  }
);

export const fetchMyEnrollments = createAsyncThunk(
  'enrollment/fetchMy',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/enrollments/my');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch enrollments');
    }
  }
);

export const checkEnrollmentStatus = createAsyncThunk(
  'enrollment/checkStatus',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/enrollments/check/${courseId}`);
      return { courseId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check status');
    }
  }
);

export const fetchAllEnrollments = createAsyncThunk(
  'enrollment/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/enrollments/all');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch enrollments');
    }
  }
);

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    clearEnrollmentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Enroll
      .addCase(enrollInCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(enrollInCourse.fulfilled, (state, action: PayloadAction<Enrollment>) => {
        state.loading = false;
        state.myEnrollments.unshift(action.payload);
        state.enrollmentStatus[action.payload.courseId] = { enrolled: true, status: action.payload.status };
      })
      .addCase(enrollInCourse.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch My Enrollments
      .addCase(fetchMyEnrollments.fulfilled, (state, action: PayloadAction<Enrollment[]>) => {
         state.myEnrollments = action.payload;
      })
      // Check Status
      .addCase(checkEnrollmentStatus.fulfilled, (state, action: PayloadAction<{ courseId: string; enrolled: boolean; status: string | null }>) => {
         state.enrollmentStatus[action.payload.courseId] = {
           enrolled: action.payload.enrolled,
           status: action.payload.status
         };
      })
      // Fetch All (Admin)
      .addCase(fetchAllEnrollments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllEnrollments.fulfilled, (state, action: PayloadAction<Enrollment[]>) => {
        state.loading = false;
        state.allEnrollments = action.payload;
      })
      .addCase(fetchAllEnrollments.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEnrollmentError } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
