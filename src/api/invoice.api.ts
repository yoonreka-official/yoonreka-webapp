import { gql } from '@apollo/client'

import { appolo } from '~/utils/apollo.util.ts'

import type {
  Invoice,
  InvoiceParams,
  InvoiceRequestBody,
} from '~/types/invoice.type.ts'

export const getInvoices = (params: InvoiceParams) => {
  return appolo.query<{ myLectureInvoices: Invoice[] }>({
    query: gql`
      query MyLectureInvoices($filter: ClientLectureInvoiceFilterInput) {
        myLectureInvoices(filter: $filter) {
          id
          method
          paidAt
          price
          state
          type
          userMemo
          updatedAt
          isRepeat
          dueDate
          createdAt
          comment
          link
          books {
            id
            price
            title
          }
          lecture {
            id
            title
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: { filter: params },
  })
}

export const updateInvoice = (body: InvoiceRequestBody) => {
  return appolo.mutate({
    mutation: gql`
      mutation RequestLectureInvoice(
        $input: ClientRequestLectureInvoiceInput!
      ) {
        requestLectureInvoice(input: $input) {
          id
          method
          paidAt
          state
          price
          type
          userMemo
        }
      }
    `,
    variables: { input: body },
  })
}
