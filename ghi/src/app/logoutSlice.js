import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    logoutStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
    },
    logoutFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { logoutStart, logoutSuccess, logoutFailure } = logoutSlice.actions;

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutStart());
    const response = await fetch('http://localhost:8000/token', {
      method: 'DELETE',
      credentials: 'include', 
    });
    if (!response.ok) {
      throw new Error('Failed to logout');
    }
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure(error.message));
  }
};

export default logoutSlice.reducer;
