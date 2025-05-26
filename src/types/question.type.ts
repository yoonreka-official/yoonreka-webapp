export enum QuestionUser {
  PARENT = 'PARENT',
  STUDENT = 'STUDENT',
}

export interface QuestionParams {
  answered?: boolean
  whoes: QuestionUser
}

export interface QuestionBody {
  who: QuestionUser
  lectureId: string
  title: string
  description: string
  bookInfo?: string
}
