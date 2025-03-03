/* eslint-disable @typescript-eslint/naming-convention */
export const COLORS = {
  BG: {
    BACKGROUND: '#F3F5F9',
    BACKGROUND_TEXT: '#F1F8FF',
    DIM: '#2F3339',
    '01': '#EBF1FF',
    '02': '#CDD2DF',
    '03': '#DAE0E9',
    '04': '#B0B8C1',
  },

  FONT: {
    '00': '#ffffff',
    10: '#C3C3C3',
    20: '#A0A5AC',
    30: '#9C9FA9',
    40: '#96989B',
    50: '#747981',
    60: '#6F7B8C',
    70: '#696C71',
    80: '#4D5055',
    90: '#191A1C',
  },

  POINT: {
    PRIMARY: '#388AFD',
    SECONDARY: '#B4CDEF',
    TERTIARY: '#185AB6',
  },

  TAG: {
    RED: '#F43B00',
    RED01: '#FFEEE8',
    GREEN: '#29C031',
    GREEN01: '#D9F9DB',
    BLUE01: '#EFF5FE',
    ORANGE01: '#FFF2D9',
  },

  STATUS: {
    '01': '#FF5A5A',
    '02': '#FFA600',
    '03': '#F3D022',
    '04': '#7FC94A',
    '05': '#71D3D5',
    '06': '#5492D0',
    '07': '#A68AE8',
  },
} as const;

export const FONT_WEIGHT = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  SEMI_BOLD: 600,
  BOLD: 700,
};

export const FONT_SIZE = {
  10: '0.625rem',
  11: '0.6875rem', // 50
  12: '0.75rem', // 75
  13: '0.8125rem',
  14: '0.875rem', // 100
  16: '1rem', // 200
  18: '1.125rem', // 300
  20: '1.25rem',
  24: '1.5rem', // 400
  28: '1.75rem',
  32: '2rem', // 500
  36: '2.25rem',
  40: '2.5rem',
  42: '2.625rem', // 600
  48: '3rem', // 700
  54: '3.375rem',
  64: '4rem', // 800
} as const;

export const FONT_SIZE_DEFAULT = '16px' as const;

export const HEIGHT = {
  XS: '24px',
  SM: '32px',
  MD: '40px',
  LG: '48px',
  XL: '64px',
} as const;

export const SPACING = {
  1: '2px',
  2: '4px',
  3: '8px',
  4: '12px',
  5: '16px',
  6: '20px',
  7: '24px',
  8: '32px',
  9: '40px',
  10: '48px',
  11: '64px',
  12: '80px',
} as const;

export const LAYOUT = {
  NAV_BAR_HEIGHT: '60px',
};

const THEME = {
  COLORS,
  FONT_WEIGHT,
  FONT_SIZE,
  FONT_SIZE_DEFAULT,
  HEIGHT,
  SPACING,
  LAYOUT,
};

export default THEME;
