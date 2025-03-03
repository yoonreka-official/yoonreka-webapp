import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { getMyLessons } from '~/api/schedules.api.ts';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Dayjs } from 'dayjs';

import type { GetMyLessonsFilter, Lesson } from '~/types/schedules.type.ts';

export interface SchedulesState {
  isLoading: boolean;
  selectedMonth?: Dayjs;
  selectedDate?: Dayjs;
  list: Lesson[];
  selectedEvents: Lesson[];
}

const initialState: SchedulesState = {
  isLoading: true,

  selectedMonth: dayjs(),
  selectedDate: dayjs(),

  list: [],
  selectedEvents: [],
};

export const fetchLessons = createAsyncThunk<Lesson[], GetMyLessonsFilter>(
  'schedules/fetchLessons',
  async (filter, { rejectWithValue }) => {
    try {
      const { data } = await getMyLessons(filter);
      return Promise.resolve(data.myLessons);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const SchedulesSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchLessons.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchLessons.rejected, state => {
        state.list = [];
        state.isLoading = false;
      });
  },
  initialState,
  name: 'schedules',
  reducers: {
    setSelectedMonth: (state, action: PayloadAction<Dayjs | undefined>) => {
      state.selectedMonth = action.payload;
    },

    setSelectedDate: (state, action: PayloadAction<Dayjs | undefined>) => {
      state.selectedDate = action.payload;

      state.selectedEvents = state.list.filter(item => {
        return (
          dayjs(item.date).format('YYYY-MM-DD') ===
          action.payload?.format('YYYY-MM-DD')
        );
      });
    },
  },
});

export const { setSelectedMonth, setSelectedDate } = SchedulesSlice.actions;
export default SchedulesSlice;
