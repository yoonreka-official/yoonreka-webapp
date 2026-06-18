import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { BiCheckCircle, BiFile, BiMinusCircle, BiXCircle } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'

import IconExpandLeft24 from '~/assets/svg/icon_expand_left_24.svg?react'
import CardBase from '~/components/cards/CardBase.tsx'
import Flex from '~/components/display/Flex.tsx'
import Body from '~/components/typography/Body.tsx'
import Caption from '~/components/typography/Caption.tsx'
import Headline from '~/components/typography/Headline.tsx'
import NoData from '~/components/utils/NoData.tsx'
import StatusTag from '~/components/utils/StatusTag.tsx'
import { COLORS } from '~/configs/theme.ts'
import useLoading from '~/hooks/useLoading.ts'
import Container from '~/layouts/Container.tsx'
import ScreenBase from '~/layouts/ScreenBase.tsx'
import ExamHistogram from '~/pages/grades/exams/ExamHistogram.tsx'
import {
  ExamSubmitType,
  GetMyExamResultDocument,
  GetMyExamSubmissionsDocument,
} from '~/types/api'

import type {
  GetMyExamSubmissionsQuery,
  MyExamResult_QuestionResultFragment,
} from '~/types/api'

/** 소수점 1자리까지 점수 표기 */
const formatScore = (value?: number | null) =>
  value == null ? '-' : `${Math.round(value * 10) / 10}`

function ExamResultPage() {
  const { examId } = useParams<{ examId?: string }>()

  if (!examId) {
    return <ExamSubmissionsPage />
  }

  return <ExamResultDetailPage examId={examId} />
}

function ExamSubmissionsPage() {
  const navigate = useNavigate()
  const { data, loading } = useQuery(GetMyExamSubmissionsDocument, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  useLoading(loading && !data)

  const submissions = useMemo(
    () =>
      [...(data?.submissions ?? [])].sort(
        (a, b) => (b.confirmedAt ?? b.createdAt) - (a.confirmedAt ?? a.createdAt),
      ),
    [data],
  )

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

            <Headline>시험 성적</Headline>
          </Flex>
        </header>
      }
    >
      <Container>
        <Flex direction="column" gap={10}>
          {!loading && submissions.length === 0 && (
            <NoData
              description={
                <Body color={COLORS.FONT['30']} size={14}>
                  확정된 시험 성적이 없습니다.
                </Body>
              }
              disableWrapper
            />
          )}

          {submissions.length > 0 && (
            <Caption color={COLORS.FONT['40']} size={12}>
              총 {submissions.length}개의 시험 성적
            </Caption>
          )}

          {submissions.map((submission) => (
            <ExamSubmissionCard key={submission.id} submission={submission} />
          ))}
        </Flex>
      </Container>
    </ScreenBase>
  )
}

type ExamSubmissionItem = GetMyExamSubmissionsQuery['submissions'][number]

function ExamSubmissionCard({ submission }: { submission: ExamSubmissionItem }) {
  const navigate = useNavigate()
  const { data, loading } = useQuery(GetMyExamResultDocument, {
    fetchPolicy: 'cache-first',
    variables: { submissionId: submission.id },
  })

  const result = data?.examResult
  const exam = result?.exam
  const resultSubmission = result?.submission ?? submission
  const statistics = result?.statistics
  const confirmedAt = resultSubmission.confirmedAt ?? submission.createdAt

  return (
    <button
      css={styles.examListCard}
      type="button"
      onClick={() => navigate(`/grades/exams/${submission.examId}`)}
    >
      <Flex direction="column" gap={10}>
        <Flex gap={6} items="center" wrap="wrap">
          {exam?.category && <StatusTag status="default">{exam.category}</StatusTag>}

          <StatusTag status="info">
            {resultSubmission.submitType === ExamSubmitType.Onsite
              ? '현장 응시'
              : '온라인 응시'}
          </StatusTag>

          {resultSubmission.isPassed != null && (
            <StatusTag status={resultSubmission.isPassed ? 'success' : 'danger'}>
              {resultSubmission.isPassed ? '통과' : '미통과'}
            </StatusTag>
          )}
        </Flex>

        <Flex direction="column" gap={3}>
          <Body size={16} weight="bold">
            {loading ? '시험 정보를 불러오는 중입니다.' : exam?.title ?? `시험 ${submission.examId}`}
          </Body>

          <Caption color={COLORS.FONT['40']} size={12}>
            {dayjs(confirmedAt).format('YYYY.MM.DD HH:mm')} 확정
          </Caption>
        </Flex>

        <div css={styles.examListSummaryGrid}>
          <div css={styles.examListSummaryItem}>
            <Caption color={COLORS.FONT['40']} size={10}>
              내 점수
            </Caption>
            <Body size={16} weight="bold">
              {formatScore(resultSubmission.totalScore)}
              {exam ? ` / ${formatScore(exam.maxScore)}점` : '점'}
            </Body>
          </div>

          <div css={styles.examListSummaryItem}>
            <Caption color={COLORS.FONT['40']} size={10}>
              내 등수
            </Caption>
            <Body size={16} weight="bold">
              {statistics?.myRank != null ? `${statistics.myRank}등` : '-'}
            </Body>
          </div>

          <div css={styles.examListSummaryItem}>
            <Caption color={COLORS.FONT['40']} size={10}>
              평균
            </Caption>
            <Body size={16} weight="bold">
              {formatScore(statistics?.mean)}
            </Body>
          </div>
        </div>
      </Flex>
    </button>
  )
}

