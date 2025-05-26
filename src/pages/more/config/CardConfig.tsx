import { css } from '@emotion/react'

import IconArrowRight24 from '~/assets/svg/icon_arrow_right_24.svg?react'
import CardBase from '~/components/cards/CardBase.tsx'
import Flex from '~/components/display/Flex.tsx'
import Body from '~/components/typography/Body.tsx'
import Caption from '~/components/typography/Caption.tsx'
import { COLORS } from '~/configs/theme.ts'

import type { ReactNode } from 'react'

interface CardConfigProps {
  title?: string
  children: ReactNode
  dense?: boolean
}

function CardConfig({ title, children, dense }: CardConfigProps) {
  return (
    <CardBase css={[styles.cardConfig, dense && styles.dense]}>
      {title && (
        <header>
          <Caption color={COLORS.FONT['40']} size={12} weight="bold">
            {title}
          </Caption>
        </header>
      )}

      <div>{children}</div>
    </CardBase>
  )
}

interface CardConfigButtonProps {
  children: ReactNode
  color?: string
  suffix?: ReactNode
  onClick?: () => void
}

export function CardConfigButton({
  children,
  color,
  suffix,
  onClick,
}: CardConfigButtonProps) {
  return (
    <button css={styles.button} onClick={onClick}>
      <Body color={color} size={16} weight="semibold">
        {children}
      </Body>

      <Flex gap={8} items="center">
        {suffix}
        <IconArrowRight24 />
      </Flex>
    </button>
  )
}

const styles = {
  cardConfig: css`
    padding: 28px 24px;
    margin-bottom: 8px;

    header {
      margin-bottom: 12px;
    }
  `,

  dense: css`
    padding: 20px 24px;
  `,

  button: css`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  `,
}

export default CardConfig
