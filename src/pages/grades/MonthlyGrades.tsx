import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import Select from '~/components/inputs/Select.tsx'
import { COLORS } from '~/configs/theme.ts'
import { GradeType } from '~/types/api'
import {
  buildMonthlyReportGradeRows,
  formatLessonTime,
  formatMonthlyReportAttendanceStatus,
  getMonthlyReportComments,
  getMonthlyReportMonthKey,
  mapMonthlyReportSummariesByMonth,
  mergeLessonGradesByLesson,
} from '~/utils/grades.util.ts'

import type {
  GradeMonthlyTab_LessonFragment,
  GradeMonthlyTab_LessonGradeFragment,
  GradeMonthlyTab_LessonGradeMonthlyFragment,
} from '~/types/api'
import type {
  MergedLessonGrade,
  MonthlyReportGradeRow,
} from '~/utils/grades.util.ts'

type MergedMonthlyGrade = MergedLessonGrade<
  GradeMonthlyTab_LessonFragment,
  GradeMonthlyTab_LessonGradeFragment
>

type MonthlyGroupedData = {
  items: MergedMonthlyGrade[]
  month: string
}

type MonthlySummaryScore =
  GradeMonthlyTab_LessonGradeMonthlyFragment['score']

export interface MonthlyGradesProps {
  lessonGradeMonthlies: GradeMonthlyTab_LessonGradeMonthlyFragment[]
  lessonGrades: GradeMonthlyTab_LessonGradeFragment[]
}

export function MonthlyGrades({
  lessonGradeMonthlies,
  lessonGrades,
}: MonthlyGradesProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | 'all'>('all')

  const dataSource = useMemo<MonthlyGroupedData[]>(() => {
    const groupedByMonth = new Map<string, MergedMonthlyGrade[]>()

    for (const lessonGrade of mergeLessonGradesByLesson<
      GradeMonthlyTab_LessonFragment,
      GradeMonthlyTab_LessonGradeFragment
    >(lessonGrades)) {
      const month = getMonthlyReportMonthKey(lessonGrade.lesson.date)
      if (!month) continue

      const items = groupedByMonth.get(month) ?? []
      items.push(lessonGrade)
      groupedByMonth.set(month, items)
    }

    return Array.from(groupedByMonth, ([month, items]) => ({ month, items })).sort(
      (a, b) => a.month.localeCompare(b.month),
    )
  }, [lessonGrades])

  const monthlySummaries = useMemo(
    () => mapMonthlyReportSummariesByMonth(lessonGradeMonthlies),
    [lessonGradeMonthlies],
  )

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
    if (selectedMonth === 'all') return dataSource
    return dataSource.filter((monthGroup) => monthGroup.month === selectedMonth)
  }, [dataSource, selectedMonth])

  if (!dataSource.length) {
    return (
      <div css={styles.emptyReport} role="status">
        표시할 월별 성적 데이터가 없습니다.
      </div>
    )
  }

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
                  <div css={styles.monthEyebrow}>월간 레포트</div>
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
                <MonthlySummary
                  score={monthlySummaries.get(monthGroup.month)}
                />
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
  const defaultLabels = lesson.lecture.defaultGradeForm?.labels ?? []
  const examLabels = lesson.lecture.examGradeForm?.labels ?? []
  const attendanceStatus =
    defaultGrade?.attendanceStatus ?? examGrade?.attendanceStatus
  const lessonHeadingId = `monthly-lesson-${lesson.id}`

  const assignmentRows = defaultGrade
    ? buildMonthlyReportGradeRows({
        labels: defaultLabels,
        data: defaultGrade.data,
        types: ['과제성적'],
      })
    : []
  const testRows = defaultGrade
    ? buildMonthlyReportGradeRows({
        labels: defaultLabels,
        data: defaultGrade.data,
        types: ['테스트'],
      })
    : []
  const examRows = examGrade
    ? buildMonthlyReportGradeRows({
        labels: examLabels,
        data: examGrade.data,
        onlyWithData: true,
      })
    : []
  const progressRows = defaultGrade
    ? buildMonthlyReportGradeRows({
        labels: defaultLabels,
        data: defaultGrade.data,
        types: ['진도'],
      })
    : []

  return (
    <article aria-labelledby={lessonHeadingId} css={styles.lessonCard}>
      <Lecture
        defaultGrade={!!defaultGrade}
        examGrade={!!examGrade}
        headingId={lessonHeadingId}
        lesson={lesson}
      />

      <div css={styles.reportFields}>
        <ReportField title="출석">
          <ReportText
            value={formatMonthlyReportAttendanceStatus(attendanceStatus)}
          />
        </ReportField>
        <ReportField title="과제 성적">
          <GradeRows rows={assignmentRows} />
        </ReportField>
        <ReportField title="테스트 / 모의고사">
          <GradeRows rows={testRows} />
          {!!examGrade && (
            <div css={testRows.length ? styles.examRows : undefined}>
              <div css={styles.examTitle}>지윤T 모의고사</div>
              <GradeRows rows={examRows} />
            </div>
          )}
        </ReportField>
        <ReportField title="진도">
          <GradeRows rows={progressRows} />
        </ReportField>
        <ReportField title="코멘트">
          <GradeComments defaultGrade={defaultGrade} examGrade={examGrade} />
        </ReportField>
      </div>
    </article>
  )
}

