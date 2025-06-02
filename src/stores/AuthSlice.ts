import { analyze } from '@kokr/id'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchAuthUser } from '~/api/auth.api.ts'
import { setToken } from '~/utils/apollo.util.ts'
import { removeCookie } from '~/utils/cookie.util.ts'

import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '~/stores'
import type { AuthUser, UpdateUserBody } from '~/types/auth.type.ts'
import { formatDate } from '~/utils/format.util'

export interface AuthState {
  authUser: AuthUser | null
  isHighSchool: boolean

  isLoading: boolean

  notificationConfig?: UpdateUserBody
}

const initialState: AuthState = {
  authUser: null,
  isHighSchool: false,
  isLoading: true,
}

export const fetchMe = createAsyncThunk<AuthUser | null>(
  'auth/fetchMe',
  async (_, { signal, rejectWithValue }) => {
    try {
      const res = await fetchAuthUser(signal)
      return Promise.resolve(res?.data?.currentUser || null)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

const AuthSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.authUser = action.payload

        if (action.payload) {
          state.notificationConfig = {
            isDistractionMode: action.payload.isDistractionMode,
            distractionStartTime:
              action.payload.distractionStartTime || undefined,
            distractionEndTime: action.payload.distractionEndTime || undefined,
          }

          // 고등부 여부
          const genderNum =
            new Date(action.payload.birthDate).getFullYear() >= 2000 ? 3 : 1 // 나이 계산만을 위함
          const { krAge } = analyze(
            `${formatDate(action.payload.birthDate, 'YYMMDD')}-${genderNum}000000`,
            {
              now: new Date(),
            },
          )
          state.isHighSchool = (krAge ?? 0) - 16 > 0

          state.isLoading = false
        } else {
          state.isLoading = true
        }
      })
      .addCase(fetchMe.rejected, (state) => {
        state.authUser = null
        state.isLoading = false

        removeCookie('accessToken')
        removeCookie('refreshToken')
        setToken(undefined)
      })
  },
  initialState,
  name: 'auth',
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.authUser = action.payload
    },

    setNotificationConfig: (
      state,
      action: PayloadAction<UpdateUserBody | undefined>,
    ) => {
      state.notificationConfig = action.payload
    },
  },
})

export const { setAuthUser, setNotificationConfig } = AuthSlice.actions
export const selectAuthUser = (state: RootState) => state.auth.authUser
export default AuthSlice
