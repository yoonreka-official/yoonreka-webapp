import BigNumber from 'bignumber.js';

import type { Nullable } from '~/types/utils/nullable.type.ts';

const opt = (num: number | BigNumber) => {
  if (typeof num === 'number') {
    return new BigNumber(num).decimalPlaces(0).toNumber();
  }
  return num.decimalPlaces(0).toNumber();
};

const sum = (a: number, b: number) => {
  return opt(new BigNumber(a).plus(b));
};
const sub = (a: number, b: number) => {
  return opt(new BigNumber(a).minus(b));
};

const multiply = (a: number, b: number) => {
  return opt(new BigNumber(a).multipliedBy(b));
};

const divide = (a: number, b: number) => {
  return opt(new BigNumber(a).dividedBy(b));
};

const rates = (
  val?: Nullable<number | string>,
  max?: Nullable<number | string>,
) => {
  if (!val || !max) return 0;
  return opt(new BigNumber(Number(val)).dividedBy(Number(max)).times(100));
};

const calculator = {
  divide,
  multiply,
  opt,
  sub,
  sum,
  rates,
};

export default calculator;
