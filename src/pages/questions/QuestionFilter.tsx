import dayjs from 'dayjs'
import { useEffect } from 'react'

import Flex from '~/components/display/Flex.tsx'
import Select from '~/components/inputs/Select.tsx'

import 'dayjs/locale/ko'

import useAuth from '~/hooks/useAuth.tsx'
import useQuestions from '~/hooks/useQuestions.ts'

dayjs.locale('ko')

function QuestionFilter() {
  const {
    state: { authUser },
  } = useAuth()

  const {
    state: { selectedLectureId },
    handleLectureId,
  } = useQuestions()

  useEffect(() => {
    handleLectureId(authUser?.lectures[0]?.id)
  }, [])

  return (
    <Flex direction="column" gap={8} style={{ marginBottom: 8 }}>
      <Select
        value={selectedLectureId}
        options={authUser?.lectures.map((item) => ({
          label: item.title,
          value: item.id,
        }))}
        onChange={(value) => {
          handleLectureId(value)
        }}
      />
    </Flex>
  )
}

export default QuestionFilter
