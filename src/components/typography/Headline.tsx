import { css } from '@emotion/react'

import { COLORS, FONT_WEIGHT } from '~/configs/theme.ts'

import type { ReactNode } from 'react'

interface HeadlineProps {
  children?: ReactNode
  className?: string
  color?: string
}

function Headline({
  className,
  children,
  color = COLORS.FONT['90'],
}: HeadlineProps) {
  return (
    <h1 className={className} css={styles.headline} style={{ color }}>
      {children}
    </h1>
  )
}

const styles = {
  headline: css`
    font-size: 20px;
    letter-spacing: -0.5px;
    line-height: 28px;
    font-weight: ${FONT_WEIGHT.BOLD};
  `,
}

export default Headline
