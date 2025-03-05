import { css } from '@emotion/react';

import CardBase from '~/components/cards/CardBase.tsx';
import Flex from '~/components/display/Flex.tsx';
import Body from '~/components/typography/Body.tsx';
import Caption from '~/components/typography/Caption.tsx';
import { COLORS } from '~/configs/theme.ts';
import useSchedules from '~/hooks/useSchedules.ts';
import ScheduleLesson from '~/pages/schedules/ScheduleLesson.tsx';

function ScheduleDailyLessons() {
  const {
    state: { selectedDate, selectedEvents },
  } = useSchedules();

  return (
    selectedDate && (
      <CardBase>
        <header css={styles.dailyInfoHeader}>
          <Caption color={COLORS.FONT['40']} weight="bold">
            {selectedDate.format('M월 D일')}
          </Caption>
        </header>

        {selectedEvents.length === 0 && (
          <Flex items="center" justify="center" style={{ height: 70 }}>
            <Body color="#C3C3C3" size={14} weight="medium">
              수업 없음
            </Body>
          </Flex>
        )}

        <Flex direction="column" gap={16}>
          {selectedEvents.map((event, index) => (
            <ScheduleLesson key={index} index={index} lesson={event} />
          ))}
        </Flex>
      </CardBase>
    )
  );
}

const styles = {
  dailyInfoHeader: css`
    border-bottom: 1px solid ${COLORS.BG['01']};
    padding-bottom: 4px;
    margin-bottom: 10px;
  `,
};

export default ScheduleDailyLessons;
