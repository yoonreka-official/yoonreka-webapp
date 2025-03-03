import { css } from '@emotion/react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import IconBell24 from '~/assets/svg/icon_bell_24.svg?react';
import Flex from '~/components/display/Flex.tsx';
import SelectYearMonth from '~/components/inputs/SelectYearMonth.tsx';
import DrawerNotifications from '~/components/notifications/DrawerNotifications.tsx';
import { COLORS } from '~/configs/theme.ts';
import useNotifications from '~/hooks/useNotifications.ts';
import useSchedules from '~/hooks/useSchedules.ts';

const SHOW_NOTIFICATIONS_MODAL = 'notifications';

function ScheduleHeader() {
  const [params] = useSearchParams();
  const redirectTo = params.get('to');

  const { state, handleSetMonth, handleSetDate } = useSchedules();
  const {
    state: { hasNew: hasNewNotification },
  } = useNotifications();

  const [open, setOpen] = useState(redirectTo === SHOW_NOTIFICATIONS_MODAL);

  return (
    <header css={styles.header}>
      <Flex items="center" justify="space-between">
        <SelectYearMonth
          value={state.selectedMonth}
          onChange={date => {
            handleSetMonth(date);
            handleSetDate(date);
          }}
        />

        <button
          css={styles.notificationButton}
          onClick={() => {
            setOpen(true);
          }}
        >
          {hasNewNotification && <div css={styles.redDot} />}
          <IconBell24 />
        </button>
      </Flex>

      <DrawerNotifications
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </header>
  );
}

const styles = {
  header: css`
    padding: 12px 20px;
  `,

  notificationButton: css`
    position: relative;
    line-height: 1;

    button {
      appearance: none;
      background: none;
      border: 0;
      line-height: 1;
    }
  `,

  redDot: css`
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    height: 5px;
    background: ${COLORS.TAG.RED};
    border-radius: 50%;
  `,
};

export default ScheduleHeader;
