import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import useGrades from '~/hooks/useGrades.ts'
import useLoading from '~/hooks/useLoading.ts'
import Container from '~/layouts/Container.tsx'
import ScreenBase from '~/layouts/ScreenBase.tsx'
import GradeHeader from '~/pages/grades/GradeHeader.tsx'
import GradeTabContainer from '~/pages/grades/GradeTabContainer.tsx'
import { GradeType } from '~/types/grades.type.ts'

function GradesPage() {
  const { fetchData, handleChangeTab, handleChangeType } = useGrades()

  const { toggleLoading } = useLoading()

  const [params] = useSearchParams()
  const lectureId = params.get('lectureId')

  useEffect(() => {
    ;(async () => {
      toggleLoading(true)
      await fetchData(lectureId || undefined)
      toggleLoading(false)
    })()

    return () => {
      handleChangeTab('daily', false)
      handleChangeType(GradeType.DEFAULT, false)
    }
  }, [])

  return (
    <ScreenBase header={<GradeHeader />}>
      <Container>
        <GradeTabContainer />
      </Container>
    </ScreenBase>
  )
}

export default GradesPage
