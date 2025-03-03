import dayjs from 'dayjs';
import { useEffect } from 'react';

import useLoading from '~/hooks/useLoading.ts';
import useNotifications from '~/hooks/useNotifications.ts';
import useSchedules from '~/hooks/useSchedules.ts';
import Container from '~/layouts/Container.tsx';
import ScreenBase from '~/layouts/ScreenBase.tsx';
import ScheduleCalendar from '~/pages/schedules/ScheduleCalendar.tsx';
import ScheduleDailyLessons from '~/pages/schedules/ScheduleDailyLessons.tsx';
import ScheduleHeader from '~/pages/schedules/ScheduleHeader.tsx';

function SchedulesPage() {
  const {
    fetchData,
    handleSetMonth,
    handleSetDate,
    state: { isLoading },
  } = useSchedules();

  const { fetchData: fetchNotifications } = useNotifications();

  useLoading(isLoading);

  useEffect(() => {
    fetchNotifications();

    (async () => {
      const today = dayjs();
      // ? 당월의 스케줄 불러오기
      await fetchData(today);

      // ? 초기값을 당일 기준으로 설정
      handleSetMonth(today);
      handleSetDate(today);
    })();
  }, []);

  return (
    <ScreenBase header={<ScheduleHeader />}>
      <Container>
        <ScheduleCalendar />
        <ScheduleDailyLessons />
      </Container>
    </ScreenBase>
  );
}

export default SchedulesPage;
