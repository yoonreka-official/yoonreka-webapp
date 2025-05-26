import type { AttachmentFile } from '~/types/lectures.type.ts'
import type { NotificationPageInfo } from '~/types/notification.type.ts'

export enum SchoolGradeType {
  MIDTERM = 'MIDTERM', // 중간고사
  FINAL = 'FINAL', // 기말고사
  MOCK = 'MOCK', // 모의고사
}

export interface School {
  id: string
  name: string
  type: SchoolGradeType
}

export interface SchoolGrade {
  id: string
  type: SchoolGradeType
  grade: number
  level: number
  percentage: number
  rank: number
  score: number
  term: number
  totalCount: number

  school: School
  attachment: AttachmentFile
}

export interface SchoolGradeBody {
  schoolId: string

  type: SchoolGradeType
  fileId: string

  grade: number
  level: number
  percentage: number
  rank: number
  score: number
  term: number
  totalCount: number
}

export interface SchoolGradeUpdateBody extends SchoolGradeBody {
  id: string
}

export interface SchoolPagination {
  totalCount: number
  pageInfo: NotificationPageInfo
  edges: SchoolEdge[]
}

export interface SchoolEdge {
  edge: string
  node: School
}
