import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AuthState, AuthUser } from "./authTypes";


const initialState: AuthState = {
  user: null,
  status: 'checking',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<AuthUser | undefined>) {
      state.user = action.payload ?? null;
      state.status = 'authenticated';
    },
    setUnauthenticated(state) {
      state.user = null;
      state.status = 'unauthenticated';
    },
    setChecking(state) {
      state.status = 'checking';
    },
  },
});

export const { setAuthenticated, setUnauthenticated, setChecking } = authSlice.actions;
export default authSlice.reducer;
