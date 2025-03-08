import { css } from '@emotion/react';

import { COLORS } from '~/configs/theme.ts';

import type { ReactNode } from 'react';

export interface StatusTagProps {
  status?: 'default' | 'warning' | 'danger' | 'success' | 'info';
  children?: ReactNode;
}

function StatusTag({ children, status = 'default' }: StatusTagProps) {
  return <span css={[styles.tag, styles[status]]}>{children}</span>;
}

const styles = {
  tag: css`
    display: flex;
    padding: 4px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    text-align: right;
    border-radius: 12px;

    /* Caption/12/B */
    font-size: 12px;
    font-style: normal;
    //font-weight: 700;
    font-weight: 600;
    line-height: 18px; /* 150% */
    letter-spacing: -0.2px;
  `,

  default: css`
    color: ${COLORS.FONT['60']};
    background: ${COLORS.BG.BACKGROUND_TEXT};
  `,

  warning: css`
    color: ${COLORS.STATUS['02']};
    background: ${COLORS.TAG.ORANGE01};
  `,

  danger: css`
    color: ${COLORS.TAG.RED};
    background: ${COLORS.TAG.RED01};
  `,

  success: css`
    color: ${COLORS.TAG.GREEN};
    background: ${COLORS.TAG.GREEN01};
  `,

  info: css`
    color: ${COLORS.POINT.PRIMARY};
    background: ${COLORS.BG.BACKGROUND_TEXT};
  `,
};

export default StatusTag;