function ExamResultDetailPage({ examId }: { examId: string }) {
  const navigate = useNavigate()

  // ? 시험 ID → 내 제출(채점 확정분) 매칭
  const { data: submissionsData, loading: submissionsLoading } = useQuery(
    GetMyExamSubmissionsDocument,
    {
      fetchPolicy: 'cache-and-network',
    },
  )

  const submissionId = useMemo(
    () =>
      submissionsData?.submissions.find(
        (submission) => submission.examId === examId,
      )?.id,
    [submissionsData, examId],
  )

  const { data, loading: resultLoading } = useQuery(GetMyExamResultDocument, {
    skip: !submissionId,
    variables: { submissionId: submissionId as string },
  })

  const loading = submissionsLoading || resultLoading
  useLoading(loading)

  const result = data?.examResult
  const exam = result?.exam
  const submission = result?.submission
  const statistics = result?.statistics
  const displaySettings = result?.displaySettings

  // ? displaySettings 가 명시적으로 false 인 섹션만 숨김
  const showRank = displaySettings?.showRank !== false
  const showLevel = displaySettings?.showLevel !== false
  const showStatistics = displaySettings?.showStatistics !== false
  const showHistogram = displaySettings?.showHistogram !== false

  // ? 등급컷 기반 나의 등급 (점수 >= 등급컷 점수 중 가장 높은 등급)
  const myLevel = useMemo(() => {
    const levelCuts = exam?.levelCuts
    const totalScore = submission?.totalScore

    if (!levelCuts || levelCuts.length === 0 || totalScore == null) {
      return null
    }

    const sorted = [...levelCuts].sort((a, b) => a.level - b.level)
    const matched = sorted.find((cut) => totalScore >= cut.score)

    return matched ? matched.level : sorted[sorted.length - 1].level + 1
  }, [exam, submission])

  // ? 내 점수가 속한 히스토그램 구간 (만점 대비 20% 단위)
  const myBucketIndex = useMemo(() => {
    const totalScore = submission?.totalScore
    const maxScore = exam?.maxScore

    if (totalScore == null || !maxScore) {
      return undefined
    }

    const percent = (totalScore / maxScore) * 100
    return Math.min(Math.max(Math.ceil(percent / 20) - 1, 0), 4)
  }, [exam, submission])

  const statCards = useMemo(() => {
    if (!statistics) {
      return []
    }

    const cards: Array<{ label: string; value: string }> = []

    if (showLevel && myLevel != null) {
      cards.push({ label: '나의 등급', value: `${myLevel}등급` })
    }

    if (showStatistics) {
      cards.push(
        { label: '평균', value: formatScore(statistics.mean) },
        {
          label: '상위 10% 평균',
          value: formatScore(statistics.topTenPercentMean),
        },
        { label: '표준편차', value: formatScore(statistics.stddev) },
        { label: '최고 점수', value: formatScore(statistics.max) },
        { label: '응시 인원', value: `${statistics.applicants}명` },
      )
    }

    return cards
  }, [statistics, showLevel, showStatistics, myLevel])

  const questionResults = useMemo(
    () =>
      [...(result?.questionResults ?? [])].sort((a, b) => a.no - b.no),
    [result],
  )

  const notFound = !loading && !!submissionsData && !result

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

            <Headline>성적 보기</Headline>
          </Flex>
        </header>
      }
    >
      <Container>
        {notFound && (
          <NoData
            description={
              <Body color={COLORS.FONT['30']} size={14}>
                확정된 시험 성적을 찾을 수 없습니다.
              </Body>
            }
          />
        )}

        {result && exam && submission && statistics && (
          <Flex direction="column" gap={10}>
            <CardBase css={styles.noMarginCard}>
              <Flex direction="column" gap={8}>
                <Flex gap={6} items="center" wrap="wrap">
                  {exam.category && (
                    <StatusTag status="default">{exam.category}</StatusTag>
                  )}

                  <StatusTag status="info">
                    {submission.submitType === ExamSubmitType.Onsite
                      ? '현장 응시'
                      : '온라인 응시'}
                  </StatusTag>

                  {exam.isRetest && <StatusTag status="warning">재시험</StatusTag>}
                </Flex>

                <Body size={18} weight="bold">
                  {exam.title}
                </Body>

                <Flex gap={6} items="flex-end">
                  <div css={styles.myScore}>
                    {formatScore(submission.totalScore)}
                  </div>

                  <Body color={COLORS.FONT['40']} size={16} weight="medium">
                    / {formatScore(exam.maxScore)}점
                  </Body>
                </Flex>

                {showRank && statistics.myRank != null && (
                  <Caption color={COLORS.FONT['60']} size={12} weight="semibold">
                    내 등수 {statistics.myRank}등 · 응시 인원{' '}
                    {statistics.applicants}명
                  </Caption>
                )}
              </Flex>
            </CardBase>

            {statCards.length > 0 && (
              <CardBase css={styles.noMarginCard}>
                <Caption
                  className="mb-2"
                  color={COLORS.FONT['60']}
                  size={12}
                  weight="bold"
                >
                  시험 통계
                </Caption>

                <div css={styles.statGrid}>
                  {statCards.map((card) => (
                    <div key={card.label} css={styles.statCard}>
                      <Caption color={COLORS.FONT['40']} size={10}>
                        {card.label}
                      </Caption>

                      <Body size={16} weight="bold">
                        {card.value}
                      </Body>
                    </div>
                  ))}
                </div>
              </CardBase>
            )}

            {showHistogram && (
              <CardBase css={styles.noMarginCard}>
                <Caption
                  className="mb-2"
                  color={COLORS.FONT['60']}
                  size={12}
                  weight="bold"
                >
                  점수대별 인원
                </Caption>

                <ExamHistogram
                  histogram={statistics.histogram}
                  myBucketIndex={myBucketIndex}
                />
              </CardBase>
            )}

            {showLevel && (exam.levelCuts?.length ?? 0) > 0 && (
              <CardBase css={styles.noMarginCard}>
                <Caption
                  className="mb-2"
                  color={COLORS.FONT['60']}
                  size={12}
                  weight="bold"
                >
                  등급컷
                </Caption>

                <Flex direction="column" gap={6}>
                  {[...(exam.levelCuts ?? [])]
                    .sort((a, b) => a.level - b.level)
                    .map((cut) => (
                      <Flex
                        key={cut.level}
                        css={styles.levelCutRow(cut.level === myLevel)}
                        items="center"
                        justify="space-between"
                      >
                        <Caption
                          color={
                            cut.level === myLevel
                              ? COLORS.POINT.PRIMARY
                              : COLORS.FONT['60']
                          }
                          size={12}
                          weight="semibold"
                        >
                          {cut.level}등급
                          {cut.level === myLevel && ' (나의 등급)'}
                        </Caption>

                        <Caption color={COLORS.FONT['80']} size={12} weight="bold">
                          {formatScore(cut.score)}점 이상
                        </Caption>
                      </Flex>
                    ))}
                </Flex>
              </CardBase>
            )}

            <CardBase css={styles.noMarginCard}>
              <Flex
                className="mb-2"
                items="center"
                justify="space-between"
              >
                <Caption color={COLORS.FONT['60']} size={12} weight="bold">
                  문항별 결과
                </Caption>

                {result.questionFile?.url && (
                  <a
                    css={styles.pdfLink}
                    href={result.questionFile.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <BiFile size={14} />
                    문제 PDF
                  </a>
                )}
              </Flex>

              <Flex direction="column" gap={8}>
                {questionResults.map((questionResult) => (
                  <QuestionResultRow
                    key={questionResult.no}
                    result={questionResult}
                    onWrongNoteClick={() =>
                      navigate(`/wrong-answers?examId=${exam.id}`)
                    }
                  />
                ))}
              </Flex>
            </CardBase>
          </Flex>
        )}
      </Container>
    </ScreenBase>
  )
}

