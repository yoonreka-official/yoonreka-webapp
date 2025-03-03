import useAuth from '~/hooks/useAuth.tsx';
import { useAppDispatch, useAppSelector } from '~/stores';
import { fetchLectureById, setLesson } from '~/stores/LectureSlice.ts';

import type { LectureDetailLesson } from '~/types/lectures.type.ts';

const useLectures = () => {
  const state = useAppSelector(state => state.lecture);

  const dispatch = useAppDispatch();

  const {
    state: { authUser },
  } = useAuth();

  const fetchData = async (id?: string) => {
    // ? id 인자가 없으면, 로그인한 사용자의 첫 번째 강의 id 값을 기본값으로
    const lectureId = id || authUser?.lectures[0]?.id;

    if (!lectureId) {
      return;
    }

    try {
      const lecture = await dispatch(fetchLectureById(lectureId)).unwrap();

      return lecture;
    } catch (e) {
      console.error(e);
    }
  };

  const selectLesson = (lesson?: LectureDetailLesson) => {
    dispatch(setLesson(lesson || null));
  };

  return { state, fetchData, selectLesson };
};

export default useLectures;
