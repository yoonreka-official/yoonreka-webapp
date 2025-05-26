import { css } from '@emotion/react'

import { COLORS, FONT_WEIGHT } from '~/configs/theme.ts'

import type { ReactNode } from 'react'

interface BodyProps {
  children?: ReactNode
  className?: string
  color?: string
  size?: 14 | 16 | 18
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

function Body({
  children,
  className,
  color = COLORS.FONT['90'],
  weight = 'regular',
  size = 16,
}: BodyProps) {
  return (
    <div
      className={className}
      css={[styles.body(size, weight)]}
      style={{ color }}
    >
      {children}
    </div>
  )
}

export function getFontWeight(weight: BodyProps['weight']) {
  switch (weight) {
    case 'bold':
      return FONT_WEIGHT.BOLD
    case 'semibold':
      return FONT_WEIGHT.SEMI_BOLD
    case 'medium':
      return FONT_WEIGHT.MEDIUM
    case 'regular':
    default:
      return FONT_WEIGHT.REGULAR
  }
}

function getLineHeight(size: BodyProps['size']) {
  switch (size) {
    case 14:
      return 20
    case 18:
      return 26
    case 16:
    default:
      return 22
  }
}

const styles = {
  body: (size: BodyProps['size'], weight: BodyProps['weight']) => css`
    font-size: ${size}px;
    line-height: ${getLineHeight(size)}px;
    font-weight: ${getFontWeight(weight)};
    letter-spacing: -0.2px;
  `,
}

export default Body