interface QuestionResultRowProps {
  result: MyExamResult_QuestionResultFragment
  onWrongNoteClick: () => void
}

function QuestionResultRow({ result, onWrongNoteClick }: QuestionResultRowProps) {
  const isWrong = result.isCorrect === false

  return (
    <div css={styles.questionRow(isWrong)}>
      <Flex gap={10} items="center">
        {result.isCorrect == null && (
          <BiMinusCircle
            color={COLORS.FONT['30']}
            css={styles.resultIcon}
            size={20}
          />
        )}

        {result.isCorrect === true && (
          <BiCheckCircle
            color={COLORS.TAG.GREEN}
            css={styles.resultIcon}
            size={20}
          />
        )}

        {result.isCorrect === false && (
          <BiXCircle color={COLORS.TAG.RED} css={styles.resultIcon} size={20} />
        )}

        <Flex direction="column" flex={1} gap={2}>
          <Flex gap={6} items="center">
            <Body size={14} weight="semibold">
              {result.no}번
            </Body>

            {result.unit && (
              <span css={styles.unitTag}>{result.unit}</span>
            )}
          </Flex>

          <Caption color={COLORS.FONT['60']} size={12}>
            내 답 {result.value ?? '-'} · 정답 {result.answer}
          </Caption>

          <Caption color={COLORS.FONT['30']} size={10}>
            배점 {formatScore(result.point)}점 · 득점{' '}
            {formatScore(result.earnedPoint ?? 0)}점
          </Caption>

          {result.questionImageDataUrl && (
            <img
              alt={`문항 ${result.no}번`}
              css={styles.questionImage}
              src={result.questionImageDataUrl}
            />
          )}
        </Flex>

        {isWrong && (
          <button
            css={styles.wrongNoteButton}
            type="button"
            onClick={onWrongNoteClick}
          >
            오답노트
          </button>
        )}
      </Flex>
    </div>
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

  noMarginCard: css`
    margin-bottom: 0;
  `,

  examListCard: css`
    width: 100%;
    padding: 14px;
    border: 0;
    text-align: left;
    color: inherit;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0px 4px 20px 0px rgba(206, 218, 241, 0.4);
    cursor: pointer;
  `,

  examListSummaryGrid: css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  `,

  examListSummaryItem: css`
    min-width: 0;
    padding: 10px;
    border-radius: 12px;
    background: ${COLORS.BG.BACKGROUND};
  `,

  myScore: css`
    font-size: 32px;
    font-weight: 700;
    line-height: 38px;
    letter-spacing: -0.5px;
    color: ${COLORS.POINT.PRIMARY};
  `,

  statGrid: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  `,

  statCard: css`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 12px;
    border-radius: 12px;
    background: ${COLORS.BG.BACKGROUND};
  `,

  levelCutRow: (active: boolean) => css`
    padding: 8px 12px;
    border-radius: 10px;
    background: ${active ? COLORS.BG.BACKGROUND_TEXT : COLORS.BG.BACKGROUND};
  `,

  pdfLink: css`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.2px;
    color: ${COLORS.POINT.PRIMARY};
  `,

  questionRow: (isWrong: boolean) => css`
    padding: 10px 12px;
    border-radius: 12px;
    background: ${isWrong ? COLORS.TAG.RED01 : COLORS.BG.BACKGROUND};
  `,

  questionImage: css`
    display: block;
    width: 100%;
    max-height: 220px;
    margin-top: 6px;
    object-fit: contain;
    border: 1px solid ${COLORS.BG['03']};
    border-radius: 10px;
    background: #fff;
  `,

  resultIcon: css`
    flex-shrink: 0;
  `,

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

  wrongNoteButton: css`
    flex-shrink: 0;
    padding: 6px 10px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.2px;
    color: #fff;
    background: ${COLORS.POINT.PRIMARY};
  `,
}

export default ExamResultPage
