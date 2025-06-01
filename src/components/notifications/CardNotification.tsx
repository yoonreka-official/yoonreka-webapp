import { css } from '@emotion/react'

import ImageEducation from '~/assets/images/notification/img_education.png'
import ImageNotice from '~/assets/images/notification/img_notice.png'
import ImagePayment from '~/assets/images/notification/img_payment.png'
import CardCollapse from '~/components/cards/CardCollapse.tsx'
import Flex from '~/components/display/Flex.tsx'
import ButtonAttachment from '~/components/notifications/ButtonAttachment.tsx'
import Body from '~/components/typography/Body.tsx'
import Caption from '~/components/typography/Caption.tsx'
import { COLORS } from '~/configs/theme.ts'
import { NotificationTypeName } from '~/types/notification.type.ts'
import { formatDate } from '~/utils/format.util.ts'

import clsx from 'clsx'
import type { AttachmentFile } from '~/types/lectures.type.ts'
import type { Nullable, NullableString } from '~/types/utils/nullable.type.ts'

interface Props {
  type: NotificationTypeName
  title: string
  createdAt: number
  description: string
  attachments: Nullable<AttachmentFile[]>
  link?: NullableString
  isNew?: boolean
  pinned?: boolean
}

export default function CardNotification({
  type,
  title,
  createdAt,
  description,
  attachments,
  link,
  isNew,
  pinned,
}: Props) {
  return (
    <CardCollapse
      className={clsx('relative', pinned && 'border-blue-400 border')}
      title={
        <Flex direction="column" gap={4} justify="center">
          <Body size={14} weight="bold">
            <div className="flex items-center space-x-2">
              <img
                alt="아이콘"
                css={notificationStyles.icon}
                src={getIcon(type)}
              />
              {pinned && <span className="h-[14px]">📌</span>}
            </div>

            {title}

            {isNew && <span css={notificationStyles.newLabel}>New</span>}
          </Body>
          <Caption color={COLORS.FONT['30']} size={12} weight="regular">
            {formatDate(createdAt, 'YYYY.MM.DD')}
          </Caption>
        </Flex>
      }
    >
      {description}

      {link && (
        <a
          css={notificationStyles.link}
          href={link}
          rel="noreferrer"
          target="_blank"
        >
          {link}
        </a>
      )}

      {attachments && attachments.length > 0 && (
        <div>
          {attachments.map((file, idx) => (
            <ButtonAttachment key={idx} attachment={file} />
          ))}
        </div>
      )}
    </CardCollapse>
  )
}

const getIcon = (type: NotificationTypeName) => {
  switch (type) {
    case NotificationTypeName.MATERIAL:
      return ImageEducation
    case NotificationTypeName.LECTURE_INVOICE:
      return ImagePayment
    case NotificationTypeName.NOTICE:
    default:
      return ImageNotice
  }
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

  link: css`
    display: block;
    //border-top: 1px solid #ddd;
    margin-top: 12px;
    color: ${COLORS.POINT.PRIMARY};
    word-break: break-all;
  `,
}
