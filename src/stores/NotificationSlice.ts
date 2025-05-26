import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { getNotifications } from '~/api/notification.api.ts'

import type { PayloadAction } from '@reduxjs/toolkit'

import type {
  FormattedNotificationResponse,
  Notification,
  NotificationPageInfo,
  NotificationParams,
  NotificationType,
} from '~/types/notification.type.ts'

export interface NotificationState {
  params: NotificationParams
  list: Notification[]
  pageInfo: NotificationPageInfo
  totalCount: number

  isLoading: boolean
  hasNew: boolean

  selectedType: NotificationType | 'ALL'
}

export const DEFAULT_PAGINATION = { offset: 0, limit: 10 }

const initialState: NotificationState = {
  params: {
    pagination: DEFAULT_PAGINATION,
    // filter: {
    //   types: [NotificationType.NEW_MATERIAL],
    // },
  },
  list: [],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
  },
  totalCount: 0,

  isLoading: false,
  hasNew: false,

  selectedType: 'ALL',
}

export const fetchNotifications = createAsyncThunk<
  FormattedNotificationResponse,
  NotificationParams | undefined
>('notification/fetchNotifications', async (params, { rejectWithValue }) => {
  try {
    const res = await getNotifications(params || initialState.params)
    return Promise.resolve(res)
  } catch (err) {
    return rejectWithValue(err)
  }
})

const isNewNotification = (item: Notification) => {
  const time = dayjs().subtract(24, 'hours')
  const readIds = JSON.parse(window.localStorage.getItem('readIds') || '[]')

  return dayjs(item.createdAt).isAfter(time) && !readIds.includes(item.id)
}

const NotificationSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state, action) => {
        state.isLoading = true

        if (action.meta.arg) {
          state.params = action.meta.arg
        }
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        const notifications = action.payload.data.map((item) => {
          return {
            ...item,
            isNew: isNewNotification(item),
          }
        })

        if ((action.meta.arg?.pagination.offset || 0) === 0) {
          state.list = notifications
        } else {
          state.list = [...state.list, ...notifications]
        }
        state.hasNew = notifications.some((item) => item.isNew)

        state.totalCount = action.payload.totalCount
        state.pageInfo = action.payload.pageInfo

        state.isLoading = false
      })

      .addCase(fetchNotifications.rejected, (state) => {
        // state.list = [];
        state.isLoading = false
      })
  },
  initialState,
  name: 'notification',
  reducers: {
    readNotifications: (state) => {
      const notifications = state.list.map((item) => ({
        ...item,
        isNew: isNewNotification(item),
      }))

      state.list = notifications
      state.hasNew = notifications.some((item) => item.isNew)
    },

    setType: (state, action: PayloadAction<NotificationType | 'ALL'>) => {
      state.selectedType = action.payload
    },
  },
})

export const { readNotifications, setType } = NotificationSlice.actions
export default NotificationSlice
