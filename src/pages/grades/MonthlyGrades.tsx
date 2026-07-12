import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import Select from '~/components/inputs/Select.tsx'
import { COLORS } from '~/configs/theme.ts'
import { GradeType } from '~/types/api'
import {
  buildMonthlyGradeSections,
  formatLessonTime,
  getMonthlyGradeDisplayValue,
  mergeLessonGradesByLesson,
} from '~/utils/grades.util.ts'

import type {
  GradeMonthlyTab_LessonFragment,
  GradeMonthlyTab_LessonGradeFragment,
} from '~/types/api'
import type {
  MergedLessonGrade,
  MonthlyGradeSection,
} from '~/utils/grades.util.ts'

type MergedMonthlyGrade = MergedLessonGrade<
  GradeMonthlyTab_LessonFragment,
  GradeMonthlyTab_LessonGradeFragment
>

type MonthlyGroupedData = {
  items: MergedMonthlyGrade[]
  month: string
}

export interface MonthlyGradesProps {
  lessonGrades: GradeMonthlyTab_LessonGradeFragment[]
}

export function MonthlyGrades({ lessonGrades }: MonthlyGradesProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | 'all'>('all')

  const dataSource = useMemo<MonthlyGroupedData[]>(() => {
    const mergedLessonGrades = mergeLessonGradesByLesson<
      GradeMonthlyTab_LessonFragment,
      GradeMonthlyTab_LessonGradeFragment
    >(lessonGrades)
    const groupedByMonth = mergedLessonGrades.reduce(
      (acc, lessonGrade) => {
        const monthKey = dayjs(lessonGrade.lesson.date).format('YYYY-MM')

        if (!acc[monthKey]) {
          acc[monthKey] = []
        }
        acc[monthKey].push(lessonGrade)

        return acc
      },
      {} as Record<string, MergedMonthlyGrade[]>,
    )

    return Object.entries(groupedByMonth)
      .map(([month, items]) => ({ month, items }))
      .sort((a, b) => b.month.localeCompare(a.month))
  }, [lessonGrades])

  const monthOptions = useMemo(
    () => [
      { value: 'all', label: '전체 월' },
      ...dataSource.map((monthGroup) => ({
        value: monthGroup.month,
        label: dayjs(`${monthGroup.month}-01`).format('YYYY년 M월'),
      })),
    ],
    [dataSource],
  )

  useEffect(() => {
    if (
      selectedMonth !== 'all' &&
      !dataSource.some((monthGroup) => monthGroup.month === selectedMonth)
    ) {
      setSelectedMonth('all')
    }
  }, [dataSource, selectedMonth])

  const filteredDataSource = useMemo(() => {
    if (selectedMonth === 'all') {
      return dataSource
    }
    return dataSource.filter((monthGroup) => monthGroup.month === selectedMonth)
  }, [dataSource, selectedMonth])

  return (
    <div css={styles.wrapper}>
      <div css={styles.monthFilter}>
        <span css={styles.filterLabel}>조회 월</span>
        <Select
          ariaLabel="조회 월"
          css={styles.monthSelect}
          value={selectedMonth}
          onChange={(value) => setSelectedMonth(value || 'all')}
          options={monthOptions}
          placeholder="월을 선택해주세요"
        />
      </div>

      <div css={styles.monthList}>
        {filteredDataSource.map((monthGroup) => {
          const headingId = `monthly-grade-${monthGroup.month}`

          return (
            <section
              key={monthGroup.month}
              aria-labelledby={headingId}
              css={styles.monthCard}
            >
              <header css={styles.monthHeader}>
                <div>
                  <div css={styles.monthEyebrow}>월별 성적 요약</div>
                  <h2 id={headingId} css={styles.monthTitle}>
                    {dayjs(`${monthGroup.month}-01`).format('YYYY년 M월')}
                  </h2>
                </div>

                <span css={styles.lessonCount}>
                  성적 회차 {monthGroup.items.length}회
                </span>
              </header>

              <div css={styles.lessonList}>
                {monthGroup.items.map((lessonGrade) => (
                  <MonthlyLessonGrade
                    key={lessonGrade.lesson.id}
                    lessonGrade={lessonGrade}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

function MonthlyLessonGrade({
  lessonGrade,
}: {
  lessonGrade: MergedMonthlyGrade
}) {
  const { grades, lesson } = lessonGrade
  const defaultGrade = grades[GradeType.Default]
  const examGrade = grades[GradeType.Exam]

  const sections = useMemo(
    () =>
      buildMonthlyGradeSections([
        ...(defaultGrade
          ? [
              {
                gradeType: GradeType.Default,
                labels: lesson.lecture.defaultGradeForm?.labels ?? [],
                data: defaultGrade.data,
                onlyWithData: true,
              },
            ]
          : []),
        ...(examGrade
          ? [
              {
                gradeType: GradeType.Exam,
                labels: lesson.lecture.examGradeForm?.labels ?? [],
                data: examGrade.data,
                onlyWithData: true,
              },
            ]
          : []),
      ]),
    [defaultGrade?.data, examGrade?.data, lesson.lecture],
  )

  const comments = [
    ...new Set(
      [defaultGrade?.comment, examGrade?.comment]
        .map((comment) => comment?.trim())
        .filter((comment): comment is string => !!comment),
    ),
  ]
  const lessonHeadingId = `monthly-lesson-${lesson.id}`

  return (
    <article aria-labelledby={lessonHeadingId} css={styles.lessonCard}>
      <Lecture headingId={lessonHeadingId} lesson={lesson} />

      <div css={styles.lessonContent}>
        {sections.map((section, index) => (
          <Grades
            key={section.type}
            headingId={`${lessonHeadingId}-section-${index}`}
            section={section}
          />
        ))}

        {!sections.length && (
          <div css={styles.emptyGrades}>입력된 성적이 없습니다.</div>
        )}

        {!!comments.length && (
          <section aria-label="선생님 코멘트" css={styles.commentSection}>
            <h4 css={styles.commentTitle}>선생님 코멘트</h4>
            <div css={styles.commentBox}>
              {comments.map((comment) => (
                <p key={comment}>{comment}</p>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

function Lecture({
  headingId,
  lesson,
}: {
  headingId: string
  lesson: GradeMonthlyTab_LessonFragment
}) {
  const lessonTime = formatLessonTime(lesson.startTime, lesson.endTime)

  return (
    <header css={styles.lessonHeader}>
      <h3 id={headingId} css={styles.lessonTitle}>
        {lesson.lecture.title}
      </h3>
      <div css={styles.lessonMeta}>
        <time dateTime={lesson.date}>
          {dayjs(lesson.date).format('YYYY.MM.DD (ddd)')}
        </time>
        {lessonTime && <span>{lessonTime}</span>}
      </div>
    </header>
  )
}

function Grades({
  headingId,
  section,
}: {
  headingId: string
  section: MonthlyGradeSection
}) {
  return (
    <section aria-labelledby={headingId} css={styles.gradeSection}>
      <div css={styles.sectionHeader}>
        <h4 id={headingId}>{formatSectionTitle(section.type)}</h4>
        <span>{section.rows.length}개 항목</span>
      </div>

      <div css={styles.gradeRows}>
        {section.rows.map((row) => {
          const displayValue = getMonthlyGradeDisplayValue(row.data)

          return (
            <div key={row.key} css={styles.gradeRow}>
              <div css={styles.gradeText}>
                <div css={styles.gradeLabel}>{row.label.value}</div>
                {displayValue.detail && (
                  <div css={styles.gradeDetail}>{displayValue.detail}</div>
                )}
              </div>

              {displayValue.score && (
                <div css={styles.gradeScore}>{displayValue.score}</div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function formatSectionTitle(type: string): string {
  return type === '지윤T모의고사' ? '지윤T 모의고사' : type
}

const styles = {
  wrapper: css`
    padding-top: 2px;
  `,

  monthFilter: css`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 18px;
  `,

  filterLabel: css`
    padding-left: 4px;
    color: ${COLORS.FONT['70']};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
  `,

  monthSelect: css`
    min-height: 52px;
    border: 1px solid ${COLORS.BG['03']};

    &[data-open='true'] {
      border-color: ${COLORS.POINT.PRIMARY};
    }

    &:focus-visible {
      outline: 2px solid ${COLORS.POINT.PRIMARY};
      outline-offset: 2px;
    }
  `,

  monthList: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,

  monthCard: css`
    overflow: hidden;
    border-radius: 24px;
    background: #fff;
    box-shadow: 0 8px 28px rgba(110, 133, 174, 0.12);
  `,

  monthHeader: css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    padding: 20px 16px 16px;
    border-bottom: 1px solid ${COLORS.BG['03']};
  `,

  monthEyebrow: css`
    margin-bottom: 3px;
    color: ${COLORS.POINT.TERTIARY};
    font-size: 10px;
    font-weight: 800;
    line-height: 14px;
    letter-spacing: -0.1px;
  `,

  monthTitle: css`
    margin: 0;
    color: ${COLORS.FONT['90']};
    font-size: 22px;
    font-weight: 800;
    line-height: 30px;
    letter-spacing: -0.4px;
  `,

  lessonCount: css`
    flex-shrink: 0;
    padding: 5px 9px;
    border-radius: 999px;
    color: ${COLORS.POINT.TERTIARY};
    background: ${COLORS.BG['01']};
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
  `,

  lessonList: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
  `,

  lessonCard: css`
    overflow: hidden;
    border: 1px solid ${COLORS.BG['03']};
    border-radius: 18px;
    background: #fff;
  `,

  lessonHeader: css`
    padding: 14px;
    background: ${COLORS.BG.BACKGROUND_TEXT};
  `,

  lessonTitle: css`
    margin: 0;
    color: ${COLORS.FONT['90']};
    font-size: 16px;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.2px;
    word-break: keep-all;
    overflow-wrap: anywhere;
  `,

  lessonMeta: css`
    display: flex;
    flex-wrap: wrap;
    gap: 2px 8px;
    margin-top: 4px;
    color: ${COLORS.FONT['70']};
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;

    span::before {
      content: '·';
      margin-right: 8px;
      color: ${COLORS.BG['04']};
    }
  `,

  lessonContent: css`
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 14px;
  `,

  gradeSection: css`
    min-width: 0;
  `,

  sectionHeader: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 7px;

    h4 {
      margin: 0;
      color: ${COLORS.FONT['90']};
      font-size: 14px;
      font-weight: 800;
      line-height: 20px;
      word-break: keep-all;
    }

    span {
      flex-shrink: 0;
      color: ${COLORS.FONT['70']};
      font-size: 11px;
      font-weight: 600;
      line-height: 16px;
    }
  `,

  gradeRows: css`
    overflow: hidden;
    border: 1px solid ${COLORS.BG['03']};
    border-radius: 14px;
  `,

  gradeRow: css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) max-content;
    align-items: start;
    gap: 12px;
    padding: 12px;

    & + & {
      border-top: 1px solid ${COLORS.BG['03']};
    }
  `,

  gradeText: css`
    min-width: 0;
  `,

  gradeLabel: css`
    color: ${COLORS.FONT['80']};
    font-size: 14px;
    font-weight: 650;
    line-height: 20px;
    letter-spacing: -0.15px;
    word-break: keep-all;
    overflow-wrap: anywhere;
  `,

  gradeDetail: css`
    margin-top: 3px;
    color: ${COLORS.FONT['70']};
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    word-break: keep-all;
    overflow-wrap: anywhere;
  `,

  gradeScore: css`
    min-width: 66px;
    padding: 6px 9px;
    border-radius: 10px;
    color: ${COLORS.POINT.TERTIARY};
    background: ${COLORS.BG['01']};
    font-size: 14px;
    font-weight: 800;
    line-height: 20px;
    text-align: center;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  `,

  emptyGrades: css`
    padding: 14px;
    border-radius: 12px;
    color: ${COLORS.FONT['70']};
    background: ${COLORS.BG.BACKGROUND};
    font-size: 13px;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
  `,

  commentSection: css`
    display: flex;
    flex-direction: column;
    gap: 7px;
  `,

  commentTitle: css`
    margin: 0;
    color: ${COLORS.FONT['90']};
    font-size: 14px;
    font-weight: 800;
    line-height: 20px;
  `,

  commentBox: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border-radius: 12px;
    color: ${COLORS.FONT['80']};
    background: ${COLORS.BG['01']};
    font-size: 12px;
    font-weight: 500;
    line-height: 19px;
    white-space: pre-wrap;
    overflow-wrap: anywhere;

    p {
      margin: 0;
    }
  `,
}
