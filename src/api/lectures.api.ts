import { gql } from '@apollo/client'

import { appolo } from '~/utils/apollo.util.ts'

import type { LectureDetail } from '~/types/lectures.type.ts'

export const getLectureById = (myLectureId: string) => {
  return appolo.query<{ myLecture: LectureDetail }>({
    query: gql`
      query MyLecture($myLectureId: ID!) {
        myLecture(id: $myLectureId) {
          id
          title
          lessons {
            id
            date
            attachment {
              mimeType
              id
              size
              url
              filename
              createdAt
              updatedAt
            }
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: { myLectureId },
  })
}
