import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createAccount = createAsyncThunk(
  'account/createAccount',
  async (accountData) => {
    const response = await fetch('/api/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create account');
    }
    return await response.json();
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create account';
      });
  },
});

export default accountSlice.reducer;
