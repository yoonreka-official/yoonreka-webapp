import { useEffect } from 'react'

import useGrades from '~/hooks/useGrades.ts'
import useScroll from '~/hooks/useScroll.ts'
import GradeDailyTab from '~/pages/grades/GradeDailyTab.tsx'
import GradeTotalTab from '~/pages/grades/GradeTotalTab.tsx'
import GradeFilter from './GradeFilter'
import GradeMonthlyTab from './GradeMonthlyTab'

function GradeTabContainer() {
  const {
    state: { activeTab },
  } = useGrades()

  const { reset: scrollReset } = useScroll()

  useEffect(() => {
    scrollReset()
  }, [activeTab])

  return activeTab === 'daily' ? (
    <>
      <GradeFilter />
      <GradeDailyTab />
    </>
  ) : activeTab === 'total' ? (
    <>
      <GradeFilter />
      <GradeTotalTab />
    </>
  ) : (
    <>
      <GradeMonthlyTab />
    </>
  )
}

export default GradeTabContainer
