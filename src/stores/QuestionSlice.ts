import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getMyQuestions } from '~/api/question.api.ts';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { QuestionUser } from '~/types/question.type.ts';

export interface QuestionState {
  isLoading: boolean;
  // eslint-disable-next-line
  list: any[];

  selectedLectureId?: string;
}

const initialState: QuestionState = {
  list: [],
  isLoading: false,
};

// eslint-disable-next-line
export const fetchQuestions = createAsyncThunk<any[], QuestionUser>(
  'question/fetchMyQuestions',
  async (userType, { rejectWithValue }) => {
    try {
      const { data } = await getMyQuestions({ whoes: userType });
      return Promise.resolve(data.myInquiries);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const QuestionSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchQuestions.pending, state => {
        state.isLoading = true;
      })

      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchQuestions.rejected, state => {
        state.list = [];
        state.isLoading = false;
      });
  },
  initialState,
  name: 'question',
  reducers: {
    setLectureId: (state, action: PayloadAction<string | undefined>) => {
      state.selectedLectureId = action.payload;
    },
  },
});

export const { setLectureId } = QuestionSlice.actions;
export default QuestionSlice;
