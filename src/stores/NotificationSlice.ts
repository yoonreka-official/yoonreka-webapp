import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getNotifications } from '~/api/notification.api.ts';

import type {
  FormattedNotificationResponse,
  Notification,
  NotificationPageInfo,
  NotificationParams,
} from '~/types/notification.type.ts';

export interface NotificationState {
  params: NotificationParams;
  list: Notification[];
  pageInfo: NotificationPageInfo;
  totalCount: number;

  isLoading: boolean;
  hasNew: boolean;
}

const initialState: NotificationState = {
  params: {
    pagination: {
      offset: 0,
      limit: 20,
    },
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
};

export const fetchNotifications = createAsyncThunk<
  FormattedNotificationResponse,
  NotificationParams | undefined
>('notification/fetchNotifications', async (params, { rejectWithValue }) => {
  try {
    const res = await getNotifications(params || initialState.params);
    return Promise.resolve(res);
  } catch (err) {
    return rejectWithValue(err);
  }
});

const NotificationSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.pending, (state, action) => {
        state.isLoading = true;

        if (action.meta.arg) {
          state.params = action.meta.arg;
        }
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        // TODO: isNew 처리할 것!!
        state.list = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.pageInfo = action.payload.pageInfo;

        state.isLoading = false;
      })

      .addCase(fetchNotifications.rejected, state => {
        // state.list = [];
        state.isLoading = false;
      });
  },
  initialState,
  name: 'notification',
  reducers: {},
});

// export const { setLesson } = NotificationSlice.actions;
export default NotificationSlice;
