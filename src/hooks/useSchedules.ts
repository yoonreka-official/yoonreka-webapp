import { useAppDispatch, useAppSelector } from '~/stores';
import {
  fetchLessons,
  setSelectedDate,
  setSelectedMonth,
} from '~/stores/SchedulesSlice.ts';

import type { Dayjs } from 'dayjs';

const useSchedules = () => {
  const state = useAppSelector(state => state.schedules);

  const dispatch = useAppDispatch();

  const fetchData = async (date: Dayjs) => {
    try {
      await dispatch(
        fetchLessons({
          startDate: date
            .startOf('month')
            .subtract(14, 'days')
            .format('YYYY-MM-DD'),
          endDate: date.endOf('month').add(14, 'days').format('YYYY-MM-DD'),
        }),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleSetDate = (date?: Dayjs) => {
    dispatch(setSelectedDate(date));
  };

  const handleSetMonth = (month?: Dayjs) => {
    if (state.selectedMonth?.format('YYYY-MM') === month?.format('YYYY-MM')) {
      return;
    }

    dispatch(setSelectedMonth(month));
  };

  return { state, fetchData, handleSetDate, handleSetMonth };
};

export default useSchedules;
