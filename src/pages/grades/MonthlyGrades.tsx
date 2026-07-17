/* eslint-disable camelcase */
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

import type { ReactNode } from 'react'

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

type MonthlySummaryScore = GradeMonthlyTab_LessonGradeMonthlyFragment['score']

type MonthlyLessonReport = {
  assignmentRows: MonthlyReportGradeRow[]
  attendance: string
  comments: string[]
  examRows: MonthlyReportGradeRow[]
  lessonGrade: MergedMonthlyGrade
  progressRows: MonthlyReportGradeRow[]
  testRows: MonthlyReportGradeRow[]
}

const MONTHLY_AREAS = [
  {
    code: 'ATTEND',
    key: 'attendance',
    label: '출결',
    summaryKey: 'attendance',
  },
  {
    code: 'ASSIGN',
    key: 'assignment',
    label: '과제',
    summaryKey: 'assignment',
  },
  {
    code: 'TEST',
    key: 'test',
    label: '테스트',
    summaryKey: 'test',
  },
  {
    code: 'PROGRESS',
    key: 'progress',
    label: '진도',
    summaryKey: 'progress',
  },
] as const

type MonthlyAreaKey = (typeof MONTHLY_AREAS)[number]['key']
type MonthlyRecordCounts = Record<MonthlyAreaKey, number>

const REPORT_COLORS = {
  accent: '#7B5715',
  border: '#DCE2EB',
  ink: '#223A5F',
  muted: '#596579',
  surface: '#F8FAFD',
} as const

export interface MonthlyGradesProps {
  lessonGradeMonthlies: GradeMonthlyTab_LessonGradeMonthlyFragment[]
  lessonGrades: GradeMonthlyTab_LessonGradeFragment[]
  studentName?: string
}

export function MonthlyGrades({
  lessonGradeMonthlies,
  lessonGrades,
  studentName,
}: MonthlyGradesProps) {
  const dataSource = useMemo<MonthlyGroupedData[]>(() => {
    const groupedByMonth = mergeLessonGradesByLesson<
      GradeMonthlyTab_LessonFragment,
      GradeMonthlyTab_LessonGradeFragment
    >(lessonGrades).reduce<Map<string, MergedMonthlyGrade[]>>(
      (groups, lessonGrade) => {
        const month = getMonthlyReportMonthKey(lessonGrade.lesson.date)
        if (!month) return groups

        groups.set(month, [...(groups.get(month) ?? []), lessonGrade])
        return groups
      },
      new Map(),
    )

    return Array.from(groupedByMonth, ([month, items]) => ({
      month,
      items,
    })).sort((a, b) => b.month.localeCompare(a.month))
  }, [lessonGrades])

  const [selectedMonth, setSelectedMonth] = useState<string | 'all'>(
    dataSource[0]?.month ?? 'all',
  )

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
      setSelectedMonth(dataSource[0]?.month ?? 'all')
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
        <span css={styles.filterLabel}>리포트 월</span>
        <Select
          value={selectedMonth}
          placeholder="월을 선택해주세요"
          ariaLabel="리포트 월"
          css={styles.monthSelect}
          options={monthOptions}
          onChange={(value) => setSelectedMonth(value || 'all')}
        />
      </div>

      <div css={styles.monthList}>
        {filteredDataSource.map((monthGroup) => {
          const sourceIndex = dataSource.findIndex(
            (source) => source.month === monthGroup.month,
          )

          return (
            <MonthlyReportCard
              key={monthGroup.month}
              monthGroup={monthGroup}
              previousGroup={
                sourceIndex >= 0 ? dataSource[sourceIndex + 1] : undefined
              }
              score={monthlySummaries.get(monthGroup.month)}
              studentName={studentName}
            />
          )
        })}
      </div>
    </div>
  )
}

