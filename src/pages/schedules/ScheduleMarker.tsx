import { css } from '@emotion/react'

import { COLORS } from '~/configs/theme.ts'

interface Props {
  order: number
  size?: 12 | 14
  block?: boolean
  color?: string | null
}

const MARKER = '✦'

function ScheduleMarker({ order, size = 14, block = false, color }: Props) {
  return (
    <div css={[styles.marker({ order, size, color }), block && styles.block]}>
      {MARKER}
    </div>
  )
}

const getMarkerColor = (order: number) => {
  switch (order % 3) {
    case 2:
      return COLORS.STATUS['04']
    case 1:
      return COLORS.STATUS['02']
    case 0:
    default:
      return COLORS.POINT.PRIMARY
  }
}

const styles = {
  marker: ({ order, size, color }: Props) => css`
    text-align: center;
    font-family: Pretendard, sans-serif;
    font-size: ${size}px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 100% */
    letter-spacing: -0.2px;
    color: ${color ?? getMarkerColor(order)};
  `,

  block: css`
    display: flex;
    width: 16px;
    height: 16px;
    align-items: center;
    justify-content: center;
  `,
}

export default ScheduleMarker
