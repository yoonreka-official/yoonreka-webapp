import type { AttachmentFile } from '~/types/lectures.type.ts'
import type { Nullable, NullableString } from '~/types/utils/nullable.type.ts'

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
  data: LectureGradeData[]

  comment: string

  createdAt: number
  updatedAt: number
}

export interface LectureGradeLesson {
  attachment: Nullable<AttachmentFile>
  date: string
  myLessonGrade: Nullable<MyLessonGrade>
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
