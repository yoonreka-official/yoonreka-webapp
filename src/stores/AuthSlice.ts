import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchAuthUser } from '~/api/auth.api.ts';
import { setToken } from '~/utils/apollo.util.ts';
import { removeCookie } from '~/utils/cookie.util.ts';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '~/stores';
import type { AuthUser, UpdateUserBody } from '~/types/auth.type.ts';

export interface AuthState {
  authUser: AuthUser | null;
  isLoading: boolean;

  notificationConfig?: UpdateUserBody;
}

const initialState: AuthState = {
  authUser: null,
  isLoading: true,
};

export const fetchMe = createAsyncThunk<AuthUser | null>(
  'auth/fetchMe',
  async (_, { signal, rejectWithValue }) => {
    try {
      const res = await fetchAuthUser(signal);
      return Promise.resolve(res?.data?.currentUser || null);
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

        if (action.payload) {
          state.notificationConfig = {
            isDistractionMode: action.payload.isDistractionMode,
            distractionStartTime:
              action.payload.distractionStartTime || undefined,
            distractionEndTime: action.payload.distractionEndTime || undefined,
          };

          state.isLoading = false;
        } else {
          state.isLoading = true;
        }
      })
      .addCase(fetchMe.rejected, state => {
        state.authUser = null;
        state.isLoading = false;

        removeCookie('accessToken');
        removeCookie('refreshToken');
        setToken(undefined);
      });
  },
  initialState,
  name: 'auth',
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.authUser = action.payload;
    },

    setNotificationConfig: (
      state,
      action: PayloadAction<UpdateUserBody | undefined>,
    ) => {
      state.notificationConfig = action.payload;
    },
  },
});

export const { setAuthUser, setNotificationConfig } = AuthSlice.actions;
export const selectAuthUser = (state: RootState) => state.auth.authUser;
export default AuthSlice;
