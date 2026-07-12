import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import Flex from '~/components/display/Flex'
import Select from '~/components/inputs/Select.tsx'
import Body from '~/components/typography/Body'
import Caption from '~/components/typography/Caption'
import { COLORS } from '~/configs/theme'
import { GradeType } from '~/types/api'
import {
  buildMonthlyGradeSections,
  formatGradeValue,
  mergeLessonGradesByLesson,
} from '~/utils/grades.util.ts'
import { EmptyData, gradeStyles } from './CardDailyGrade'

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

  const monthOptions = useMemo(() => {
    return [
      { value: 'all', label: '전체' },
      ...dataSource.map((monthGroup) => ({
        value: monthGroup.month,
        label: dayjs(`${monthGroup.month}-01`).format('YYYY년 MM월'),
      })),
    ]
  }, [dataSource])

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
    <div className="space-y-4">
      <Flex
        direction="column"
        gap={8}
        style={{ marginTop: 2, marginBottom: 10 }}
      >
        <Select
          css={[styles.borderPrimary]}
          value={selectedMonth}
          onChange={(value) => {
            setSelectedMonth(value || 'all')
          }}
          options={monthOptions}
          placeholder="월 선택"
        />
      </Flex>

      <div className="flex flex-col space-y-6">
        {filteredDataSource.map((monthGroup) => (
          <div key={monthGroup.month} className="rounded-2xl bg-white">
            <header className="px-4 py-4">
              <Body size={14} weight="bold">
                {dayjs(`${monthGroup.month}-01`).format('YYYY년 MM월')}
              </Body>
            </header>

            <div className="mx-4 space-y-2">
              {monthGroup.items.map((lessonGrade) => (
                <MonthlyLessonGrade
                  key={lessonGrade.lesson.id}
                  lessonGrade={lessonGrade}
                />
              ))}
            </div>
          </div>
        ))}
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
    ...new Set([defaultGrade?.comment, examGrade?.comment]),
  ].filter((comment): comment is string => !!comment)

  return (
    <div>
      <Lecture lesson={lesson} />

      <div className="space-y-4 py-4">
        {sections.map((section) => (
          <Grades key={section.type} section={section} />
        ))}

        {!sections.length && (
          <Caption color={COLORS.FONT['30']} size={12}>
            이 회차에 입력된 성적 데이터가 없습니다.
          </Caption>
        )}

        {!!comments.length && (
          <Flex direction="column" gap={4} style={{ marginTop: 16 }}>
            <Body size={14} weight="bold">
              COMMENT
            </Body>

            <div css={gradeStyles.commentBox}>
              {comments.map((comment) => (
                <Caption key={comment} color={COLORS.FONT['80']} size={12}>
                  {comment}
                </Caption>
              ))}
            </div>
          </Flex>
        )}
      </div>
    </div>
  )
}

function Lecture({ lesson }: { lesson: GradeMonthlyTab_LessonFragment }) {
  return (
    <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
      <Body size={14} weight="bold">
        {lesson.lecture.title}
      </Body>
      <div className="text-gray-300">/</div>
      <div className="flex items-center space-x-1">
        <Body size={14} weight="bold">
          {dayjs(lesson.date).format('YYYY.MM.DD (ddd)')}
        </Body>
        <Body size={14} weight="bold">
          {lesson.startTime}~{lesson.endTime}
        </Body>
      </div>
    </div>
  )
}

function Grades({ section }: { section: MonthlyGradeSection }) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-bold">{section.type}</div>

      {section.rows.map((row) => {
        const formattedGrade = formatGradeValue(row.data)

        return (
          <div key={row.key} className="flex items-stretch gap-6">
            <div className="w-24 text-xs font-medium text-gray-400">
              {row.label.value}
            </div>

            <div className="h-2 w-px bg-gray-200" />

            <div className="w-full text-xs font-semibold text-gray-800">
              {formattedGrade || <EmptyData />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const styles = {
  borderPrimary: css`
    border: 1px solid ${COLORS.POINT.PRIMARY};
  `,
}
