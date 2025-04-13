import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  const modal = params.get('modal');

  const navigate = useNavigate();

  const { state, handleSetMonth, handleSetDate } = useSchedules();
  const {
    state: { hasNew: hasNewNotification },
  } = useNotifications();

  const isOpen = modal === SHOW_NOTIFICATIONS_MODAL;

  // const [open, setOpen] = useState(false);

  const handleOpen = () => {
    navigate(`/?modal=${SHOW_NOTIFICATIONS_MODAL}`, {
      replace: false,
    });
  };

  useEffect(() => {
    // ? 푸시알림을 탭해서 앱에 진입한 경우
    if (redirectTo === SHOW_NOTIFICATIONS_MODAL) {
      // 1. 강제로 히스토리 변경 (replaceState로 초기화)
      window.history.replaceState({}, '', '/');
      // 2. 가짜 히스토리 추가 (크롬 최적화 방지)
      setTimeout(() => {
        window.history.pushState({}, '', `/?modal=temp`);
      }, 50);

      // 1. 쿼리 초기화후 홈 페이지에서 새로운 히스토리 시작
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 200);

      // 2. 홈페이지에서 알림 모달 오픈 히스토리 푸시
      setTimeout(() => {
        handleOpen();
      }, 400);
    }
  }, [redirectTo, navigate, window.history]);

  // useEffect(() => {
  //   // * modal 쿼리 감지시 알림 모달 on/off
  //   setOpen(modal === SHOW_NOTIFICATIONS_MODAL);
  // }, [modal]);

  useEffect(() => {
    const handlePopState = () => {
      navigate('/', { replace: false });
    };

    // const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //   event.preventDefault();
    //   event.returnValue = ''; // 크롬에서 경고창 표시 (일부 브라우저에서는 무시됨)
    // };

    if (isOpen) {
      window.addEventListener('popstate', handlePopState);
    } else {
      window.removeEventListener('popstate', handlePopState);
    }

    // return () => {
    //   window.removeEventListener('popstate', handlePopState);
    //   console.log('CLEAN UP!');
    // };
  }, [isOpen]);

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

        <button css={styles.notificationButton} onClick={() => handleOpen()}>
          {hasNewNotification && <div css={styles.redDot} />}
          <IconBell24 />
        </button>
      </Flex>

      <DrawerNotifications
        open={isOpen}
        onClose={() => {
          navigate(-1);
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
