import { InquiryWho } from '~/types/api'

export interface QuestionParams {
  answered?: boolean
  whoes: InquiryWho
}

export interface QuestionBody {
  who: InquiryWho
  lectureId: string
  title: string
  description: string
  bookInfo?: string
  fileIds?: string[]
}
