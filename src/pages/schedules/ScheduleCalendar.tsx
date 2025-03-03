import { css } from '@emotion/react';
import { Calendar } from 'antd';

import CardBase from '~/components/cards/CardBase.tsx';
import locale from '~/configs/calendarLocale.ts';
import { COLORS } from '~/configs/theme.ts';
import useSchedules from '~/hooks/useSchedules.ts';
import ScheduleDateCell from '~/pages/schedules/ScheduleDateCell.tsx';

function ScheduleCalendar() {
  const {
    state: { selectedDate, list },
    fetchData,
    handleSetMonth,
    handleSetDate,
  } = useSchedules();

  return (
    <CardBase>
      <Calendar
        value={selectedDate}
        css={styles.calendar}
        fullCellRender={(date, _info) => (
          <ScheduleDateCell
            date={date}
            lessons={list}
            selected={selectedDate}
          />
        )}
        fullscreen={false}
        headerRender={() => null}
        locale={locale}
        onChange={date => {
          // ? 선택한 날짜가 이전 선택했던 날짜와 다른 연월(YYYY-MM)에 속하면 데이터 갱신
          if (selectedDate?.format('YYYY-MM') !== date.format('YYYY-MM')) {
            fetchData(date);
          }
          handleSetMonth(date);
          handleSetDate(date);
        }}
      />
    </CardBase>
  );
}

const styles = {
  calendar: css`
    background: #ddd;

    .ant-picker-panel {
      border: 0;

      .ant-picker-body {
        padding: 0;
      }

      .ant-picker-content {
        thead th {
          color: ${COLORS.FONT['20']};
          padding-top: 4px;
          text-align: center;
          /* Caption/12/R */
          font-size: 12px;
          font-style: normal;
          font-weight: 300;
          line-height: 18px; /* 150% */
          letter-spacing: -0.2px;
        }

        td {
          cursor: default;
        }
      }

      .ant-picker-cell {
        padding: 8px 0;
        color: ${COLORS.FONT['10']};

        &.ant-picker-cell-in-view {
          color: ${COLORS.FONT['90']};
        }
      }
    }
  `,
};

export default ScheduleCalendar;
