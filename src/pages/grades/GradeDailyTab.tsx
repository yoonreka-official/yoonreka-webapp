import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Flex from '~/components/display/Flex.tsx'
import useGrades from '~/hooks/useGrades.ts'
import useScroll from '~/hooks/useScroll.ts'
import CardDailyGrade from '~/pages/grades/CardDailyGrade.tsx'

const NOTIFICATION_ITEM_HEIGHT = 68.33

function GradeDailyTab() {
  const {
    state: { lecture },
  } = useGrades()

  const { scrollTo } = useScroll()

  const [params] = useSearchParams()
  const lectureId = params.get('lectureId')
  const queryDate = params.get('date')
  const scrollId =
    queryDate && lectureId ? `${lectureId}:${queryDate}` : undefined

  const setScroll = () => {
    if (!lecture) return

    // ? 선택한 날짜의 인덱스 구해야함
    const selectedIndex =
      lecture.lessons.findIndex(
        (lesson) => queryDate === dayjs(lesson.date).format('YYYY-MM-DD'),
      ) + 1

    const y = NOTIFICATION_ITEM_HEIGHT * selectedIndex - 6
    scrollTo(y, 'smooth')
  }

  useEffect(() => {
    if (scrollId) {
      setTimeout(() => {
        setScroll()
      }, 400)
    }
  }, [lecture])

  return (
    <Flex direction="column">
      {lecture?.lessons.map((lesson, index) => (
        <CardDailyGrade
          key={index}
          defaultOpen={queryDate === dayjs(lesson.date).format('YYYY-MM-DD')}
          lesson={lesson}
          scrollId={`${lectureId}:${dayjs(lesson.date).format('YYYY-MM-DD')}`}
        />
      ))}
    </Flex>
  )
}

export default GradeDailyTab
