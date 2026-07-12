import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Flex from '~/components/display/Flex.tsx'
import Caption from '~/components/typography/Caption.tsx'
import { COLORS } from '~/configs/theme.ts'
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
    if (!scrollId) return

    const timeoutId = window.setTimeout(() => {
      setScroll()
    }, 400)

    return () => window.clearTimeout(timeoutId)
  }, [lecture, scrollId])

  if (!lecture?.lessons.length) {
    return (
      <Flex items="center" justify="center" style={{ minHeight: 128 }}>
        <Caption color={COLORS.FONT['30']}>
          데일리 성적 데이터가 없습니다.
        </Caption>
      </Flex>
    )
  }

  return (
    <Flex direction="column">
      {lecture.lessons.map((lesson) => (
        <CardDailyGrade
          key={`${lecture.id}:${lesson.date}`}
          defaultOpen={queryDate === dayjs(lesson.date).format('YYYY-MM-DD')}
          lesson={lesson}
          scrollId={`${lectureId}:${dayjs(lesson.date).format('YYYY-MM-DD')}`}
        />
      ))}
    </Flex>
  )
}

export default GradeDailyTab
