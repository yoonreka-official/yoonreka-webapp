import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildGradeStatistics,
  buildMonthlyGradeSections,
  buildMonthlyReportGradeRows,
  formatGradeValue,
  formatLessonTime,
  formatMonthlyReportAttendanceStatus,
  formatMonthlyReportGradeValue,
  getMonthlyReportComments,
  getMonthlyReportMonthKey,
  getCumulativeLabels,
  getInitialCumulativeLabel,
  getMonthlyGradeDisplayValue,
  hasGradeValue,
  hasMonthlyGradeData,
  mapMonthlyReportSummariesByMonth,
  mergeLessonGradesByLesson,
} from './grades.util.ts'

import type {
  LectureGradeFormLabel,
  LectureGradeLesson,
} from '../types/grades.type.ts'

const selectedLabel: LectureGradeFormLabel = {
  id: 'test-label',
  type: '테스트',
  value: '단어',
}

function makeLesson(index: number, value?: number): LectureGradeLesson {
  return {
    attachment: null,
    date: `2026-01-${String(index + 1).padStart(2, '0')}`,
    myExamLessonGrade: null,
    myLessonGrade:
      value === undefined
        ? null
        : {
            attendanceStatus: 'PRESENT',
            comment: '',
            createdAt: 0,
            data: [
              {
                id: selectedLabel.id,
                label: selectedLabel.value,
                maxValue: '100',
                type: selectedLabel.type,
                value: value as unknown as string,
                value2: null,
              },
            ],
            gradeType: 'DEFAULT',
            retest: 'NONE',
            supplementary: 'NONE',
            updatedAt: 0,
          },
    topGrades: [{ labelId: selectedLabel.id, value: 100 }],
    topThirtyPercentGrades: [{ labelId: selectedLabel.id, value: 80 }],
  } as LectureGradeLesson
}

test('0을 비어 있는 점수로 취급하지 않는다', () => {
  assert.equal(hasGradeValue(0), true)
  assert.equal(hasGradeValue('0'), true)
  assert.equal(hasGradeValue(''), false)
  assert.equal(hasGradeValue('   '), false)
  assert.equal(hasGradeValue(null), false)
  assert.equal(formatGradeValue({ value: 0, maxValue: 100 }), '0/100')

  const statistics = buildGradeStatistics([makeLesson(0, 0)], selectedLabel)
  assert.equal(statistics.length, 1)
  assert.equal(statistics[0].score, 0)
})

test('월별 성적은 상세 설명과 점수를 분리하고 0점을 유지한다', () => {
  assert.equal(hasMonthlyGradeData({ value: 0, maxValue: 100 }), true)
  assert.equal(hasMonthlyGradeData({ value: null, value2: '' }), false)
  assert.deepEqual(
    getMonthlyGradeDisplayValue({
      value: 0,
      value2: '1~20번',
      maxValue: 100,
    }),
    { detail: '1~20번', score: '0 / 100' },
  )
  assert.deepEqual(getMonthlyGradeDisplayValue({ value: '교재 3강' }), {
    detail: '교재 3강',
    score: '',
  })
  assert.deepEqual(
    getMonthlyGradeDisplayValue({
      value: '매우 긴 정성 평가 결과',
      maxValue: 100,
    }),
    { detail: '매우 긴 정성 평가 결과 / 100', score: '' },
  )
  assert.equal(formatLessonTime('02:02', ''), '02:02')
  assert.equal(formatLessonTime('', '03:30'), '03:30')
  assert.equal(formatLessonTime('02:02', '03:30'), '02:02–03:30')
})

test('EXAM 누적 라벨은 현재 및 기존 저장 형식을 모두 인식한다', () => {
  const labels: LectureGradeFormLabel[] = [
    { id: 'new', type: '시험', value: '자동채점 시험' },
    { id: 'legacy', type: '과제성적', value: '기존 모의고사' },
    { id: 'exam:42', type: '기타', value: '접두사 시험' },
    { id: 'default', type: '테스트', value: '데일리 테스트' },
  ]

  assert.deepEqual(
    getCumulativeLabels(labels, 'EXAM').map((label) => label.id),
    ['new', 'legacy', 'exam:42'],
  )
  assert.deepEqual(
    getCumulativeLabels(labels, 'DEFAULT').map((label) => label.id),
    ['default'],
  )
})

test('누적 통계는 결측 회차를 제외한 최신 16회만 날짜순으로 반환한다', () => {
  const lessons = Array.from({ length: 20 }, (_, index) =>
    makeLesson(index, index >= 9 && index <= 11 ? undefined : index),
  ).reverse()

  const statistics = buildGradeStatistics(lessons, selectedLabel)

  assert.equal(statistics.length, 16)
  assert.equal(statistics[0].date, '2026-01-02')
  assert.equal(statistics.at(-1)?.date, '2026-01-20')
  assert.equal(
    statistics.some((item) => item.date === '2026-01-10'),
    false,
  )
})

test('첫 누적 라벨이 결시여도 실제 점수가 있는 라벨을 기본 선택한다', () => {
  const emptyLabel = {
    id: 'empty-label',
    type: '테스트',
    value: '결시 시험',
  }

  assert.equal(
    getInitialCumulativeLabel([emptyLabel, selectedLabel], [makeLesson(0, 85)])
      ?.id,
    selectedLabel.id,
  )
})

