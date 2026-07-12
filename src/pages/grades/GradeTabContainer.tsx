import { useEffect } from 'react'

import Caption from '~/components/typography/Caption.tsx'
import { COLORS } from '~/configs/theme.ts'
import useGrades from '~/hooks/useGrades.ts'
import useScroll from '~/hooks/useScroll.ts'
import GradeDailyTab from '~/pages/grades/GradeDailyTab.tsx'
import GradeTotalTab from '~/pages/grades/GradeTotalTab.tsx'
import GradeFilter from './GradeFilter'
import GradeMonthlyTab from './GradeMonthlyTab'

function GradeTabContainer() {
  const {
    state: { activeTab, error, isLoading, lecture },
  } = useGrades()

  const { reset: scrollReset } = useScroll()

  useEffect(() => {
    scrollReset()
  }, [activeTab])

  if (activeTab === 'monthly') {
    return <GradeMonthlyTab />
  }

  let content
  if (isLoading) {
    content = <GradeStatus message="성적 데이터를 불러오는 중입니다." />
  } else if (error) {
    content = <GradeStatus isError message={error} />
  } else if (!lecture) {
    content = <GradeStatus message="성적 데이터가 없습니다." />
  } else {
    content = activeTab === 'daily' ? <GradeDailyTab /> : <GradeTotalTab />
  }

  return (
    <>
      <GradeFilter />
      {content}
    </>
  )
}

function GradeStatus({
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

export default GradeTabContainer
