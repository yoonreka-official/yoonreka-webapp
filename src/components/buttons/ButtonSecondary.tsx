import { css } from '@emotion/react';
import { Button } from 'antd';

import { COLORS } from '~/configs/theme.ts';

import type { ButtonProps } from 'antd';

function ButtonSecondary({
  children,
  ...props
}: Omit<ButtonProps, 'type' | 'size'>) {
  return (
    <Button css={[styles.buttonSecondary]} type="primary" {...props}>
      {children}
    </Button>
  );
}

const styles = {
  buttonSecondary: css`
    border-radius: 8px;
    height: 36px;

    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.4px;

    background: ${COLORS.BG['01']};
    border-color: ${COLORS.BG['01']};
    color: ${COLORS.FONT['60']};

    &:disabled {
      color: ${COLORS.FONT['60']};
      background: ${COLORS.BG['03']};
      border-color: ${COLORS.BG['03']};
    }
  `,
};

export default ButtonSecondary;
