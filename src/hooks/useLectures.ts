import dayjs from 'dayjs';

import useAuth from '~/hooks/useAuth.tsx';
import { useAppDispatch, useAppSelector } from '~/stores';
import { fetchLectureById, setLesson } from '~/stores/LectureSlice.ts';

import type {
  LectureDetail,
  LectureDetailLesson,
} from '~/types/lectures.type.ts';
import type { NullableString } from '~/types/utils/nullable.type.ts';

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
      return await dispatch(fetchLectureById(lectureId)).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  const selectLesson = (lesson?: LectureDetailLesson) => {
    dispatch(setLesson(lesson || null));
  };

  const initializeLesson = (
    lecture: LectureDetail,
    selectedDate?: NullableString,
  ) => {
    // ? 날짜를 선택한 경우
    if (selectedDate) {
      selectLesson(
        lecture.lessons.find(lesson => lesson.date === selectedDate),
      );

      return;
    }

    // ? 이미 진행된 수업의 경우, 최근에 진행했던 강의 선택
    const today = dayjs();
    const pastLessons = lecture.lessons.filter(notice =>
      dayjs(notice.date).isBefore(today),
    );

    if (pastLessons?.length) {
      const recent = pastLessons.reduce((closest, current) => {
        const closestDiff = today.diff(dayjs(closest.date), 'day');
        const currentDiff = today.diff(dayjs(current.date), 'day');

        return currentDiff < closestDiff ? current : closest;
      }, pastLessons[0]);

      selectLesson(recent);
      return;
    }

    // ? 진행된 적이 없다면, 첫 번째 강의 선택
    selectLesson(lecture.lessons[0]);
  };

  return { state, fetchData, selectLesson, initializeLesson };
};

export default useLectures;
