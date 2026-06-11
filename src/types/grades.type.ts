import type { AttachmentFile } from '~/types/lectures.type.ts'
import type { Nullable, NullableString } from '~/types/utils/nullable.type.ts'
import { Retest, Supplementary } from './api'

/** 출석 상태 */
export enum AttendanceStatus {
  /** 결석 */
  ABSENT = 'ABSENT',
  /** 조퇴 */
  EARLY_LEAVE = 'EARLY_LEAVE',
  /** 지각 */
  LATE = 'LATE',
  /** 출석 */
  PRESENT = 'PRESENT',
}

/** 성적 유형 */
export enum GradeType {
  /** 데일리 성적 */
  DEFAULT = 'DEFAULT',
  /** 모의고사 */
  EXAM = 'EXAM',
}

export interface MyLessonGrade {
  gradeType: GradeType
  attendanceStatus: AttendanceStatus
  supplementary: Supplementary
  retest: Retest
  data: LectureGradeData[]

  comment: string

  createdAt: number
  updatedAt: number
}

export interface LectureGradeLesson {
  attachment: Nullable<AttachmentFile>
  date: string
  myLessonGrade: Nullable<MyLessonGrade>
  /** 시험(자동 채점, EXAM) 성적 - 데일리 카드의 시험 항목/재시험 뱃지에 사용 */
  myExamLessonGrade: Nullable<Pick<MyLessonGrade, 'retest' | 'data'>>
  topGrades: LectureTopGrade[]
  topThirtyPercentGrades: LectureTopGrade[]
}

export interface LectureGradeData {
  id: string
  label: string
  maxValue: NullableString
  type: string
  value: NullableString
  value2: NullableString
}

export interface LectureGradeFormLabel {
  id: string
  type: string
  value: string
}

export interface GradeFormLabelGroup {
  type: string
  children: LectureGradeFormLabel[]
}

export interface LectureTopGrade {
  labelId: string
  value: number
}

export interface LectureLabelComment {
  labelId: string
  comment: string
}

export interface LectureGradeDetail {
  id: string
  title: string
  gradeFormLabels: LectureGradeFormLabel[]
  /** 시험(EXAM) 성적 항목들 - 조회 gradeType과 무관하게 항상 EXAM 기준 */
  examGradeFormLabels: LectureGradeFormLabel[]
  lessons: LectureGradeLesson[]
  myLabelComments: LectureLabelComment[]
}

export interface LectureGradeStatistics extends LectureGradeData {
  date: string
  comment?: string
  score: Nullable<number>
  top30: number
  highest: number
}
