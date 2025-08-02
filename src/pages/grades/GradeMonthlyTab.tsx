import { useQuery } from '@apollo/client'

import useAuth from '~/hooks/useAuth'
import { GetGradeMonthlyTabDocument, LessonGradeRelayOrder } from '~/types/api'
import { MonthlyGrades } from './MonthlyGrades'

function GradeMonthlyTab() {
  const {
    state: { authUser },
  } = useAuth()

  const { previousData, data: lessonGradesData = previousData } = useQuery(
    GetGradeMonthlyTabDocument,
    {
      fetchPolicy: 'network-only',
      variables: {
        filter: {
          userIds: authUser?.id ? [authUser.id] : [],
        },
        order: LessonGradeRelayOrder.LessonDate,
        asc: true,
      },
    },
  )

  return <MonthlyGrades lessonGrades={lessonGradesData?.lessonGrades ?? []} />
}

export default GradeMonthlyTab
