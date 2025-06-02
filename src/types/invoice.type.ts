import type { Nullable, NullableString } from '~/types/utils/nullable.type.ts'
import { InvoiceMethod, InvoiceType } from './api'

export enum InvoiceState {
  FAILED = 'FAILED', // 미납
  PAID = 'PAID', // 납부완료
  PENDING = 'PENDING', // 대기중
}

export interface InvoiceParams {
  lectureIds?: string[]
  methods?: InvoiceMethod[]
  states?: InvoiceState[]
  types?: InvoiceType[]
}

export interface InvoiceRequestBody {
  lectureInvoiceId: string
  method: InvoiceMethod
  userMemo?: string
}

export interface InvoiceBook {
  id: string
  price: number
  title: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __typename: 'Book'
}

export interface InvoiceLecture {
  id: string
  title: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __typename: 'Lecture'
}

export interface Invoice {
  id: string
  state: InvoiceState
  type: InvoiceType
  method: Nullable<InvoiceMethod>
  paidAt: NullableString
  price: number

  userMemo: NullableString
  isRepeat: boolean
  dueDate: string
  comment: NullableString
  link: NullableString

  books: Nullable<InvoiceBook[]>
  lecture: Nullable<InvoiceLecture>

  createdAt: number
  updatedAt: number
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __typename: 'LectureInvoice'
}
