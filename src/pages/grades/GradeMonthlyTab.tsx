import { useQuery } from '@apollo/client'

import Caption from '~/components/typography/Caption.tsx'
import { COLORS } from '~/configs/theme.ts'
import {
  GetGradeMonthlyTabDocument,
  GradeType,
  LessonGradeRelayOrder,
} from '~/types/api'
import { MonthlyGrades } from './MonthlyGrades'

function GradeMonthlyTab() {
  const { data, error, loading } = useQuery(GetGradeMonthlyTabDocument, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: {
      filter: {
        gradeTypes: [GradeType.Default, GradeType.Exam],
      },
      order: LessonGradeRelayOrder.LessonDate,
      asc: true,
    },
  })

  if (loading) {
    return <MonthlyStatus message="월별 성적을 불러오는 중입니다." />
  }

  if (error) {
    return <MonthlyStatus isError message="월별 성적을 불러오지 못했습니다." />
  }

  if (!data?.lessonGrades.length) {
    return <MonthlyStatus message="월별 성적 데이터가 없습니다." />
  }

  return <MonthlyGrades lessonGrades={data.lessonGrades} />
}

function MonthlyStatus({
  isError = false,
  message,
}: {
  isError?: boolean
  message: string
}) {
  return (
    <div
      className="flex min-h-32 items-center justify-center rounded-2xl bg-white px-4"
      role={isError ? 'alert' : 'status'}
    >
      <Caption color={isError ? COLORS.STATUS['01'] : COLORS.FONT['30']}>
        {message}
      </Caption>
    </div>
  )
}

export default GradeMonthlyTab
