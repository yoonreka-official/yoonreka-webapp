import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getSchoolGrades } from '~/api/school-grade.api.ts';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { SchoolGrade } from '~/types/school-grades.type.ts';

export interface SchoolGradeState {
  isLoading: boolean;
  list: SchoolGrade[];

  selected?: SchoolGrade;
}

const initialState: SchoolGradeState = {
  list: [],
  isLoading: false,
};

export const fetchSchoolGrades = createAsyncThunk<SchoolGrade[]>(
  'schoolGrade/fetchSchoolGrades',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getSchoolGrades();
      return Promise.resolve(data.mySchoolReportCards);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const SchoolGradeSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchSchoolGrades.pending, state => {
        state.isLoading = true;
      })

      .addCase(fetchSchoolGrades.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchSchoolGrades.rejected, state => {
        state.list = [];
        state.isLoading = false;
      });
  },
  initialState,
  name: 'schoolGrade',
  reducers: {
    setSelected: (state, action: PayloadAction<SchoolGrade | undefined>) => {
      state.selected = action.payload;
    },
  },
});

export const { setSelected } = SchoolGradeSlice.actions;
export default SchoolGradeSlice;
