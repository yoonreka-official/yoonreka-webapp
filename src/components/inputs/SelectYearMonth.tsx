import { css } from '@emotion/react';
import { Divider } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import IconArrowDown24 from '~/assets/svg/icon_arrow_down_24.svg?react';
import Flex from '~/components/display/Flex.tsx';
import BottomSheet from '~/components/modals/BottomSheet.tsx';
import Headline from '~/components/typography/Headline.tsx';
import { COLORS } from '~/configs/theme.ts';
import { formatDate } from '~/utils/format.util.ts';

import type { Dayjs } from 'dayjs';

const START_YEAR = 2000;
const END_YEAR = new Date().getFullYear() + 10;
const YEARS: number[] = [];
// eslint-disable-next-line no-plusplus
for (let i = START_YEAR; i <= END_YEAR; i++) {
  YEARS.push(i);
}
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

interface Props {
  value?: Dayjs;
  onChange?: (value: Dayjs) => void;
}

function SelectYearMonth({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState<number>(2025);
  const [month, setMonth] = useState<number>(2);
  const [internalValue, setInternalValue] = useState<string>();

  const getFormattedValue = (val?: string) => {
    return formatDate(val || `${year}-${month}`, 'YYYY. MM');
  };

  const handleClose = () => {
    const mergedValue = `${year}-${month}`;
    onChange?.(dayjs(mergedValue));
    setInternalValue(getFormattedValue(mergedValue));
    setIsOpen(false);
  };

  const setScroll = () => {
    const yearElement = document.getElementById(`year-${year}`);
    const monthElement = document.getElementById(`month-${month}`);

    yearElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    monthElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  };

  useEffect(() => {
    setScroll();
  }, [isOpen, year, month]);

  useEffect(() => {
    setInternalValue((value || dayjs()).format('YYYY. MM'));
  }, [value]);

  return (
    <>
      <button css={styles.selectYearMonth} onClick={() => setIsOpen(true)}>
        <Headline>{getFormattedValue(internalValue)}</Headline>
        <IconArrowDown24 />
      </button>

      <BottomSheet
        title="날짜를 선택해주세요"
        open={isOpen}
        onClose={() => handleClose()}
        onConfirm={() => handleClose()}
      >
        <Flex css={styles.itemWrapper}>
          <ul css={[styles.selectItem]}>
            <li style={{ height: 84 }} />
            {YEARS.map(yearValue => (
              <li key={yearValue}>
                <button
                  id={`year-${yearValue}`}
                  css={[yearValue === year && styles.selected]}
                  onClick={() => {
                    setYear(yearValue);
                  }}
                >
                  {yearValue}
                </button>
              </li>
            ))}
            <li style={{ height: 84 }} />
          </ul>

          <Divider style={{ height: 200, marginTop: 8 }} type="vertical" />

          <ul css={[styles.selectItem]}>
            <li style={{ height: 84 }} />
            {MONTHS.map(monthValue => (
              <li key={monthValue}>
                <button
                  id={`month-${monthValue}`}
                  css={[monthValue === month && styles.selected]}
                  onClick={() => {
                    setMonth(monthValue);
                  }}
                >
                  {`${monthValue}`.padStart(2, '0')}
                </button>
              </li>
            ))}
            <li style={{ height: 84 }} />
          </ul>
        </Flex>
      </BottomSheet>
    </>
  );
}

const styles = {
  selectYearMonth: css`
    display: flex;
    align-items: center;
    gap: 4px;
    appearance: none;
    background: none;
    border: 0;
    line-height: 1;
  `,

  itemWrapper: css`
    position: relative;
    height: 100%;

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      width: 100%;
    }

    &:before {
      height: 20px;
      top: 0;
      background: linear-gradient(
        to top,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1)
      );
    }

    &:after {
      height: 20px;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1)
      );
    }
  `,

  selectItem: css`
    display: block;
    flex: 1;
    list-style: none;
    height: 100%;
    overflow-y: auto;

    li > button {
      display: flex;
      width: 100%;
      justify-content: center;
      padding: 6px 24px;
      font-size: 22px;

      color: ${COLORS.FONT['10']};
    }
  `,

  selected: css`
    background: ${COLORS.BG.BACKGROUND_TEXT};
    color: ${COLORS.FONT['90']} !important;
    //font-weight: 600;
    border-radius: 8px;
  `,
};

export default SelectYearMonth;
