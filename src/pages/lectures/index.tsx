import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import useLectures from '~/hooks/useLectures.ts'
import useLoading from '~/hooks/useLoading.ts'
import Container from '~/layouts/Container.tsx'
import ScreenBase from '~/layouts/ScreenBase.tsx'
import LectureAttachmentViewer from '~/pages/lectures/LectureAttachmentViewer.tsx'
import LectureFilter from '~/pages/lectures/LectureFilter.tsx'
import LectureHeader from '~/pages/lectures/LectureHeader.tsx'
import LessonVideos from '~/pages/lectures/LessonVideos.tsx'
import { StudyMaterials } from './StudyMaterials'

import type { LectureTabType } from '~/pages/lectures/LectureHeader.tsx'

function LecturesPage() {
  const {
    fetchData,
    initializeLesson,
    state: { isLoading },
  } = useLectures()

  const [params] = useSearchParams()
  const lectureId = params.get('lectureId')
  const lessonDate = params.get('date')

  // ? 수업자료 딥링크(lectureId/date 파라미터)로 진입한 경우 기존처럼 수업자료 탭 유지
  const [type, setType] = useState<LectureTabType>(
    lectureId || lessonDate ? 'materials' : 'videos',
  )

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
    <ScreenBase header={<LectureHeader defaultType={type} onTypeChange={setType} />}>
      {type === 'videos' && (
        <Container>
          <LessonVideos />
        </Container>
      )}

      {type === 'materials' && (
        <Container>
          <LectureFilter />
          <LectureAttachmentViewer />
        </Container>
      )}

      {type === 'study-materials' && (
        <Container>
          <StudyMaterials />
        </Container>
      )}
    </ScreenBase>
  )
}

export default LecturesPage
