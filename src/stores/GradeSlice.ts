import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getLectureGrades } from '~/api/grades.api.ts';
import { COLORS } from '~/configs/theme.ts';
import { GradeType } from '~/types/grades.type.ts';
import calculator from '~/utils/calculator.util.ts';

import type { PayloadAction } from '@reduxjs/toolkit';

import type {
  GradeFormLabelGroup,
  LectureGradeDetail,
  LectureGradeFormLabel,
  LectureGradeStatistics,
} from '~/types/grades.type.ts';
import type { Nullable } from '~/types/utils/nullable.type.ts';

export type GradeTab = 'daily' | 'total';

const DEFAULT_COLOR = COLORS.STATUS['06'];

export interface GradeState {
  isLoading: boolean;

  lecture: Nullable<LectureGradeDetail>;

  activeTab: GradeTab;
  gradeType: GradeType;

  labelGroups: GradeFormLabelGroup[];
  testLabels: LectureGradeFormLabel[];
  selectedLabel?: LectureGradeFormLabel & { comment?: string };
  labelColor?: string;

  statistics?: LectureGradeStatistics[];
}

const initialState: GradeState = {
  lecture: null,

  activeTab: 'daily',
  gradeType: GradeType.DEFAULT,

  labelGroups: [],
  testLabels: [],
  labelColor: DEFAULT_COLOR,
  isLoading: true,
};

export const fetchGradesByLectureId = createAsyncThunk<
  LectureGradeDetail,
  { lectureId: string; gradeType: GradeType }
>(
  'grade/fetchGradesByLectureId',
  async ({ lectureId, gradeType }, { rejectWithValue }) => {
    try {
      const { data } = await getLectureGrades(lectureId, gradeType);
      return Promise.resolve(data.myLecture);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const GradeSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchGradesByLectureId.pending, state => {
        state.isLoading = true;
      })

      .addCase(fetchGradesByLectureId.fulfilled, (state, action) => {
        const lecture = action.payload;

        state.lecture = lecture;

        if (lecture) {
          // ? 데일리 성적 출력시 사용할 라벨 그룹
          const labels: GradeFormLabelGroup[] = [];
          state.lecture.gradeFormLabels.forEach(label => {
            const labelType = labels.find(item => item.type === label.type);
            if (labelType) {
              labelType.children.push(label);
            } else {
              labels.push({ type: label.type, children: [label] });
            }
          });
          state.labelGroups = labels;

          // ? 누적 성적 그래프 태그 기본값 설정
          state.testLabels = lecture.gradeFormLabels.filter(item => {
            return action.meta.arg.gradeType === GradeType.DEFAULT
              ? item.type === '테스트'
              : item.type === '과제성적';
          });
        }
        state.isLoading = false;
      })

      .addCase(fetchGradesByLectureId.rejected, state => {
        state.lecture = null;
        state.isLoading = false;
      });
  },
  initialState,
  name: 'lecture',
  reducers: {
    setActiveTab: (state, action: PayloadAction<GradeTab>) => {
      state.activeTab = action.payload;
    },

    setGradeType: (state, action: PayloadAction<GradeType>) => {
      state.gradeType = action.payload;
    },

    setLabel: (
      state,
      action: PayloadAction<LectureGradeFormLabel | undefined>,
    ) => {
      const selectedLabel = action.payload;

      state.selectedLabel = selectedLabel;

      // ? 차트 데이터 계산
      const data: LectureGradeStatistics[] = [];

      if (state.lecture && selectedLabel) {
        state.selectedLabel = {
          ...selectedLabel,
          comment: state.lecture.myLabelComments.find(
            item => item.labelId === selectedLabel.id,
          )?.comment,
        };

        state.lecture.lessons.forEach(lesson => {
          const gradeData = lesson.myLessonGrade?.data?.find(
            item => item.id === selectedLabel.id,
          );

          const top30Data = lesson.topThirtyPercentGrades.find(
            item => item.labelId === selectedLabel.id,
          );

          const highestData = lesson.topGrades.find(
            item => item.labelId === selectedLabel.id,
          );

          data.push({
            id: selectedLabel.id,
            date: lesson.date,
            comment: lesson.myLessonGrade?.comment,
            type: selectedLabel.type,
            label: selectedLabel.value,
            value: gradeData?.value || null,
            maxValue: gradeData?.maxValue || null,
            score:
              calculator.rates(gradeData?.value, gradeData?.maxValue) || null,
            top30: calculator.rates(top30Data?.value, gradeData?.maxValue),
            highest: calculator.rates(highestData?.value, gradeData?.maxValue),
          });
        });
      }

      const chartLength =
        data.filter(item => item.value && item.maxValue).length > 8 ? 16 : 8;
      state.statistics = data.filter((_, i) => i < chartLength);
    },

    setLabelColor: (state, action: PayloadAction<string | undefined>) => {
      state.labelColor = action.payload;
    },
  },
});

export const { setActiveTab, setGradeType, setLabel, setLabelColor } =
  GradeSlice.actions;
export default GradeSlice;
