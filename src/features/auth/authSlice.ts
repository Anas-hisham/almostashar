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
    /** Merge fresh backend data into the logged-in user (name, image ...). */
    updateUser(state, action: PayloadAction<Partial<AuthUser>>) {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
    setChecking(state) {
      state.status = 'checking';
    },
  },
});

export const { setAuthenticated, setUnauthenticated, setChecking, updateUser } = authSlice.actions;
export default authSlice.reducer;