function Lecture({
  defaultGrade,
  examGrade,
  headingId,
  lesson,
}: {
  defaultGrade: boolean
  examGrade: boolean
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
      <div css={styles.gradeBadges}>
        {defaultGrade && <span css={styles.dailyBadge}>데일리</span>}
        {examGrade && <span css={styles.examBadge}>모의고사</span>}
      </div>
    </header>
  )
}

function ReportField({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <section css={styles.reportField}>
      <h4 css={styles.reportFieldTitle}>{title}</h4>
      <div css={styles.reportFieldContent}>{children}</div>
    </section>
  )
}

function GradeRows({ rows }: { rows: MonthlyReportGradeRow[] }) {
  if (!rows.length) return <ReportText value="" />

  return (
    <div css={styles.gradeRows}>
      {rows.map((row) => (
        <div key={row.id} css={styles.gradeRow}>
          {row.label !== '-' && (
            <span css={styles.gradeLabel}>{row.label}:</span>
          )}
          {row.value && <span css={styles.gradeValue}>{row.value}</span>}
        </div>
      ))}
    </div>
  )
}

function ReportText({ value }: { value?: string | null }) {
  return <div css={value ? styles.reportText : styles.emptyText}>{value || '-'}</div>
}

function GradeComments({
  defaultGrade,
  examGrade,
}: {
  defaultGrade?: GradeMonthlyTab_LessonGradeFragment
  examGrade?: GradeMonthlyTab_LessonGradeFragment
}) {
  const comments = getMonthlyReportComments(
    defaultGrade?.comment,
    examGrade?.comment,
  )

  if (!comments.length) return <ReportText value="" />
  if (comments.length === 1) return <ReportText value={comments[0]} />

  return (
    <div css={styles.comments}>
      {comments.map((comment) => (
        <div key={comment}>{comment}</div>
      ))}
    </div>
  )
}

