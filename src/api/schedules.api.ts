import { gql } from '@apollo/client'

import { appolo } from '~/utils/apollo.util.ts'

import type { GetMyLessonsFilter, Lesson } from '~/types/schedules.type.ts'

export const getMyLessons = (filter: GetMyLessonsFilter) => {
  return appolo.query<{ myLessons: Lesson[] }>({
    query: gql`
      query GetMyLessons($filter: ClientLessonFilterInput) {
        myLessons(filter: $filter, order: DATE, asc: true) {
          id
          date
          startTime
          endTime

          lecture {
            id
            title
            place
            book {
              id
              title
            }
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: { filter },
  })
}
