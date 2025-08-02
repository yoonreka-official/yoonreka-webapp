import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useCallback, useMemo, useState } from 'react'
import Flex from '~/components/display/Flex'
import Select from '~/components/inputs/Select.tsx'
import Body from '~/components/typography/Body'
import Caption from '~/components/typography/Caption'
import { COLORS } from '~/configs/theme'
import {
  GradeMonthlyTab_LessonFragment,
  GradeMonthlyTab_LessonGradeFragment,
} from '~/types/api'
import { gradeStyles } from './CardDailyGrade'

type MonthlyGroupedData = {
  month: string // YYYY-MM format
  items: GradeMonthlyTab_LessonGradeFragment[]
}

export interface MonthlyGradesProps {
  lessonGrades: GradeMonthlyTab_LessonGradeFragment[]
}

export function MonthlyGrades({ lessonGrades }: MonthlyGradesProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | 'all'>('all')

  const dataSource = useMemo<MonthlyGroupedData[]>(() => {
    const groupedByMonth = lessonGrades.reduce(
      (acc, lessonGrade) => {
        const lesson = lessonGrade.lesson
        if (!lesson?.date) return acc

        const monthKey = dayjs(lesson.date).format('YYYY-MM')

        if (!acc[monthKey]) {
          acc[monthKey] = []
        }
        acc[monthKey].push(lessonGrade)

        return acc
      },
      {} as Record<string, GradeMonthlyTab_LessonGradeFragment[]>,
    )

    return Object.entries(groupedByMonth)
      .map(([month, items]) => ({
        month,
        items,
      }))
      .sort((a, b) => b.month.localeCompare(a.month))
  }, [lessonGrades])

  const monthOptions = useMemo(() => {
    const options = [{ value: 'all', label: '전체' }]
    dataSource.forEach((monthGroup) => {
      options.push({
        value: monthGroup.month,
        label: dayjs(monthGroup.month + '-01').format('YYYY년 MM월'),
      })
    })
    return options
  }, [dataSource])

  const filteredDataSource = useMemo(() => {
    if (selectedMonth === 'all') {
      return dataSource
    }
    return dataSource.filter((monthGroup) => monthGroup.month === selectedMonth)
  }, [dataSource, selectedMonth])

  return (
    <div className="space-y-4">
      <div>
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
      </div>

      <div className="flex flex-col space-y-6">
        {filteredDataSource.map((monthGroup) => (
          <div key={monthGroup.month} className="bg-white rounded-2xl">
            <header className="px-4 py-4">
              <Body size={14} weight="bold">
                {dayjs(monthGroup.month + '-01').format('YYYY년 MM월')}
              </Body>
            </header>

            <div className="mx-4 space-y-2">
              {monthGroup.items.map((lessonGrade) => {
                const lesson = lessonGrade.lesson

                if (!lesson) {
                  return null
                }

                return (
                  <div key={lessonGrade.id}>
                    <Lecture lesson={lesson} />
                    <div className="space-y-4 py-4">
                      {['과제성적', '테스트', '진도'].map((type) => (
                        <div key={type}>
                          <Grades
                            lessonGrade={lessonGrade}
                            type={type as '과제성적' | '테스트' | '진도'}
                          />
                        </div>
                      ))}

                      {lessonGrade.comment && (
                        <Flex
                          direction="column"
                          gap={4}
                          style={{ marginTop: 16 }}
                        >
                          <Body size={14} weight="bold">
                            {`COMMENT`}
                          </Body>

                          <div css={gradeStyles.commentBox}>
                            <Caption
                              color={
                                lessonGrade.comment
                                  ? COLORS.FONT['80']
                                  : COLORS.BG['04']
                              }
                              size={12}
                            >
                              {lessonGrade.comment || '개별 코멘트가 없습니다.'}
                            </Caption>
                          </div>
                        </Flex>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
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
        <div className="flex items-center space-x-1">
          <Body size={14} weight="bold">
            {dayjs(lesson.date).format('YYYY.MM.DD (ddd)')}
          </Body>
          <Body size={14} weight="bold">
            {lesson.startTime}~{lesson.endTime}
          </Body>
        </div>
      </div>
    </div>
  )
}

function Grades({
  lessonGrade,
  type,
}: {
  lessonGrade: GradeMonthlyTab_LessonGradeFragment
  type: '과제성적' | '테스트' | '진도'
}) {
  const gradeForm = lessonGrade.lesson?.lecture?.gradeForm
  const gradeData = useMemo(() => lessonGrade.data ?? [], [lessonGrade])

  const labels = useMemo(() => {
    return (gradeForm?.labels ?? []).filter((label) => label.type === type)
  }, [gradeForm?.labels, type])

  const valueComponent = useCallback(
    (labelId: string) => {
      const data = gradeData.find((data) => data.id === labelId)
      if (data?.value || data?.value2) {
        return (
          <div>
            {data.value2 ? data.value2 : ''} {data.value}{' '}
            {data.maxValue ? `/${data.maxValue}` : ''}
          </div>
        )
      }
      return <div />
    },
    [gradeData],
  )

  return (
    <div className="space-y-1">
      <div className="text-sm font-bold">{type}</div>

      {labels.map((label) => (
        <div key={label.id} className="flex items-stretch gap-6">
          <div className="w-24 text-xs font-medium text-gray-400">
            {label.value}
          </div>

          <div className="h-2 w-px bg-gray-200" />

          <div className="w-full">
            <div className="text-xs font-semibold text-gray-800">
              {valueComponent(label.id)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const styles = {
  borderPrimary: css`
    border: 1px solid ${COLORS.POINT.PRIMARY};
  `,
}
