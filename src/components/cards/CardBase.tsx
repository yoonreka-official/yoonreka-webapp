import { css } from '@emotion/react'

import type { ReactNode } from 'react'

export interface CardBaseProps {
  children?: ReactNode
  id?: string
  className?: string
}

function CardBase({ id, children, className }: CardBaseProps) {
  return (
    <div id={id} className={className} css={styles.cardBase}>
      {children}
    </div>
  )
}

const styles = {
  cardBase: css`
    padding: 16px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0px 4px 20px 0px rgba(206, 218, 241, 0.4);
    margin-bottom: 10px;
  `,
}

export default CardBase