function MonthlyReportCard({
  monthGroup,
  previousGroup,
  score,
  studentName,
}: {
  monthGroup: MonthlyGroupedData
  previousGroup?: MonthlyGroupedData
  score?: MonthlySummaryScore
  studentName?: string
}) {
  const headingId = `monthly-grade-${monthGroup.month}`
  const monthLabel = dayjs(`${monthGroup.month}-01`).format('YYYY년 M월')
  const reports = monthGroup.items.map(buildMonthlyLessonReport)
  const metrics = getMonthlyRecordCounts(reports)
  const previousReports = previousGroup?.items.map(buildMonthlyLessonReport)
  const previousMetrics = previousReports
    ? getMonthlyRecordCounts(previousReports)
    : undefined
  const lectureSummary = getLectureSummary(reports)

  return (
    <section aria-labelledby={headingId} css={styles.reportCard}>
      <header css={styles.reportHero}>
        <div css={styles.brandRow}>
          <span>YOONREKA ENGLISH</span>
          <span>MONTHLY REPORT</span>
        </div>

        <div css={styles.accentLine} />

        <div css={styles.reportHeading}>
          <div>
            <div css={styles.reportEyebrow}>학생 성장 리포트</div>
            <h2 id={headingId} css={styles.monthTitle}>
              {monthLabel}
            </h2>
          </div>

          <span css={styles.lessonCount}>
            성적 회차 {monthGroup.items.length}회
          </span>
        </div>

        <div css={styles.studentCard}>
          <strong>
            {studentName?.trim()
              ? `${studentName.trim()} 학생`
              : '월간 학습 기록'}
          </strong>
          <span>{lectureSummary}</span>
        </div>
      </header>

      <div css={styles.reportBody}>
        <MetricSummary
          headingId={`${headingId}-summary`}
          metrics={metrics}
          previousMetrics={previousMetrics}
        />

        {previousGroup && previousMetrics && (
          <MonthlyRecordComparison
            currentMetrics={metrics}
            currentMonth={monthGroup.month}
            previousMetrics={previousMetrics}
            previousMonth={previousGroup.month}
          />
        )}

        <MonthlyFeedback
          headingId={`${headingId}-feedback`}
          metrics={metrics}
          score={score}
        />

        {!!score?.comment?.trim() && (
          <section css={styles.teacherComment}>
            <div css={styles.teacherCommentLabel}>선생님 코멘트</div>
            <p>{score.comment.trim()}</p>
          </section>
        )}

        <section aria-labelledby={`${headingId}-lessons`}>
          <div css={styles.sectionHeading}>
            <div>
              <div css={styles.sectionEyebrow}>LESSON DETAILS</div>
              <h3 id={`${headingId}-lessons`}>회차별 자세히 보기</h3>
            </div>
            <span>눌러서 펼치기</span>
          </div>

          <div css={styles.lessonList}>
            {reports.map((report) => (
              <MonthlyLessonGrade
                key={report.lessonGrade.lesson.id}
                report={report}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

function MetricSummary({
  headingId,
  metrics,
  previousMetrics,
}: {
  headingId: string
  metrics: MonthlyRecordCounts
  previousMetrics?: MonthlyRecordCounts
}) {
  return (
    <section aria-labelledby={headingId}>
      <div css={styles.sectionHeading}>
        <div>
          <div css={styles.sectionEyebrow}>MONTHLY SNAPSHOT</div>
          <h3 id={headingId}>이번 달 입력 기록</h3>
        </div>
      </div>

      <p css={styles.recordNotice}>
        출결 상태와 성적표에 저장된 항목 수이며, 성취도 점수가 아닙니다.
      </p>

      <div css={styles.metricGrid}>
        {MONTHLY_AREAS.map((area) => {
          const value = metrics[area.key]
          const previousValue = previousMetrics?.[area.key]

          return (
            <div key={area.key} css={styles.metricCard}>
              <span css={styles.metricCode}>{area.code}</span>
              <span css={styles.metricLabel}>{area.label}</span>
              <strong>{formatMetricCount(value)}</strong>
              <span css={styles.metricDelta}>
                {formatMetricDelta(value, previousValue)}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function MonthlyRecordComparison({
  currentMetrics,
  currentMonth,
  previousMetrics,
  previousMonth,
}: {
  currentMetrics: MonthlyRecordCounts
  currentMonth: string
  previousMetrics: MonthlyRecordCounts
  previousMonth: string
}) {
  const currentLabel = dayjs(`${currentMonth}-01`).format('M월')
  const previousLabel = dayjs(`${previousMonth}-01`).format('M월')
  const maxValue = Math.max(
    1,
    ...MONTHLY_AREAS.flatMap((area) => [
      currentMetrics[area.key],
      previousMetrics[area.key],
    ]),
  )
  const description = MONTHLY_AREAS.map(
    (area) =>
      `${area.label} ${previousLabel} ${formatMetricCount(
        previousMetrics[area.key],
      )}, ${currentLabel} ${formatMetricCount(currentMetrics[area.key])}`,
  ).join(', ')

  return (
    <section css={styles.comparisonCard}>
      <div css={styles.comparisonHeader}>
        <div>
          <div css={styles.sectionEyebrow}>MONTHLY CHANGE</div>
          <h3>이전 월 입력 건수 비교</h3>
        </div>

        <div css={styles.chartLegend}>
          <span css={styles.previousLegend}>{previousLabel}</span>
          <span css={styles.currentLegend}>{currentLabel}</span>
        </div>
      </div>

      <p css={styles.comparisonNotice}>
        영역별 저장 기록 수를 비교하며, 학업 성취도의 증감을 뜻하지 않습니다.
      </p>

      <div
        aria-label={`${previousLabel}과 ${currentLabel}의 저장 기록 건수 비교. 성취도 점수가 아님. ${description}`}
        css={styles.chartPlot}
        role="img"
      >
        {MONTHLY_AREAS.map((area) => {
          const previousValue = previousMetrics[area.key]
          const currentValue = currentMetrics[area.key]

          return (
            <div key={area.key} css={styles.chartGroup}>
              <div css={styles.barPair}>
                <div
                  css={[styles.chartBar, styles.previousBar]}
                  style={{ height: getBarHeight(previousValue, maxValue) }}
                >
                  <span>{previousValue}</span>
                </div>
                <div
                  css={[styles.chartBar, styles.currentBar]}
                  style={{ height: getBarHeight(currentValue, maxValue) }}
                >
                  <span>{currentValue}</span>
                </div>
              </div>
              <span css={styles.chartLabel}>{area.label}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function MonthlyFeedback({
  headingId,
  metrics,
  score,
}: {
  headingId: string
  metrics: MonthlyRecordCounts
  score?: MonthlySummaryScore
}) {
  return (
    <section aria-labelledby={headingId}>
      <div css={styles.sectionHeading}>
        <div>
          <div css={styles.sectionEyebrow}>AREA FEEDBACK</div>
          <h3 id={headingId}>영역별 자세히 보기</h3>
        </div>
      </div>

      <div css={styles.feedbackList}>
        {MONTHLY_AREAS.map((area) => {
          const summary = score?.[area.summaryKey]?.trim()

          return (
            <article key={area.key} css={styles.feedbackCard}>
              <header css={styles.feedbackHeader}>
                <strong>{area.code}</strong>
                <span>{area.label}</span>
              </header>

              <div css={styles.feedbackRows}>
                <div css={styles.feedbackRow}>
                  <span css={styles.recordLabel}>입력 기록 수</span>
                  <p>{formatMetricCount(metrics[area.key])}</p>
                </div>

                <div css={styles.feedbackRow}>
                  <span css={summary ? styles.summaryLabel : styles.emptyLabel}>
                    학원 총평
                  </span>
                  <p css={!summary && styles.emptyFeedback}>
                    {summary || '아직 작성된 총평이 없습니다.'}
                  </p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function MonthlyLessonGrade({ report }: { report: MonthlyLessonReport }) {
  const { lessonGrade } = report
  const { grades, lesson } = lessonGrade
  const defaultGrade = grades[GradeType.Default]
  const examGrade = grades[GradeType.Exam]
  const lessonHeadingId = `monthly-lesson-${lesson.id}`
  const lessonTime = formatLessonTime(lesson.startTime, lesson.endTime)

  return (
    <details css={styles.lessonCard}>
      <summary css={styles.lessonSummary}>
        <div css={styles.lessonSummaryContent}>
          <h3 id={lessonHeadingId}>{lesson.lecture.title}</h3>
          <div css={styles.lessonMeta}>
            <time dateTime={lesson.date}>
              {dayjs(lesson.date).format('YYYY.MM.DD (ddd)')}
            </time>
            {lessonTime && <span>{lessonTime}</span>}
          </div>
          <div css={styles.gradeBadges}>
            {!!defaultGrade && <span css={styles.dailyBadge}>데일리</span>}
            {!!examGrade && <span css={styles.examBadge}>모의고사</span>}
          </div>
        </div>

        <span css={styles.detailAction} aria-hidden>
          상세 보기
        </span>
      </summary>

      <div css={styles.reportFields}>
        <ReportField title="출석">
          <ReportText value={report.attendance} />
        </ReportField>
        <ReportField title="과제 성적">
          <GradeRows rows={report.assignmentRows} />
        </ReportField>
        <ReportField title="테스트 / 모의고사">
          <GradeRows rows={report.testRows} />
          {hasRecordedRows(report.examRows) && (
            <div
              css={
                hasRecordedRows(report.testRows) ? styles.examRows : undefined
              }
            >
              <div css={styles.examTitle}>모의고사 / 자동채점</div>
              <GradeRows rows={report.examRows} />
            </div>
          )}
        </ReportField>
        <ReportField title="진도">
          <GradeRows rows={report.progressRows} />
        </ReportField>
        <ReportField title="코멘트">
          <GradeComments comments={report.comments} />
        </ReportField>
      </div>
    </details>
  )
}

function ReportField({
  children,
  title,
}: {
  children: ReactNode
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
  const visibleRows = rows.filter((row) => row.value.trim())
  if (!visibleRows.length) return <ReportText value="" />

  return (
    <div css={styles.gradeRows}>
      {visibleRows.map((row) => (
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
  return (
    <div css={value ? styles.reportText : styles.emptyText}>{value || '-'}</div>
  )
}

function GradeComments({ comments }: { comments: string[] }) {
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

function buildMonthlyLessonReport(
  lessonGrade: MergedMonthlyGrade,
): MonthlyLessonReport {
  const { grades, lesson } = lessonGrade
  const defaultGrade = grades[GradeType.Default]
  const examGrade = grades[GradeType.Exam]
  const defaultLabels = lesson.lecture.defaultGradeForm?.labels ?? []
  const examLabels = lesson.lecture.examGradeForm?.labels ?? []
  const attendanceStatus =
    defaultGrade?.attendanceStatus ?? examGrade?.attendanceStatus

  return {
    assignmentRows: defaultGrade
      ? buildMonthlyReportGradeRows({
          labels: defaultLabels,
          data: defaultGrade.data,
          types: ['과제성적'],
        })
      : [],
    attendance: formatMonthlyReportAttendanceStatus(attendanceStatus),
    comments: getMonthlyReportComments(
      defaultGrade?.comment,
      examGrade?.comment,
    ),
    examRows: examGrade
      ? buildMonthlyReportGradeRows({
          labels: examLabels,
          data: examGrade.data,
          onlyWithData: true,
        })
      : [],
    lessonGrade,
    progressRows: defaultGrade
      ? buildMonthlyReportGradeRows({
          labels: defaultLabels,
          data: defaultGrade.data,
          types: ['진도'],
        })
      : [],
    testRows: defaultGrade
      ? buildMonthlyReportGradeRows({
          labels: defaultLabels,
          data: defaultGrade.data,
          types: ['테스트'],
        })
      : [],
  }
}

function getMonthlyRecordCounts(
  reports: MonthlyLessonReport[],
): MonthlyRecordCounts {
  const countRows = (rows: MonthlyReportGradeRow[]) =>
    rows.filter((row) => row.value.trim()).length

  return reports.reduce<MonthlyRecordCounts>(
    (counts, report) => ({
      assignment: counts.assignment + countRows(report.assignmentRows),
      attendance: counts.attendance + (report.attendance ? 1 : 0),
      progress: counts.progress + countRows(report.progressRows),
      test:
        counts.test + countRows(report.testRows) + countRows(report.examRows),
    }),
    {
      assignment: 0,
      attendance: 0,
      progress: 0,
      test: 0,
    },
  )
}

function hasRecordedRows(rows: MonthlyReportGradeRow[]): boolean {
  return rows.some((row) => row.value.trim())
}

function getLectureSummary(reports: MonthlyLessonReport[]): string {
  const titles = Array.from(
    new Set(reports.map((report) => report.lessonGrade.lesson.lecture.title)),
  )

  if (!titles.length) return '등록된 강의가 없습니다.'
  if (titles.length === 1) return titles[0]
  return `${titles[0]} 외 ${titles.length - 1}개 강의`
}

function formatMetricCount(value: number): string {
  return `${value}건`
}

function formatMetricDelta(value: number, previousValue?: number): string {
  if (previousValue == null) return '이번 달 입력 기록'

  const delta = value - previousValue
  if (delta === 0) return '이전 월과 입력 수 동일'

  return `이전 월 대비 ${delta > 0 ? '+' : '-'}${Math.abs(delta)}건`
}

function getBarHeight(value: number, maxValue: number): string {
  if (value === 0) return '2px'
  return `${Math.max((value / maxValue) * 100, 8)}%`
}

const styles = {
  wrapper: css`
    padding-top: 4px;
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
    min-height: 48px;
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
    gap: 22px;
  `,
  reportCard: css`
    overflow: hidden;
    border: 1px solid ${REPORT_COLORS.border};
    border-radius: 22px;
    background: #fff;
    box-shadow: 0 8px 24px rgba(52, 76, 111, 0.08);
  `,
  reportHero: css`
    padding: 20px 16px 18px;
    border-bottom: 1px solid ${REPORT_COLORS.border};
    background: linear-gradient(180deg, #fff 0%, #f8fbff 100%);
  `,
  brandRow: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: ${REPORT_COLORS.ink};
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 1.3px;
    line-height: 14px;
  `,
  accentLine: css`
    height: 2px;
    margin: 12px 0 17px;
    background: ${REPORT_COLORS.accent};
  `,
  reportHeading: css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
  `,
  reportEyebrow: css`
    margin-bottom: 2px;
    color: ${REPORT_COLORS.muted};
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
  `,
  monthTitle: css`
    margin: 0;
    color: ${REPORT_COLORS.ink};
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.4px;
    line-height: 32px;
  `,
  lessonCount: css`
    flex-shrink: 0;
    padding: 5px 9px;
    border: 1px solid #d8e3f2;
    border-radius: 999px;
    color: ${COLORS.POINT.TERTIARY};
    background: #f4f8fe;
    font-size: 10px;
    font-weight: 700;
    line-height: 16px;
  `,
  studentCard: css`
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-top: 15px;
    padding: 13px 14px;
    border: 1px solid ${REPORT_COLORS.border};
    border-radius: 14px;
    background: #fff;

    strong {
      color: ${COLORS.FONT['90']};
      font-size: 16px;
      font-weight: 800;
      line-height: 22px;
    }

    span {
      color: ${COLORS.FONT['60']};
      font-size: 11px;
      font-weight: 600;
      line-height: 17px;
      overflow-wrap: anywhere;
    }
  `,
  reportBody: css`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 18px 14px 20px;
  `,
  sectionHeading: css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 11px;

    h3 {
      margin: 0;
      color: ${REPORT_COLORS.ink};
      font-size: 16px;
      font-weight: 800;
      line-height: 23px;
    }

    > span {
      color: ${COLORS.FONT['30']};
      font-size: 10px;
      font-weight: 600;
      line-height: 15px;
    }
  `,
  sectionEyebrow: css`
    margin-bottom: 1px;
    color: ${REPORT_COLORS.accent};
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.8px;
    line-height: 14px;
  `,
  recordNotice: css`
    margin: -4px 0 11px;
    color: ${REPORT_COLORS.muted};
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
  `,
  metricGrid: css`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  `,
  metricCard: css`
    display: flex;
    min-width: 0;
    min-height: 112px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 8px;
    border: 1px solid ${REPORT_COLORS.border};
    border-radius: 15px;
    background: #fff;
    text-align: center;

    strong {
      margin-top: 4px;
      color: ${REPORT_COLORS.ink};
      font-size: 23px;
      font-weight: 800;
      line-height: 30px;
    }
  `,
  metricCode: css`
    color: ${COLORS.POINT.TERTIARY};
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.7px;
    line-height: 14px;
  `,
  metricLabel: css`
    color: ${COLORS.FONT['60']};
    font-size: 11px;
    font-weight: 700;
    line-height: 16px;
  `,
  metricDelta: css`
    min-height: 15px;
    margin-top: 3px;
    color: ${REPORT_COLORS.muted};
    font-size: 9px;
    font-weight: 600;
    line-height: 14px;
  `,
  comparisonCard: css`
    padding: 15px 13px 13px;
    border: 1px solid ${REPORT_COLORS.border};
    border-radius: 16px;
    background: ${REPORT_COLORS.surface};
  `,
  comparisonHeader: css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px;

    h3 {
      margin: 0;
      color: ${REPORT_COLORS.ink};
      font-size: 15px;
      font-weight: 800;
      line-height: 22px;
    }
  `,
  comparisonNotice: css`
    margin: -3px 0 4px;
    color: ${REPORT_COLORS.muted};
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
  `,
  chartLegend: css`
    display: flex;
    align-items: center;
    gap: 9px;
    color: ${REPORT_COLORS.muted};
    font-size: 9px;
    font-weight: 700;

    span {
      display: inline-flex;
      align-items: center;
      gap: 4px;

      &::before {
        width: 7px;
        height: 7px;
        border-radius: 2px;
        content: '';
      }
    }
  `,
  previousLegend: css`
    &::before {
      background: #c8c5bb;
    }
  `,
  currentLegend: css`
    &::before {
      background: ${COLORS.POINT.TERTIARY};
    }
  `,
  chartPlot: css`
    display: grid;
    height: 160px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
    padding: 16px 4px 0;
    border-bottom: 1px solid #cfd6e2;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 28px,
      rgba(176, 184, 197, 0.24) 29px
    );
  `,
  chartGroup: css`
    display: flex;
    min-width: 0;
    flex-direction: column;
    justify-content: flex-end;
  `,
  barPair: css`
    display: flex;
    min-height: 118px;
    flex: 1;
    align-items: flex-end;
    justify-content: center;
    gap: 5px;
  `,
  chartBar: css`
    position: relative;
    width: 14px;
    min-height: 2px;
    border-radius: 5px 5px 1px 1px;

    span {
      position: absolute;
      top: -16px;
      left: 50%;
      color: ${REPORT_COLORS.muted};
      font-size: 9px;
      font-weight: 700;
      line-height: 13px;
      transform: translateX(-50%);
    }
  `,
  previousBar: css`
    background: #c8c5bb;
  `,
  currentBar: css`
    background: ${COLORS.POINT.TERTIARY};
  `,
  chartLabel: css`
    padding: 7px 1px 8px;
    color: ${REPORT_COLORS.muted};
    font-size: 9px;
    font-weight: 700;
    line-height: 13px;
    text-align: center;
  `,
  feedbackList: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  feedbackCard: css`
    overflow: hidden;
    border: 1px solid ${REPORT_COLORS.border};
    border-radius: 16px;
    background: #fff;
  `,
  feedbackHeader: css`
    display: flex;
    align-items: baseline;
    gap: 6px;
    padding: 12px 13px 10px;
    border-bottom: 1px solid #e7ebf1;

    strong {
      color: ${REPORT_COLORS.ink};
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.2px;
      line-height: 20px;
    }

    span {
      color: ${COLORS.FONT['60']};
      font-size: 11px;
      font-weight: 600;
      line-height: 16px;
    }
  `,
  feedbackRows: css`
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding: 11px 13px 13px;
  `,
  feedbackRow: css`
    display: grid;
    grid-template-columns: 82px minmax(0, 1fr);
    gap: 10px;
    align-items: start;

    > span {
      padding-top: 1px;
      font-size: 10px;
      font-weight: 800;
      line-height: 17px;
    }

    p {
      min-width: 0;
      margin: 0;
      color: ${COLORS.FONT['80']};
      font-size: 12px;
      font-weight: 600;
      line-height: 18px;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
  `,
  recordLabel: css`
    color: #207a3b;
  `,
  summaryLabel: css`
    color: ${REPORT_COLORS.accent};
  `,
  emptyLabel: css`
    color: ${REPORT_COLORS.muted};
  `,
  emptyFeedback: css`
    color: ${REPORT_COLORS.muted} !important;
    font-weight: 500 !important;
  `,
  teacherComment: css`
    padding: 14px;
    border: 1px solid #e5d2a8;
    border-radius: 16px;
    background: #fffcf4;

    p {
      margin: 5px 0 0;
      color: ${COLORS.FONT['80']};
      font-size: 12px;
      font-weight: 600;
      line-height: 19px;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
  `,
  teacherCommentLabel: css`
    color: ${REPORT_COLORS.accent};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
  `,
  lessonList: css`
    display: flex;
    flex-direction: column;
    gap: 9px;
  `,
  lessonCard: css`
    overflow: hidden;
    border: 1px solid ${REPORT_COLORS.border};
    border-radius: 15px;
    background: #fff;
  `,
  lessonSummary: css`
    display: flex;
    min-height: 68px;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 13px;
    cursor: pointer;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }

    &:focus-visible {
      outline: 2px solid ${COLORS.POINT.PRIMARY};
      outline-offset: -2px;
    }
  `,
  lessonSummaryContent: css`
    min-width: 0;

    h3 {
      margin: 0;
      color: ${COLORS.FONT['90']};
      font-size: 14px;
      font-weight: 800;
      line-height: 20px;
      overflow-wrap: anywhere;
    }
  `,
  lessonMeta: css`
    display: flex;
    flex-wrap: wrap;
    gap: 2px 7px;
    margin-top: 3px;
    color: ${COLORS.FONT['60']};
    font-size: 10px;
    font-weight: 600;
    line-height: 15px;

    span::before {
      margin-right: 7px;
      color: ${COLORS.BG['04']};
      content: '·';
    }
  `,
  gradeBadges: css`
    display: flex;
    gap: 5px;
    margin-top: 6px;
  `,
  dailyBadge: css`
    padding: 2px 6px;
    border-radius: 5px;
    color: ${COLORS.FONT['70']};
    background: ${COLORS.BG['03']};
    font-size: 9px;
    font-weight: 700;
    line-height: 14px;
  `,
  examBadge: css`
    padding: 2px 6px;
    border-radius: 5px;
    color: ${COLORS.POINT.TERTIARY};
    background: ${COLORS.BG['01']};
    font-size: 9px;
    font-weight: 700;
    line-height: 14px;
  `,
  detailAction: css`
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    gap: 5px;
    color: ${COLORS.POINT.TERTIARY};
    font-size: 9px;
    font-weight: 700;
    line-height: 14px;

    &::after {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: ${COLORS.BG['01']};
      content: '+';
      font-size: 14px;
      line-height: 17px;
      text-align: center;
    }

    details[open] &::after {
      content: '−';
    }
  `,
  reportFields: css`
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    border-top: 1px solid ${REPORT_COLORS.border};
  `,
  reportField: css`
    display: grid;
    grid-template-columns: 92px minmax(0, 1fr);
    border-top: 1px solid #e7ebf1;

    &:first-of-type {
      border-top: 0;
    }

    @media (max-width: 360px) {
      grid-template-columns: minmax(0, 1fr);
    }
  `,
  reportFieldTitle: css`
    margin: 0;
    padding: 12px 9px;
    color: ${REPORT_COLORS.ink};
    background: ${REPORT_COLORS.surface};
    font-size: 11px;
    font-weight: 800;
    line-height: 18px;

    @media (max-width: 360px) {
      padding: 10px 11px 8px;
      border-bottom: 1px solid #e7ebf1;
    }
  `,
  reportFieldContent: css`
    min-width: 0;
    padding: 11px;
    border-left: 1px solid #e7ebf1;

    @media (max-width: 360px) {
      border-left: 0;
    }
  `,
  gradeRows: css`
    display: flex;
    flex-direction: column;
    gap: 7px;
  `,
  gradeRow: css`
    display: grid;
    min-width: 0;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 4px 9px;
    align-items: baseline;
    color: ${COLORS.FONT['80']};
    font-size: 11px;
    line-height: 17px;

    @media (max-width: 360px) {
      grid-template-columns: minmax(0, 1fr);
    }
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
    border-top: 1px solid #e7ebf1;
  `,
  examTitle: css`
    margin-bottom: 6px;
    color: ${COLORS.POINT.TERTIARY};
    font-size: 10px;
    font-weight: 800;
    line-height: 15px;
  `,
  reportText: css`
    color: ${COLORS.FONT['80']};
    font-size: 11px;
    font-weight: 600;
    line-height: 18px;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  `,
  emptyText: css`
    color: ${COLORS.FONT['30']};
    font-size: 11px;
    line-height: 18px;
  `,
  comments: css`
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: ${COLORS.FONT['80']};
    font-size: 11px;
    line-height: 18px;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  `,
}
