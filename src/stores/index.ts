import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import AuthSlice from '~/stores/AuthSlice.ts';
import GradeSlice from '~/stores/GradeSlice.ts';
import InvoiceSlice from '~/stores/InvoiceSlice.ts';
import LayoutSlice from '~/stores/LayoutSlice.ts';
import LectureSlice from '~/stores/LectureSlice.ts';
import NotificationSlice from '~/stores/NotificationSlice.ts';
import QuestionSlice from '~/stores/QuestionSlice.ts';
import SchedulesSlice from '~/stores/SchedulesSlice.ts';
import SchoolGradeSlice from '~/stores/SchoolGradeSlice.ts';

import type { TypedUseSelectorHook } from 'react-redux';

const combined = combineReducers({
  auth: AuthSlice.reducer,
  schedules: SchedulesSlice.reducer,
  lecture: LectureSlice.reducer,
  grade: GradeSlice.reducer,
  layout: LayoutSlice.reducer,
  question: QuestionSlice.reducer,
  notification: NotificationSlice.reducer,
  invoice: InvoiceSlice.reducer,
  schoolGrade: SchoolGradeSlice.reducer,
});

const rootReducer: typeof combined = (state, action) => {
  return combined(state, action);
};

export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
