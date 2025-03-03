import { createQuestion } from '~/api/question.api.ts';
import { useAppDispatch, useAppSelector } from '~/stores';
import { fetchQuestions, setLectureId } from '~/stores/QuestionSlice.ts';
import { QuestionUser } from '~/types/question.type.ts';

import type { QuestionBody } from '~/types/question.type.ts';

const useQuestions = () => {
  const state = useAppSelector(state => state.question);

  const dispatch = useAppDispatch();

  const fetchData = async (userType = QuestionUser.STUDENT) => {
    try {
      await dispatch(fetchQuestions(userType));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateQuestion = async (body: QuestionBody) => {
    try {
      await createQuestion(body);
      handleLectureId(body.lectureId);
      fetchData(body.who);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLectureId = (id?: string) => {
    dispatch(setLectureId(id));
  };

  return { state, fetchData, handleCreateQuestion, handleLectureId };
};

export default useQuestions;
