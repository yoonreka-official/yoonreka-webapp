import { createQuestion } from '~/api/question.api.ts'
import { useAppDispatch, useAppSelector } from '~/stores'
import {
  fetchQuestions,
  setLectureId,
  setSelectedUserType,
} from '~/stores/QuestionSlice.ts'
import { ClientCreateInquiryInput, InquiryWho } from '~/types/api'

const useQuestions = () => {
  const state = useAppSelector((state) => state.question)

  const dispatch = useAppDispatch()

  const fetchData = async (userType = InquiryWho.Student) => {
    handleChangeType(userType)

    try {
      await dispatch(fetchQuestions(userType))
    } catch (e) {
      console.error(e)
    }
  }

  const handleCreateQuestion = async (body: ClientCreateInquiryInput) => {
    try {
      await createQuestion(body)
      handleLectureId(body.lectureId)
      fetchData(body.who)
    } catch (e) {
      console.error(e)
    }
  }

  const handleLectureId = (id?: string) => {
    dispatch(setLectureId(id))
  }

  const handleChangeType = (type: InquiryWho) => {
    dispatch(setSelectedUserType(type))
  }

  return {
    state,
    fetchData,
    handleCreateQuestion,
    handleChangeType,
    handleLectureId,
  }
}

export default useQuestions
