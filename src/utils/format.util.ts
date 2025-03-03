import dayjs from 'dayjs';

import type { NullableString } from '~/types/utils/nullable.type.ts';

export const formattedNumberWithUnits = (value: number): string => {
  if (value >= 1e12) {
    return formatUnit(value, 1e12, 'T');
  }

  if (value >= 1e9) {
    return formatUnit(value, 1e9, 'B');
  }

  if (value >= 1e6) {
    return formatUnit(value, 1e6, 'M');
  }

  if (value >= 1e3) {
    return formatUnit(value, 1e3, 'K');
  }

  return value.toString();
};

const formatUnit = (value: number, divider: number, unit: string): string => {
  const result = value / divider;

  return result % 1 === 0
    ? `${result.toFixed(0)}${unit}`
    : `${result.toFixed(1)}${unit}`;
};

export const formatDate = (
  value?: NullableString | number,
  format = 'YYYY-MM-DD HH:mm:ss',
  fallback = '-',
) => {
  if (!value) return fallback;
  return dayjs(value).format(format);
};

export const formatNumber = (value: number) => value.toLocaleString();
