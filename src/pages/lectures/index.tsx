import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import useLectures from '~/hooks/useLectures.ts'
import useLoading from '~/hooks/useLoading.ts'
import Container from '~/layouts/Container.tsx'
import ScreenBase from '~/layouts/ScreenBase.tsx'
import LectureAttachmentViewer from '~/pages/lectures/LectureAttachmentViewer.tsx'
import LectureFilter from '~/pages/lectures/LectureFilter.tsx'
import LectureHeader from '~/pages/lectures/LectureHeader.tsx'
import { StudyMaterials } from './StudyMaterials'

function LecturesPage() {
  const {
    fetchData,
    initializeLesson,
    state: { isLoading },
  } = useLectures()

  const [params] = useSearchParams()
  const lectureId = params.get('lectureId')
  const lessonDate = params.get('date')

  const [type, setType] = useState<'materials' | 'study-materials'>('materials')

  useLoading(isLoading)

  useEffect(() => {
    ;(async () => {
      const lecture = await fetchData(lectureId || undefined)

      if (lecture) {
        initializeLesson(lecture, lessonDate)
      }
    })()
  }, [])

  return (
    <ScreenBase header={<LectureHeader onTypeChange={setType} />}>
      {type === 'materials' ? (
        <Container>
          <LectureFilter />
          <LectureAttachmentViewer />
        </Container>
      ) : (
        <Container>
          <StudyMaterials />
        </Container>
      )}
    </ScreenBase>
  )
}

export default LecturesPage
