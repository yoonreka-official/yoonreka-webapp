import { useMemo } from 'react'

import Body from '~/components/typography/Body.tsx'
import NoData from '~/components/utils/NoData.tsx'
import { COLORS } from '~/configs/theme.ts'
import useQuestions from '~/hooks/useQuestions.ts'
import CardQuestion from '~/pages/questions/CardQuestion.tsx'

function QuestionList() {
  const {
    state: { list, selectedLectureId },
  } = useQuestions()

  const questions = useMemo(() => {
    return list.filter((item) => item.lecture?.id === selectedLectureId)
  }, [list, selectedLectureId])

  if (!selectedLectureId) {
    return null
  }
  if (!questions.length) {
    return (
      <NoData
        description={
          <Body color={COLORS.FONT['30']} size={14}>
            등록된 질문이 없습니다.
          </Body>
        }
        // height="80%"
        disableWrapper
      />
    )
  }
  return (
    <div>
      {questions.map((question) => (
        <CardQuestion key={question.id} question={question} />
      ))}
    </div>
  )
}

export default QuestionList
