import { useMutation } from '@apollo/client'
import { css, keyframes } from '@emotion/react'
import { useState } from 'react'
import { BiCheckCircle, BiFile, BiHide, BiShow } from 'react-icons/bi'

import CardBase from '~/components/cards/CardBase.tsx'
import Flex from '~/components/display/Flex.tsx'
import Body from '~/components/typography/Body.tsx'
import Caption from '~/components/typography/Caption.tsx'
import StatusTag from '~/components/utils/StatusTag.tsx'
import { COLORS } from '~/configs/theme.ts'
import { RetryMyWrongAnswerDocument } from '~/types/api'

import type { MyWrongAnswers_WrongAnswerFragment } from '~/types/api'

interface WrongAnswerCardProps {
  wrongAnswer: MyWrongAnswers_WrongAnswerFragment
}

function WrongAnswerCard({ wrongAnswer }: WrongAnswerCardProps) {
  const { exam, examAnswer, questionFile, questionImageDataUrl } = wrongAnswer
  const { question } = examAnswer

  // ? 내가 쓴 답 가리기 토글 (기본 가림)
  const [revealed, setRevealed] = useState(false)

  const [retryValue, setRetryValue] = useState('')
  const [localRetryCount, setLocalRetryCount] = useState(0)
  const [lastResult, setLastResult] = useState<'correct' | 'wrong' | null>(null)
  const [shaking, setShaking] = useState(false)

  const [retryMyWrongAnswer, { loading: retrying }] = useMutation(
    RetryMyWrongAnswerDocument,
  )

  const resolved = lastResult === 'correct' || (!lastResult && wrongAnswer.isResolved)
  const retryCount = examAnswer.retries.length + localRetryCount

  const handleRetry = async () => {
    const value = retryValue.trim()
    if (!value || retrying) return

    try {
      const { data } = await retryMyWrongAnswer({
        variables: {
          input: { examAnswerId: examAnswer.id, value },
        },
      })

      const retry = data?.retryMyWrongAnswer
      if (!retry) return

      setLocalRetryCount((count) => count + 1)

      if (retry.isCorrect) {
        setLastResult('correct')
      } else {
        setLastResult('wrong')
        setShaking(true)
        setTimeout(() => setShaking(false), 600)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <CardBase css={[cardStyle(resolved, lastResult === 'wrong'), shaking && shakeStyle]}>
      <Flex direction="column" gap={8}>
        <Flex gap={8} items="center" justify="space-between">
          <Caption color={COLORS.FONT['40']} size={10} weight="semibold">
            {exam.title}
          </Caption>

          {resolved ? (
            <StatusTag status="success">해결됨</StatusTag>
          ) : (
            <StatusTag status="danger">미해결</StatusTag>
          )}
        </Flex>

        <Flex gap={6} items="center" wrap="wrap">
          <Body size={16} weight="bold">
            문항 {question.no}번
          </Body>

          {question.unit && <span css={styles.unitTag}>{question.unit}</span>}

          <Caption color={COLORS.FONT['30']} size={10}>
            배점 {question.point}점
          </Caption>
        </Flex>

        <Flex gap={8} items="center">
          <Caption color={COLORS.FONT['60']} size={12} weight="semibold">
            내가 쓴 답
          </Caption>

          <Caption color={COLORS.TAG.RED} size={12} weight="bold">
            {revealed ? (examAnswer.value ?? '-') : '●●●'}
          </Caption>

          <button
            css={styles.revealButton}
            type="button"
            onClick={() => setRevealed((prev) => !prev)}
          >
            {revealed ? <BiHide size={16} /> : <BiShow size={16} />}
          </button>
        </Flex>

        {questionImageDataUrl && (
          <img
            alt={`문항 ${question.no}번`}
            css={styles.questionImage}
            src={questionImageDataUrl}
          />
        )}

        {questionFile?.url && (
          <a
            css={styles.pdfLink}
            href={questionFile.url}
            rel="noreferrer"
            target="_blank"
          >
            <BiFile size={14} />
            문제 PDF 열기
          </a>
        )}

        {resolved ? (
          <Flex css={styles.resolvedBox} gap={6} items="center">
            <BiCheckCircle color={COLORS.TAG.GREEN} size={18} />

            <Caption color={COLORS.TAG.GREEN} size={12} weight="bold">
              정답입니다! 오답을 해결했어요.
            </Caption>
          </Flex>
        ) : (
          <Flex direction="column" gap={6}>
            <Flex gap={6} items="center">
              <input
                css={styles.retryInput(lastResult === 'wrong')}
                placeholder="답 입력"
                value={retryValue}
                onChange={(e) => {
                  setRetryValue(e.target.value)
                  if (lastResult === 'wrong') {
                    setLastResult(null)
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRetry()
                  }
                }}
              />

              <button
                css={styles.retryButton}
                disabled={!retryValue.trim() || retrying}
                type="button"
                onClick={handleRetry}
              >
                다시 풀기
              </button>
            </Flex>

            {lastResult === 'wrong' && (
              <Caption color={COLORS.TAG.RED} size={12} weight="semibold">
                오답입니다. 다시 시도해보세요!
              </Caption>
            )}
          </Flex>
        )}

        {retryCount > 0 && (
          <Caption color={COLORS.FONT['30']} size={10}>
            재시도 {retryCount}회
          </Caption>
        )}
      </Flex>
    </CardBase>
  )
}

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
`

const shakeStyle = css`
  animation: ${shake} 0.5s ease-in-out;
`

const cardStyle = (resolved: boolean, wrong: boolean) => css`
  margin-bottom: 0;
  border: 1px solid
    ${resolved ? COLORS.TAG.GREEN : wrong ? COLORS.TAG.RED : 'transparent'};
  ${resolved && `background: ${COLORS.TAG.GREEN01};`}
`

const styles = {
  unitTag: css`
    padding: 1px 6px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: -0.1px;
    line-height: 14px;
    color: ${COLORS.FONT['60']};
    background: ${COLORS.BG['01']};
  `,

  revealButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 8px;
    color: ${COLORS.FONT['40']};
    background: ${COLORS.BG.BACKGROUND};
  `,

  questionImage: css`
    display: block;
    width: 100%;
    max-height: 280px;
    object-fit: contain;
    border: 1px solid ${COLORS.BG['03']};
    border-radius: 10px;
    background: #fff;
  `,

  pdfLink: css`
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 4px;
    padding: 6px 10px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.2px;
    color: ${COLORS.POINT.PRIMARY};
    background: ${COLORS.BG.BACKGROUND_TEXT};
  `,

  resolvedBox: css`
    padding: 10px 12px;
    border-radius: 12px;
    background: #fff;
  `,

  retryInput: (wrong: boolean) => css`
    flex: 1;
    min-width: 0;
    height: 40px;
    padding: 0 12px;
    border-radius: 10px;
    border: 1px solid ${wrong ? COLORS.TAG.RED : COLORS.BG.BACKGROUND};
    background: ${COLORS.BG.BACKGROUND};
    font-size: 14px;
    letter-spacing: -0.2px;
    color: ${COLORS.FONT['90']};
    outline: none;

    &:focus {
      border-color: ${COLORS.POINT.PRIMARY};
      background: #fff;
    }

    &::placeholder {
      color: ${COLORS.FONT['30']};
    }
  `,

  retryButton: css`
    flex-shrink: 0;
    height: 40px;
    padding: 0 14px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.2px;
    color: #fff;
    background: ${COLORS.POINT.PRIMARY};

    &:disabled {
      background: ${COLORS.POINT.SECONDARY};
    }
  `,
}

export default WrongAnswerCard
