import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import CardBase from '~/components/cards/CardBase.tsx'
import Flex from '~/components/display/Flex.tsx'
import Body from '~/components/typography/Body.tsx'
import Caption from '~/components/typography/Caption.tsx'
import StatusTag from '~/components/utils/StatusTag.tsx'
import { COLORS } from '~/configs/theme.ts'

import type { CardBaseProps } from '~/components/cards/CardBase.tsx'
import ButtonAttachment from '~/components/notifications/ButtonAttachment'
import { Inquiry } from '~/types/api'
import { AttachmentFile } from '~/types/lectures.type'

export interface CardQuestionProps extends CardBaseProps {
  question: Inquiry
  onChange?: (open: boolean) => void
}

export function CardQuestion({
  question,
  className,
  onChange,
}: CardQuestionProps) {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(!open)
    onChange?.(!open)
  }

  useEffect(() => {
    return () => {
      setOpen(false)
    }
  }, [])

  return (
    <CardBase className={className} css={styles.cardCollapse}>
      <header css={styles.header} onClick={() => toggle()}>
        <Flex gap={4} items="center" justify="space-between">
          <Body size={14} weight="semibold">
            {question.title}
          </Body>

          {question.answer ? (
            <StatusTag status="success">답변 완료</StatusTag>
          ) : (
            <StatusTag status="warning">응답 대기중</StatusTag>
          )}
        </Flex>
      </header>

      <div css={[styles.bodyWrapper, open && styles.open]}>
        <div css={styles.body}>{question.description}</div>

        {question.attachments && question.attachments.length > 0 && (
          <div>
            {question.attachments.map((attachment) => (
              <ButtonAttachment
                key={attachment.id}
                attachment={attachment as unknown as AttachmentFile}
              />
            ))}
          </div>
        )}

        {question.answer && (
          <>
            <br />
            <Flex gap={4} items="center">
              <Caption color={COLORS.FONT['40']} size={12} weight="bold">
                답변
              </Caption>

              <Caption color={COLORS.FONT['40']} size={10}>
                ({dayjs(question.answeredAt).format('YYYY-MM-DD HH:mm')})
              </Caption>
            </Flex>
            <div css={styles.answer}>
              {question.answer}

              {question.link && (
                <a
                  css={styles.link}
                  href={question.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  {question.link}
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </CardBase>
  )
}

const styles = {
  cardCollapse: css`
    //background: red;
  `,

  header: css``,

  buttonOpen: css`
    svg > path {
      stroke: #b4cdef;
    }
  `,

  bodyWrapper: css`
    overflow: hidden;
    will-change: max-height;
    max-height: 0;
    transition: max-height 0.4s ease-in-out;
  `,

  open: css`
    max-height: 1000px;
  `,

  body: css`
    border-top: 1px solid ${COLORS.BG['01']};
    padding-top: 12px;
    margin-top: 10px;
    white-space: pre-line;

    color: ${COLORS.FONT['80']};
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 150% */
    letter-spacing: -0.2px;
  `,

  answer: css`
    display: flex;
    padding: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
    border-radius: 8px;
    background: ${COLORS.BG.BACKGROUND};

    color: ${COLORS.FONT['80']};
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 150% */
    letter-spacing: -0.2px;

    white-space: pre-wrap;
  `,

  link: css`
    display: block;
    //border-top: 1px solid #ddd;
    margin-top: 12px;
    color: ${COLORS.POINT.PRIMARY};
    word-break: break-all;
  `,
}
