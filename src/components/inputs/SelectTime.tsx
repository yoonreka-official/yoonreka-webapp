import { css } from '@emotion/react';
import { Divider } from 'antd';
import { useEffect, useState } from 'react';

import ButtonNav from '~/components/buttons/ButtonNav.tsx';
import Flex from '~/components/display/Flex.tsx';
import BottomSheet from '~/components/modals/BottomSheet.tsx';
import { COLORS } from '~/configs/theme.ts';

const TIMES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MINUTES: number[] = [];
// eslint-disable-next-line no-plusplus
for (let i = 0; i <= 59; i++) {
  MINUTES.push(i);
}

interface Props {
  id: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const formatNumberPad = (value?: number) => {
  if (typeof value === 'undefined') return '--';
  return value.toString().padStart(2, '0');
};

const optimizeTime = (time?: number, meridiem?: 'AM' | 'PM') => {
  if (time === 0 && meridiem === 'PM') return 12;
  if (time === 12 && meridiem === 'AM') return 0;
  return time;
};

function SelectTime({ id, value, disabled, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<number>();
  const [minute, setMinute] = useState<number>();
  const [meridiem, setMeridiem] = useState<'AM' | 'PM'>();
  const [internalValue, setInternalValue] = useState<string>();

  const getFormattedValue = () => {
    const t = optimizeTime(time, meridiem);
    if (time !== t) setTime(t);

    return `${formatNumberPad(t)}:${formatNumberPad(minute)} ${meridiem || '--'}`;
  };

  const handleClose = () => {
    const mergedValue = getFormattedValue();
    setInternalValue(mergedValue);

    if (mergedValue !== '--:-- --') {
      onChange?.(mergedValue);
    }

    setIsOpen(false);
  };

  const setScroll = () => {
    const yearElement = document.getElementById(`${id}-time-${time}`);
    const monthElement = document.getElementById(`${id}-minute-${minute}`);
    const meridiemElement = document.getElementById(
      `${id}-meridiem-${meridiem}`,
    );

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
    meridiemElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  };

  useEffect(() => {
    setScroll();
  }, [isOpen, time, minute, meridiem]);

  useEffect(() => {
    if (value) {
      const [t, _meridiem] = value.split(' ');
      const [_time, _min] = t.split(':');
      setTime(Number(_time));
      setMinute(Number(_min));
      setMeridiem(_meridiem as 'AM' | 'PM');
      setInternalValue(value);
    } else {
      setTime(undefined);
      setMinute(undefined);
      setMeridiem(undefined);
      setInternalValue(undefined);
      setInternalValue(getFormattedValue());
    }
  }, [value]);

  return (
    <>
      <ButtonNav
        css={styles.timeButton}
        disabled={disabled}
        onClick={() => setIsOpen(true)}
      >
        {internalValue}
      </ButtonNav>

      <BottomSheet
        title="시간을 선택해주세요"
        open={isOpen}
        onClose={() => handleClose()}
        onConfirm={() => handleClose()}
      >
        <Flex css={styles.itemWrapper}>
          <ul css={[styles.selectItem]}>
            <li style={{ height: 84 }} />
            {TIMES.map(timeValue => (
              <li key={timeValue}>
                <button
                  id={`${id}-time-${timeValue}`}
                  css={[timeValue === time && styles.selected]}
                  onClick={() => {
                    setTime(timeValue);
                  }}
                >
                  {`${timeValue}`.padStart(2, '0')}
                </button>
              </li>
            ))}
            <li style={{ height: 84 }} />
          </ul>

          <Divider style={{ height: 200, marginTop: 8 }} type="vertical" />

          <ul css={[styles.selectItem]}>
            <li style={{ height: 84 }} />
            {MINUTES.map(minuteValue => (
              <li key={minuteValue}>
                <button
                  id={`${id}-minute-${minuteValue}`}
                  css={[minuteValue === minute && styles.selected]}
                  onClick={() => {
                    setMinute(minuteValue);
                  }}
                >
                  {`${minuteValue}`.padStart(2, '0')}
                </button>
              </li>
            ))}
            <li style={{ height: 84 }} />
          </ul>

          <Divider style={{ height: 200, marginTop: 8 }} type="vertical" />

          <ul css={[styles.selectItem]}>
            <li style={{ height: 84 }} />
            <li>
              <button
                id={`${id}-meridiem-AM`}
                css={[meridiem === 'AM' && styles.selected]}
                onClick={() => {
                  setMeridiem('AM');
                }}
              >
                AM
              </button>
            </li>
            <li>
              <button
                id={`${id}-meridiem-PM`}
                css={[meridiem === 'PM' && styles.selected]}
                onClick={() => {
                  setMeridiem('PM');
                }}
              >
                PM
              </button>
            </li>
            <li style={{ height: 84 }} />
          </ul>
        </Flex>
      </BottomSheet>
    </>
  );
}

const styles = {
  timeButton: css`
    width: 85px;

    &:disabled {
    }
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

export default SelectTime;
