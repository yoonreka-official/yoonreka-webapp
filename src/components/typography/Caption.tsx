import { css } from '@emotion/react'

import { getFontWeight } from '~/components/typography/Body.tsx'
import { COLORS } from '~/configs/theme.ts'

import type { ReactNode } from 'react'

interface CaptionProps {
  children?: ReactNode
  className?: string
  color?: string
  size?: 10 | 12
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

function Caption({
  children,
  className,
  color = COLORS.FONT['90'],
  weight = 'regular',
  size = 12,
}: CaptionProps) {
  return (
    <div
      className={className}
      css={[styles.caption(size, weight)]}
      style={{ color }}
    >
      {children}
    </div>
  )
}

function getLineHeight(size: CaptionProps['size']) {
  switch (size) {
    case 10:
      return 14
    case 12:
    default:
      return 18
  }
}

function getLetterSpacing(size: CaptionProps['size']) {
  switch (size) {
    case 10:
      return '-0.1px'
    case 12:
    default:
      return '-0.2px'
  }
}

const styles = {
  caption: (size: CaptionProps['size'], weight: CaptionProps['weight']) => css`
    font-size: ${size}px;
    font-weight: ${getFontWeight(weight)};
    letter-spacing: ${getLetterSpacing(size)};
    line-height: ${getLineHeight(size)}px;
  `,
}

export default Caption
