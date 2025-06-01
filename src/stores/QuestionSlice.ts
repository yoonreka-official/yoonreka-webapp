import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getMyQuestions } from '~/api/question.api.ts'

import type { PayloadAction } from '@reduxjs/toolkit'
import { Inquiry, InquiryWho } from '~/types/api'

export interface QuestionState {
  isLoading: boolean
  // eslint-disable-next-line
  list: Inquiry[]

  selectedUserType: InquiryWho
  selectedLectureId?: string
}

const initialState: QuestionState = {
  list: [],
  isLoading: false,
  selectedUserType: InquiryWho.Student,
}

// eslint-disable-next-line
export const fetchQuestions = createAsyncThunk<Inquiry[], InquiryWho>(
  'question/fetchMyQuestions',
  async (userType, { rejectWithValue }) => {
    try {
      const { data } = await getMyQuestions({ whoes: userType })
      return Promise.resolve(data.myInquiries)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

const QuestionSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true
      })

      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.list = action.payload
        state.isLoading = false
      })

      .addCase(fetchQuestions.rejected, (state) => {
        state.list = []
        state.isLoading = false
      })
  },
  initialState,
  name: 'question',
  reducers: {
    setLectureId: (state, action: PayloadAction<string | undefined>) => {
      state.selectedLectureId = action.payload
    },
    setSelectedUserType: (state, action: PayloadAction<InquiryWho>) => {
      state.selectedUserType = action.payload
    },
  },
})

export const { setLectureId, setSelectedUserType } = QuestionSlice.actions
export default QuestionSlice
