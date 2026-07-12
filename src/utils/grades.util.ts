import calculator from './calculator.util.ts'

import type {
  LectureGradeFormLabel,
  LectureGradeLesson,
  LectureGradeStatistics,
} from '~/types/grades.type.ts'

export const EXAM_LABEL_PREFIX = 'exam:'

const DEFAULT_TEST_LABEL_TYPE = '테스트'
const EXAM_TEST_LABEL_TYPES = new Set(['시험', '과제성적'])

export function hasGradeValue(value: unknown): boolean {
  return value !== null && value !== undefined && value !== ''
}

export function getCumulativeLabels(
  labels: LectureGradeFormLabel[],
  gradeType: string,
): LectureGradeFormLabel[] {
  if (gradeType === 'DEFAULT') {
    return labels.filter((label) => label.type === DEFAULT_TEST_LABEL_TYPE)
  }

  return labels.filter(
    (label) =>
      label.id.startsWith(EXAM_LABEL_PREFIX) ||
      EXAM_TEST_LABEL_TYPES.has(label.type),
  )
}

export function buildGradeStatistics(
  lessons: LectureGradeLesson[],
  selectedLabel: LectureGradeFormLabel,
): LectureGradeStatistics[] {
  const scoredStatistics = lessons
    .flatMap((lesson) => {
      const gradeData = lesson.myLessonGrade?.data?.find(
        (item) => item.id === selectedLabel.id,
      )

      if (
        !gradeData ||
        !hasGradeValue(gradeData.value) ||
        !hasGradeValue(gradeData.maxValue)
      ) {
        return []
      }

      const top30Data = lesson.topThirtyPercentGrades.find(
        (item) => item.labelId === selectedLabel.id,
      )
      const highestData = lesson.topGrades.find(
        (item) => item.labelId === selectedLabel.id,
      )

      return [
        {
          id: selectedLabel.id,
          date: lesson.date,
          comment: lesson.myLessonGrade?.comment,
          type: selectedLabel.type,
          label: selectedLabel.value,
          value: gradeData.value ?? null,
          value2: gradeData.value2 ?? null,
          maxValue: gradeData.maxValue ?? null,
          score: calculator.rates(gradeData.value, gradeData.maxValue),
          top30: calculator.rates(top30Data?.value, gradeData.maxValue),
          highest: calculator.rates(highestData?.value, gradeData.maxValue),
        },
      ]
    })
    .sort((a, b) => a.date.localeCompare(b.date))

  const chartLength = scoredStatistics.length > 8 ? 16 : 8
  return scoredStatistics.slice(-chartLength)
}

export function getInitialCumulativeLabel(
  labels: LectureGradeFormLabel[],
  lessons: LectureGradeLesson[],
): LectureGradeFormLabel | undefined {
  return (
    labels.find((label) => buildGradeStatistics(lessons, label).length > 0) ??
    labels[0]
  )
}

interface LessonLike {
  date: string
  id: string
}

interface LessonGradeLike<TLesson extends LessonLike> {
  gradeType: string
  lesson?: TLesson | null
  updatedAt: number
}

export interface MergedLessonGrade<
  TLesson extends LessonLike,
  TGrade extends LessonGradeLike<TLesson>,
> {
  grades: Record<string, TGrade>
  lesson: TLesson
}

export function mergeLessonGradesByLesson<
  TLesson extends LessonLike,
  TGrade extends LessonGradeLike<TLesson>,
>(lessonGrades: TGrade[]): Array<MergedLessonGrade<TLesson, TGrade>> {
  const merged = new Map<string, MergedLessonGrade<TLesson, TGrade>>()

  lessonGrades.forEach((lessonGrade) => {
    const { lesson } = lessonGrade
    if (!lesson) return

    const item = merged.get(lesson.id) ?? { lesson, grades: {} }
    const currentGrade = item.grades[lessonGrade.gradeType]
    if (!currentGrade || lessonGrade.updatedAt >= currentGrade.updatedAt) {
      item.grades[lessonGrade.gradeType] = lessonGrade
    }
    merged.set(lesson.id, item)
  })

  return [...merged.values()].sort((a, b) =>
    a.lesson.date.localeCompare(b.lesson.date),
  )
}

interface MonthlyGradeLabelLike {
  id: string
  type: string
  value: string
}

interface MonthlyGradeDataLike {
  id: string
  label: string
  maxValue?: unknown
  type: string
  value?: unknown
  value2?: unknown
}

export interface MonthlyGradeSource {
  data?: MonthlyGradeDataLike[] | null
  gradeType: string
  labels: MonthlyGradeLabelLike[]
  onlyWithData?: boolean
}

export interface MonthlyGradeRow {
  data?: MonthlyGradeDataLike
  key: string
  label: MonthlyGradeLabelLike
}

export interface MonthlyGradeSection {
  rows: MonthlyGradeRow[]
  type: string
}

interface FormattableGradeData {
  maxValue?: unknown
  value?: unknown
  value2?: unknown
}

export function buildMonthlyGradeSections(
  sources: MonthlyGradeSource[],
): MonthlyGradeSection[] {
  const sections = new Map<string, MonthlyGradeSection>()

  sources.forEach(({ data = [], gradeType, labels, onlyWithData = false }) => {
    const gradeData = data ?? []
    const dataById = new Map(gradeData.map((item) => [item.id, item]))
    const labelsById = new Map(labels.map((label) => [label.id, label]))

    const visibleLabels = [
      ...labels.filter((label) => !onlyWithData || dataById.has(label.id)),
      ...gradeData
        .filter((item) => !labelsById.has(item.id))
        .map((item) => ({ id: item.id, type: item.type, value: item.label })),
    ]

    visibleLabels.forEach((label) => {
      const section = sections.get(label.type) ?? {
        type: label.type,
        rows: [],
      }
      section.rows.push({
        key: `${gradeType}:${label.id}`,
        label,
        data: dataById.get(label.id),
      })
      sections.set(label.type, section)
    })
  })

  return [...sections.values()]
}

export function formatGradeValue(data?: FormattableGradeData): string {
  if (!data || (!hasGradeValue(data.value) && !hasGradeValue(data.value2))) {
    return ''
  }

  const value2 = hasGradeValue(data.value2) ? `${data.value2} ` : ''
  const value = hasGradeValue(data.value) ? `${data.value}` : ''
  const maxValue = hasGradeValue(data.maxValue) ? `/${data.maxValue}` : ''

  return `${value2}${value}${maxValue}`.trim()
}
