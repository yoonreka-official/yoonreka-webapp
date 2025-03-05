import { css } from '@emotion/react';
import { Button } from 'antd';

import { COLORS } from '~/configs/theme.ts';

import type { ButtonProps } from 'antd';

interface ButtonPrimaryProps extends Omit<ButtonProps, 'type' | 'size'> {
  size?: 'small' | 'medium';
}

function ButtonPrimary({
  children,
  size = 'medium',
  block = true,
  ...props
}: ButtonPrimaryProps) {
  return (
    <Button
      block={block}
      css={[styles.buttonPrimary, styles[size]]}
      type="primary"
      {...props}
    >
      {children}
    </Button>
  );
}

const styles = {
  buttonPrimary: css`
    border-radius: 16px;
    height: 40px;

    font-size: 16px;
    letter-spacing: -0.2px;
    line-height: 22px;
    background: ${COLORS.POINT.PRIMARY};
    border-color: ${COLORS.POINT.PRIMARY};

    &:disabled {
      color: #fff;
      background: ${COLORS.POINT.SECONDARY};
      border-color: ${COLORS.POINT.SECONDARY};
    }
  `,

  small: css`
    border-radius: 12px;
    height: 40px;
    font-weight: 600;
  `,

  medium: css`
    border-radius: 16px;
    height: 52px;
    font-weight: 700;
  `,
};

export default ButtonPrimary;
