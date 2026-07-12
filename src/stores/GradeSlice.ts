import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getLectureGrades } from '~/api/grades.api.ts'
import { COLORS } from '~/configs/theme.ts'
import { GradeType } from '~/types/grades.type.ts'
import {
  buildGradeStatistics,
  getCumulativeLabels,
  getInitialCumulativeLabel,
} from '~/utils/grades.util.ts'

import type { PayloadAction } from '@reduxjs/toolkit'

import type {
  GradeFormLabelGroup,
  LectureGradeDetail,
  LectureGradeFormLabel,
  LectureGradeStatistics,
} from '~/types/grades.type.ts'
import type { Nullable } from '~/types/utils/nullable.type.ts'

export type GradeTab = 'daily' | 'total' | 'monthly'

const DEFAULT_COLOR = COLORS.STATUS['06']

export interface GradeState {
  currentRequestId?: string
  error?: string
  isLoading: boolean
  lectureId?: string

  lecture: Nullable<LectureGradeDetail>

  activeTab: GradeTab
  gradeType: GradeType

  labelGroups: GradeFormLabelGroup[]
  testLabels: LectureGradeFormLabel[]
  selectedLabel?: LectureGradeFormLabel & { comment?: string }
  labelColor?: string

  statistics?: LectureGradeStatistics[]
}

const initialState: GradeState = {
  lecture: null,

  activeTab: 'daily',
  gradeType: GradeType.DEFAULT,

  labelGroups: [],
  testLabels: [],
  labelColor: DEFAULT_COLOR,
  isLoading: true,
}

export const fetchGradesByLectureId = createAsyncThunk<
  LectureGradeDetail,
  { lectureId: string; gradeType: GradeType }
>(
  'grade/fetchGradesByLectureId',
  async ({ lectureId, gradeType }, { rejectWithValue }) => {
    try {
      const { data } = await getLectureGrades(lectureId, gradeType)
      return Promise.resolve(data.myLecture)
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

const GradeSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchGradesByLectureId.pending, (state, action) => {
        state.currentRequestId = action.meta.requestId
        state.error = undefined
        state.isLoading = true
        state.lectureId = action.meta.arg.lectureId
        state.lecture = null
        state.labelGroups = []
        state.testLabels = []
        state.selectedLabel = undefined
        state.labelColor = DEFAULT_COLOR
        state.statistics = undefined
      })

      .addCase(fetchGradesByLectureId.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return

        const lecture = action.payload

        state.lecture = lecture
        state.currentRequestId = undefined

        if (lecture) {
          // ? 데일리 성적 출력시 사용할 라벨 그룹
          const labelGroups: GradeFormLabelGroup[] = []
          state.lecture.gradeFormLabels.forEach((label) => {
            const labelGroup = labelGroups.find(
              (item) => item.type === label.type,
            )
            if (labelGroup) {
              labelGroup.children.push(label)
            } else {
              labelGroups.push({ type: label.type, children: [label] })
            }
          })
          state.labelGroups = labelGroups

          // ? 누적 성적 그래프 태그 기본값 설정
          state.testLabels = getCumulativeLabels(
            lecture.gradeFormLabels,
            action.meta.arg.gradeType,
          )

          const selectedLabel = getInitialCumulativeLabel(
            state.testLabels,
            lecture.lessons,
          )
          if (selectedLabel) {
            state.selectedLabel = {
              ...selectedLabel,
              comment: lecture.myLabelComments.find(
                (item) => item.labelId === selectedLabel.id,
              )?.comment,
            }
            state.statistics = buildGradeStatistics(
              lecture.lessons,
              selectedLabel,
            )
          }
        }
        state.isLoading = false
      })

      .addCase(fetchGradesByLectureId.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return

        state.currentRequestId = undefined
        state.error = '성적 데이터를 불러오지 못했습니다.'
        state.lecture = null
        state.isLoading = false
      })
  },
  initialState,
  name: 'lecture',
  reducers: {
    clearGrades: (state) => {
      state.currentRequestId = undefined
      state.error = undefined
      state.isLoading = false
      state.lectureId = undefined
      state.lecture = null
      state.labelGroups = []
      state.testLabels = []
      state.selectedLabel = undefined
      state.labelColor = DEFAULT_COLOR
      state.statistics = undefined
    },

    setActiveTab: (state, action: PayloadAction<GradeTab>) => {
      state.activeTab = action.payload
    },

    setGradeType: (state, action: PayloadAction<GradeType>) => {
      state.gradeType = action.payload
    },

    setLabel: (
      state,
      action: PayloadAction<LectureGradeFormLabel | undefined>,
    ) => {
      const selectedLabel = action.payload

      state.selectedLabel = selectedLabel

      if (state.lecture && selectedLabel) {
        state.selectedLabel = {
          ...selectedLabel,
          comment: state.lecture.myLabelComments.find(
            (item) => item.labelId === selectedLabel.id,
          )?.comment,
        }
        state.statistics = buildGradeStatistics(
          state.lecture.lessons,
          selectedLabel,
        )
      } else {
        state.statistics = undefined
      }
    },

    setLabelColor: (state, action: PayloadAction<string | undefined>) => {
      state.labelColor = action.payload
    },
  },
})

export const {
  clearGrades,
  setActiveTab,
  setGradeType,
  setLabel,
  setLabelColor,
} = GradeSlice.actions
export default GradeSlice
