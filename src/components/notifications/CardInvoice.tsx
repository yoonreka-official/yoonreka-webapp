import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

import ImagePayment from '~/assets/images/notification/img_payment.png'
import IconExpandRight24 from '~/assets/svg/icon_expand_right_24.svg?react'
import CardBase from '~/components/cards/CardBase.tsx'
import Flex from '~/components/display/Flex.tsx'
import Body from '~/components/typography/Body.tsx'
import Caption from '~/components/typography/Caption.tsx'
import { COLORS } from '~/configs/theme.ts'
import { InvoiceType } from '~/types/api'
import { formatDate } from '~/utils/format.util.ts'

interface Props {
  title: string
  createdAt: string
  invoiceType?: InvoiceType
  isNew?: boolean
}

function CardInvoice({ title, createdAt, invoiceType, isNew }: Props) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => {
        navigate(`/more?invoiceType=${invoiceType}`)
      }}
    >
      <CardBase>
        <Flex items="center" justify="space-between">
          <Flex direction="column" gap={4} justify="center">
            <Body size={14} weight="bold">
              <img
                alt="아이콘"
                css={notificationStyles.icon}
                src={ImagePayment}
              />

              {title}
              {isNew && <span css={notificationStyles.newLabel}>New</span>}
            </Body>
            <Caption color={COLORS.FONT['30']} size={12} weight="regular">
              {formatDate(createdAt, 'YYYY.MM.DD')}
            </Caption>
          </Flex>
          <button>
            <IconExpandRight24 />
          </button>
        </Flex>
      </CardBase>
    </div>
  )
}

const notificationStyles = {
  newLabel: css`
    color: #f43b00;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px; /* 150% */
    letter-spacing: -0.2px;
    margin-left: 4px;
  `,

  icon: css`
    height: 14px;
    margin-right: 2px;
  `,
}

export default CardInvoice
