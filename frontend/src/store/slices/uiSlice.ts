import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  isSidebarCollapsed: boolean;
}

const initialState: UiState = {
  isSidebarCollapsed: typeof window !== 'undefined' ? localStorage.getItem('sidebarCollapsed') === 'true' : false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
      if (typeof window !== 'undefined') {
        localStorage.setItem('sidebarCollapsed', String(state.isSidebarCollapsed));
      }
    },
    setSidebarCollapsed: (state, action) => {
      state.isSidebarCollapsed = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('sidebarCollapsed', String(state.isSidebarCollapsed));
      }
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed } = uiSlice.actions;
export default uiSlice.reducer;