test('월별 DEFAULT와 EXAM은 수업 하나로 합치고 각 양식 데이터를 유지한다', () => {
  const lesson = { id: 'lesson-1', date: '2026-01-01' }
  const merged = mergeLessonGradesByLesson([
    { id: 'default', gradeType: 'DEFAULT', lesson, updatedAt: 200 },
    { id: 'exam', gradeType: 'EXAM', lesson, updatedAt: 100 },
    { id: 'old-default', gradeType: 'DEFAULT', lesson, updatedAt: 100 },
    {
      id: 'next-default',
      gradeType: 'DEFAULT',
      lesson: { id: 'lesson-2', date: '2026-02-01' },
      updatedAt: 100,
    },
  ])

  assert.equal(merged.length, 2)
  assert.equal(merged[0].grades.DEFAULT.id, 'default')
  assert.equal(merged[0].grades.EXAM.id, 'exam')

  const sections = buildMonthlyGradeSections([
    {
      gradeType: 'DEFAULT',
      labels: [{ id: 'daily', type: '테스트', value: '단어' }],
      data: [
        {
          id: 'daily',
          type: '테스트',
          label: '단어',
          value: 0,
          maxValue: 100,
        },
      ],
      onlyWithData: true,
    },
    {
      gradeType: 'EXAM',
      labels: [
        { id: 'exam:1', type: '현재 시험', value: '현재 시험명' },
        { id: 'exam:2', type: '시험', value: '2회 모의고사' },
      ],
      data: [
        {
          id: 'exam:1',
          type: '시험',
          label: '1회 모의고사',
          value: 93,
          maxValue: 100,
        },
        {
          id: 'exam:2',
          type: '시험',
          label: '2회 모의고사',
          value: null,
          maxValue: 100,
        },
        {
          id: 'legacy-orphan',
          type: '과제성적',
          label: '기존 시험',
          value: 80,
          maxValue: 100,
        },
      ],
      onlyWithData: true,
    },
  ])

  assert.deepEqual(
    sections.map((section) => [
      section.type,
      section.rows.map((row) => row.key),
    ]),
    [
      ['테스트', ['DEFAULT:daily']],
      ['시험', ['EXAM:exam:1']],
      ['과제성적', ['EXAM:legacy-orphan']],
    ],
  )
  assert.equal(sections[1].rows[0].label.value, '1회 모의고사')
  assert.equal(formatGradeValue(sections[0].rows[0].data), '0/100')
})

test('월간 레포트 정렬은 날짜, 시작 시간, 수업 ID 순서를 사용한다', () => {
  const merged = mergeLessonGradesByLesson([
    {
      id: 'later',
      gradeType: 'DEFAULT',
      lesson: { id: '3', date: '2026-01-01', startTime: '18:00' },
      updatedAt: 1,
    },
    {
      id: 'same-time-later-id',
      gradeType: 'DEFAULT',
      lesson: { id: '2', date: '2026-01-01', startTime: '15:00' },
      updatedAt: 1,
    },
    {
      id: 'same-time-earlier-id',
      gradeType: 'DEFAULT',
      lesson: { id: '1', date: '2026-01-01', startTime: '15:00' },
      updatedAt: 1,
    },
  ])

  assert.deepEqual(
    merged.map((item) => item.grades.DEFAULT.id),
    ['same-time-earlier-id', 'same-time-later-id', 'later'],
  )
})

test('월간 레포트 성적은 관리자와 같은 라벨, 고아 데이터, 값 형식을 사용한다', () => {
  const rows = buildMonthlyReportGradeRows({
    labels: [
      { id: 'assignment', type: '과제성적', value: '과제' },
      { id: 'test', type: '테스트', value: '단어' },
      { id: 'empty-test', type: '테스트', value: '문법' },
    ],
    data: [
      {
        id: 'test',
        type: '테스트',
        label: '단어',
        value: 0,
        value2: '1~20번',
        maxValue: 100,
      },
      {
        id: 'legacy',
        type: '테스트',
        label: '기존 시험',
        value: 80,
        maxValue: 100,
      },
    ],
    types: ['테스트'],
  })

  assert.deepEqual(rows, [
    { id: 'test', label: '단어', value: '1~20번 0/100' },
    { id: 'empty-test', label: '문법', value: '' },
    { id: 'legacy', label: '기존 시험', value: '80/100' },
  ])
  assert.equal(formatMonthlyReportGradeValue({ value: '', maxValue: 100 }), '')
  assert.equal(formatMonthlyReportGradeValue({ value2: 0, value: '' }), '0')
})

test('월간 레포트 출석, 코멘트, 월 총평은 관리자 표시 규칙을 따른다', () => {
  assert.equal(formatMonthlyReportAttendanceStatus('PRESENT'), '출석')
  assert.equal(formatMonthlyReportAttendanceStatus('EARLY_LEAVE'), '조퇴')
  assert.equal(formatMonthlyReportAttendanceStatus(null), '')

  assert.deepEqual(getMonthlyReportComments(' 데일리 의견 ', ' 모의 의견 '), [
    '데일리: 데일리 의견',
    '모의고사: 모의 의견',
  ])
  assert.deepEqual(getMonthlyReportComments(null, ' 모의 의견 '), [
    '모의고사: 모의 의견',
  ])
  assert.deepEqual(getMonthlyReportComments(' 데일리 의견 ', null), [
    '데일리 의견',
  ])

  assert.equal(getMonthlyReportMonthKey('2026-07-13'), '2026-07')
  assert.equal(getMonthlyReportMonthKey('2026-13-01'), null)
  const summaries = mapMonthlyReportSummariesByMonth([
    { month: '2026-07-01', score: { comment: '7월 총평' } },
  ])
  assert.deepEqual(summaries.get('2026-07'), { comment: '7월 총평' })
})
