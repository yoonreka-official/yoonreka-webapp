import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getLectureById } from '~/api/lectures.api.ts';

import type { PayloadAction } from '@reduxjs/toolkit';

import type {
  LectureDetail,
  LectureDetailLesson,
} from '~/types/lectures.type.ts';
import type { Nullable } from '~/types/utils/nullable.type.ts';

export interface LectureState {
  lecture: Nullable<LectureDetail>;
  lesson: Nullable<LectureDetailLesson>;
  isLoading: boolean;
}

const initialState: LectureState = {
  lecture: null,
  lesson: null,
  isLoading: false,
};

export const fetchLectureById = createAsyncThunk<LectureDetail, string>(
  'lecture/fetchLectureById',
  async (lectureId, { rejectWithValue }) => {
    try {
      const { data } = await getLectureById(lectureId);
      return Promise.resolve(data.myLecture);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const LectureSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchLectureById.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchLectureById.fulfilled, (state, action) => {
        state.lecture = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchLectureById.rejected, state => {
        state.lecture = null;
        state.isLoading = false;
      });
  },
  initialState,
  name: 'lecture',
  reducers: {
    setLesson: (
      state,
      action: PayloadAction<Nullable<LectureDetailLesson>>,
    ) => {
      state.lesson = action.payload;
    },
  },
});

export const { setLesson } = LectureSlice.actions;
export default LectureSlice;
