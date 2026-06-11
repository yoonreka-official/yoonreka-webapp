import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import IconExpandLeft24 from '~/assets/svg/icon_expand_left_24.svg?react'
import Flex from '~/components/display/Flex.tsx'
import InputSwitch from '~/components/inputs/InputSwitch.tsx'
import Select from '~/components/inputs/Select.tsx'
import Body from '~/components/typography/Body.tsx'
import Caption from '~/components/typography/Caption.tsx'
import Headline from '~/components/typography/Headline.tsx'
import NoData from '~/components/utils/NoData.tsx'
import { COLORS } from '~/configs/theme.ts'
import useLoading from '~/hooks/useLoading.ts'
import Container from '~/layouts/Container.tsx'
import ScreenBase from '~/layouts/ScreenBase.tsx'
import WrongAnswerCard from '~/pages/wrong-answers/WrongAnswerCard.tsx'
import { GetMyWrongAnswersDocument } from '~/types/api'

import type { SelectOption } from '~/components/inputs/Select.tsx'

const ALL_EXAMS_OPTION: SelectOption = { label: '전체 시험', value: 'ALL' }

function WrongAnswersPage() {
  const navigate = useNavigate()

  const [params] = useSearchParams()

  // ? 성적 상세에서 ?examId= 로 진입 시 해당 시험으로 필터
  const [examId, setExamId] = useState<string | undefined>(
    params.get('examId') || undefined,
  )
  const [onlyUnresolved, setOnlyUnresolved] = useState(false)

  const { data, loading } = useQuery(GetMyWrongAnswersDocument, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables: {
      filter: {
        examId,
        onlyUnresolved: onlyUnresolved || undefined,
      },
    },
  })

  useLoading(loading && !data)

  // ? 시험 선택 옵션 (조회된 오답의 시험 누적)
  const [examOptions, setExamOptions] = useState<SelectOption[]>([])

  useEffect(() => {
    if (!data) return

    setExamOptions((prev) => {
      const map = new Map(prev.map((option) => [option.value, option]))

      data.wrongAnswers.forEach(({ exam }) => {
        if (!map.has(exam.id)) {
          map.set(exam.id, { label: exam.title, value: exam.id })
        }
      })

      return Array.from(map.values())
    })
  }, [data])

  const wrongAnswers = useMemo(() => data?.wrongAnswers ?? [], [data])

  return (
    <ScreenBase
      header={
        <header css={styles.header}>
          <Flex gap={6} items="center">
            <button
              css={styles.backButton}
              type="button"
              onClick={() => navigate(-1)}
            >
              <IconExpandLeft24 />
            </button>

            <Headline>오답노트</Headline>
          </Flex>
        </header>
      }
    >
      <Container>
        <Flex direction="column" gap={10}>
          <Flex direction="column" gap={8}>
            <Select
              options={[ALL_EXAMS_OPTION, ...examOptions]}
              placeholder="시험 선택"
              value={examId ?? ALL_EXAMS_OPTION.value}
              onChange={(value) => {
                setExamId(value === ALL_EXAMS_OPTION.value ? undefined : value)
              }}
            />

            <Flex css={styles.filterRow} items="center" justify="space-between">
              <Body size={14} weight="semibold">
                미해결 오답만 보기
              </Body>

              <InputSwitch
                checked={onlyUnresolved}
                size="small"
                onChange={(checked) => setOnlyUnresolved(checked)}
              />
            </Flex>
          </Flex>

          {!loading && wrongAnswers.length === 0 && (
            <NoData
              description={
                <Body color={COLORS.FONT['30']} size={14}>
                  {onlyUnresolved
                    ? '미해결 오답이 없습니다.'
                    : '등록된 오답이 없습니다.'}
                </Body>
              }
              disableWrapper
            />
          )}

          {wrongAnswers.length > 0 && (
            <Caption color={COLORS.FONT['40']} size={12}>
              총 {wrongAnswers.length}개의 오답
            </Caption>
          )}

          {wrongAnswers.map((wrongAnswer) => (
            <WrongAnswerCard
              key={wrongAnswer.examAnswer.id}
              wrongAnswer={wrongAnswer}
            />
          ))}
        </Flex>
      </Container>
    </ScreenBase>
  )
}

const styles = {
  header: css`
    background: #fff;
    padding: 15px 14px 13px;
    border-bottom: 1px solid ${COLORS.BG['03']};
  `,

  backButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
  `,

  filterRow: css`
    padding: 12px 16px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0px 4px 20px 0px rgba(206, 218, 241, 0.4);
  `,
}

export default WrongAnswersPage