function MonthlySummary({ score }: { score?: MonthlySummaryScore }) {
  const fields = [
    ['출석 총평', score?.attendance],
    ['과제 총평', score?.assignment],
    ['테스트 총평', score?.test],
    ['진도 총평', score?.progress],
    ['전체 코멘트', score?.comment],
  ] as const

  return (
    <section aria-label="월 전체 총평" css={styles.summaryCard}>
      <div css={styles.summaryHeader}>
        <h3>월 전체 총평</h3>
        <span>학원 작성</span>
      </div>
      <div css={styles.summaryFields}>
        {fields.map(([label, value]) => (
          <div key={label} css={styles.summaryField}>
            <h4>{label}</h4>
            <p>{value || '-'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const styles = {
  wrapper: css`
    padding-top: 2px;
  `,
  emptyReport: css`
    display: flex;
    min-height: 128px;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border-radius: 16px;
    color: ${COLORS.FONT['30']};
    background: #fff;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
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
  `,
  monthTitle: css`
    margin: 0;
    color: ${COLORS.FONT['90']};
    font-size: 22px;
    font-weight: 800;
    line-height: 30px;
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
  gradeBadges: css`
    display: flex;
    gap: 6px;
    margin-top: 9px;
  `,
  dailyBadge: css`
    padding: 3px 7px;
    border-radius: 6px;
    color: ${COLORS.FONT['70']};
    background: ${COLORS.BG['03']};
    font-size: 10px;
    font-weight: 700;
  `,
  examBadge: css`
    padding: 3px 7px;
    border-radius: 6px;
    color: ${COLORS.POINT.TERTIARY};
    background: ${COLORS.BG['01']};
    font-size: 10px;
    font-weight: 700;
  `,
  reportFields: css`
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  `,
  reportField: css`
    display: grid;
    grid-template-columns: 104px minmax(0, 1fr);
    border-top: 1px solid ${COLORS.BG['03']};
  `,
  reportFieldTitle: css`
    margin: 0;
    padding: 13px 10px;
    color: ${COLORS.FONT['80']};
    background: ${COLORS.BG.BACKGROUND_TEXT};
    font-size: 12px;
    font-weight: 800;
    line-height: 19px;
  `,
  reportFieldContent: css`
    min-width: 0;
    padding: 12px;
    border-left: 1px solid ${COLORS.BG['03']};
  `,
  gradeRows: css`
    display: flex;
    flex-direction: column;
    gap: 7px;
  `,
  gradeRow: css`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 3px 10px;
    color: ${COLORS.FONT['80']};
    font-size: 12px;
    line-height: 19px;
  `,
  gradeLabel: css`
    min-width: 0;
    font-weight: 700;
    overflow-wrap: anywhere;
  `,
  gradeValue: css`
    color: ${COLORS.POINT.TERTIARY};
    font-weight: 800;
    overflow-wrap: anywhere;
  `,
  examRows: css`
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid ${COLORS.BG['03']};
  `,
  examTitle: css`
    margin-bottom: 6px;
    color: ${COLORS.POINT.TERTIARY};
    font-size: 11px;
    font-weight: 800;
  `,
  reportText: css`
    color: ${COLORS.FONT['80']};
    font-size: 12px;
    font-weight: 600;
    line-height: 19px;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  `,
  emptyText: css`
    color: ${COLORS.FONT['30']};
    font-size: 12px;
    line-height: 19px;
  `,
  comments: css`
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: ${COLORS.FONT['80']};
    font-size: 12px;
    line-height: 19px;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  `,
  summaryCard: css`
    overflow: hidden;
    border: 1px solid #cfdcf3;
    border-radius: 18px;
    background: #f7faff;
  `,
  summaryHeader: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 13px 14px;
    border-bottom: 1px solid #dce6f7;

    h3 {
      margin: 0;
      color: ${COLORS.FONT['90']};
      font-size: 14px;
      font-weight: 800;
    }

    span {
      color: ${COLORS.POINT.TERTIARY};
      font-size: 10px;
      font-weight: 700;
    }
  `,
  summaryFields: css`
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  `,
  summaryField: css`
    display: grid;
    grid-template-columns: 104px minmax(0, 1fr);
    border-top: 1px solid #e3ebf8;

    &:first-of-type {
      border-top: 0;
    }

    h4 {
      margin: 0;
      padding: 12px 10px;
      color: ${COLORS.FONT['80']};
      background: #eef4ff;
      font-size: 12px;
      font-weight: 800;
      line-height: 19px;
    }

    p {
      margin: 0;
      padding: 12px;
      border-left: 1px solid #e3ebf8;
      color: ${COLORS.FONT['80']};
      font-size: 12px;
      line-height: 19px;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
  `,
}
