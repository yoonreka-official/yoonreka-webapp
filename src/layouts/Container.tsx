import { css } from '@emotion/react'

import type { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  className?: string
  scrollRoot?: boolean
}

export default function Container({ children, className, scrollRoot }: Props) {
  return (
    <div
      className={className}
      css={[styles.container, scrollRoot && styles.scrollRoot]}
    >
      {children}
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    padding: 8px 14px;
    //height: 100%;
    min-height: 100%;
  `,

  scrollRoot: css`
    height: 100% !important;
    overflow-y: auto;
  `,
}
