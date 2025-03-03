import { css } from '@emotion/react';

import { COLORS } from '~/configs/theme.ts';

import type { CSSProperties, ReactNode } from 'react';

export interface ButtonNavProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

function ButtonNav({ children, className, style, onClick }: ButtonNavProps) {
  return (
    <button
      className={className}
      css={buttonNavStyles}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const buttonNavStyles = css`
  display: flex;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 8px;
  background: ${COLORS.BG['01']};

  color: ${COLORS.POINT.PRIMARY};
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.2px;
`;

export default ButtonNav;
