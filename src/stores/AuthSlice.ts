import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchAuthUser } from '~/api/auth.api.ts';

import type { RootState } from '~/stores';
import type { AuthUser } from '~/types/auth.type.ts';

export interface AuthState {
  authUser: AuthUser | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  authUser: null,
  isLoading: true,
};

export const fetchMe = createAsyncThunk<AuthUser>(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await fetchAuthUser();
      return Promise.resolve(data.currentUser);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const AuthSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchMe.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMe.rejected, state => {
        state.authUser = null;
        state.isLoading = false;
      });
  },
  initialState,
  name: 'auth',
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },

    signOut: state => {
      state.authUser = null;
    },
  },
});

export const { setAuthUser, signOut } = AuthSlice.actions;
export const selectAuthUser = (state: RootState) => state.auth.authUser;
export default AuthSlice;
