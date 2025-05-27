import { gql } from '@apollo/client'

import { appolo } from '~/utils/apollo.util.ts'

import { ClientCreateInquiryInput, CreateInquiryDocument } from '~/types/api'
import type { QuestionParams } from '~/types/question.type.ts'

export const getMyQuestions = (filter: QuestionParams) => {
  // eslint-disable-next-line
  return appolo.query<{ myInquiries: any[] }>({
    query: gql`
      query MyInquiries($filter: ClientInquiryFilterInput) {
        myInquiries(filter: $filter) {
          answer
          answeredAt
          bookInfo
          createdAt
          description
          id
          lecture {
            id
            title
          }
          link
          title
          updatedAt
          who
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: { filter },
  })
}

export const createQuestion = (input: ClientCreateInquiryInput) => {
  return appolo.mutate({
    mutation: CreateInquiryDocument,
    variables: { input },
  })
}
