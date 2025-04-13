import { COLORS } from '~/configs/theme.ts';
import useAuth from '~/hooks/useAuth.tsx';
import { useAppDispatch, useAppSelector } from '~/stores';
import {
  fetchGradesByLectureId,
  setActiveTab,
  setGradeType,
  setLabel,
  setLabelColor,
} from '~/stores/GradeSlice.ts';
import { GradeType } from '~/types/grades.type.ts';

import type { GradeTab } from '~/stores/GradeSlice.ts';
import type { LectureGradeFormLabel } from '~/types/grades.type.ts';

export const getLabelColor = (index: number) => {
  switch (index % 8) {
    case 0:
      return COLORS.STATUS['06'];
    case 1:
      return COLORS.STATUS['07'];
    case 2:
      return COLORS.STATUS['02'];
    case 3:
      return COLORS.STATUS['05'];
    case 4:
      return COLORS.STATUS['01'];
    case 5:
      return COLORS.STATUS['04'];
    case 6:
      return COLORS.STATUS['03'];
    case 7:
      return COLORS.POINT.PRIMARY;
    default:
      return COLORS.FONT['40'];
  }
};

const useGrades = () => {
  const state = useAppSelector(state => state.grade);

  const dispatch = useAppDispatch();

  const {
    state: { authUser },
  } = useAuth();

  const fetchData = async (
    id?: string,
    gradeType: GradeType = GradeType.DEFAULT,
  ) => {
    const lectureId = id || authUser?.lectures[0]?.id;

    if (!lectureId) {
      return;
    }

    try {
      const data = await dispatch(
        fetchGradesByLectureId({ lectureId, gradeType }),
      ).unwrap();

      handleSelectedLabel(
        data.gradeFormLabels.filter(
          gradeType === GradeType.DEFAULT
            ? item => item.type === '테스트'
            : item => item.type === '과제성적',
        )[0],
        0,
      );
      handleSetLabelColor(0);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeTab = async (key: GradeTab, reload = true) => {
    dispatch(setActiveTab(key));
    if (reload) {
      await fetchData(state.lecture?.id);
    }
  };

  const handleChangeType = (gradeType: GradeType, reload = true) => {
    dispatch(setGradeType(gradeType));
    if (reload) {
      return fetchData(state.lecture?.id, gradeType);
    }
  };

  const handleSelectedLabel = (label: LectureGradeFormLabel, index: number) => {
    dispatch(setLabel(label));
    handleSetLabelColor(index);
  };

  const handleSetLabelColor = (index: number) => {
    dispatch(setLabelColor(getLabelColor(index)));
  };

  return {
    state,
    fetchData,
    handleChangeTab,
    handleChangeType,
    handleSelectedLabel,
    handleSetLabelColor,
  };
};

export default useGrades;
