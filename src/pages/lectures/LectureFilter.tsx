import dayjs from 'dayjs'

import Flex from '~/components/display/Flex.tsx'
import Select from '~/components/inputs/Select.tsx'
import useAuth from '~/hooks/useAuth.tsx'

import 'dayjs/locale/ko'

import useLectures from '~/hooks/useLectures.ts'

dayjs.locale('ko')

function LectureFilter() {
  const {
    state: { authUser },
  } = useAuth()

  const {
    state: { lecture, lesson: selectedLesson },
    fetchData,
    selectLesson,
    initializeLesson,
  } = useLectures()

  return (
    <Flex direction="column" gap={8} style={{ marginBottom: 8 }}>
      <Select
        value={lecture?.id}
        options={authUser?.lectures.map((item) => ({
          label: item.title,
          value: item.id,
        }))}
        onChange={async (value) => {
          const lecture = await fetchData(value)
          if (lecture) {
            initializeLesson(lecture)
          }
        }}
      />

      <Select
        value={selectedLesson?.date}
        placeholder="수업 날짜를 선택해주세요."
        options={lecture?.lessons.map((item) => ({
          label: dayjs(item.date).format('YYYY.MM.DD ddd'),
          value: item.date,
        }))}
        onChange={(value) => {
          selectLesson(lecture?.lessons.find((item) => item.date === value))
        }}
      />
    </Flex>
  )
}

export default LectureFilter
