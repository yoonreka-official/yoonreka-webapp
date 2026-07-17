import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import CardCollapse from '~/components/cards/CardCollapse.tsx'
import Flex from '~/components/display/Flex.tsx'
import Body from '~/components/typography/Body.tsx'
import Caption from '~/components/typography/Caption.tsx'
import StatusTag from '~/components/utils/StatusTag.tsx'
import { COLORS } from '~/configs/theme.ts'
import useAuth from '~/hooks/useAuth.tsx'
import useGrades from '~/hooks/useGrades.ts'
import {
  GetDailyGradeCommentDocument,
  Retest,
  Supplementary,
} from '~/types/api'
import { AttendanceStatus } from '~/types/grades.type.ts'
import {
  EXAM_LABEL_PREFIX,
  formatGradeValue,
  hasGradeValue,
} from '~/utils/grades.util.ts'

import type {
  GradeFormLabelGroup,
  LectureGradeFormLabel,
  LectureGradeLesson,
} from '~/types/grades.type.ts'

interface CardDailyGradeProps {
  lesson: LectureGradeLesson
  defaultOpen?: boolean
  scrollId?: string
}

function CardDailyGrade({
  lesson,
  defaultOpen,
  scrollId,
}: CardDailyGradeProps) {
  const {
    state: { authUser },
  } = useAuth()

  const {
    state: { labelGroups, lecture },
  } = useGrades()

  // ? 데일리(DEFAULT) 항목 + 이 회차에 점수가 반영된 시험(자동 채점, EXAM) 항목
  const gradeGroups = useMemo<GradeFormLabelGroup[]>(() => {
    const groups = labelGroups
      .map((group) => ({
        ...group,
        children: group.children.filter(
          (label) => !label.id.startsWith(EXAM_LABEL_PREFIX),
        ),
      }))
      .filter((group) => group.children.length > 0)

    const examLabels = (lecture?.examGradeFormLabels ?? []).filter(
      (label) =>
        label.id.startsWith(EXAM_LABEL_PREFIX) &&
        lesson.myExamLessonGrade?.data?.some(
          (item) => item.id === label.id && hasGradeValue(item.value),
        ),
    )

    examLabels.forEach((label) => {
      const group = groups.find((item) => item.type === label.type)
      if (group) {
        group.children.push(label)
      } else {
        groups.push({ type: label.type, children: [label] })
      }
    })

    return groups
  }, [labelGroups, lecture, lesson])

  // ? 데일리(DEFAULT)·시험(EXAM) 성적 중 하나라도 재시험 대상이면 "재시험 대상" 우선 표시
  const retests = [
    lesson.myLessonGrade?.retest,
    lesson.myExamLessonGrade?.retest,
  ]
  const retest = retests.includes(Retest.Need)
    ? Retest.Need
    : retests.includes(Retest.Done)
      ? Retest.Done
      : undefined

  const { data } = useQuery(GetDailyGradeCommentDocument)
  const lessonGradeComment = useMemo(
    () =>
      data?.operation?.message ??
      '궁금하신 점은 언제든지 학원으로 연락주시면 자세하게 안내해드리겠습니다.\n고등관_메가스터디 러셀 중계 : ☎︎ 02-6316-1010\n중등관_윤레카 ENGLISH : 📞 010-6330-0559',
    [data],
  )

  const title = `${dayjs(lesson.date).format('YYYY.MM.DD (ddd)')} 데일리 성적`

  return (
    <CardCollapse id={scrollId} title={title} value={defaultOpen}>
      <header>
        <Caption color={COLORS.FONT['80']} size={12} weight="semibold">
          “{authUser?.name}” 학생의 금일 성적입니다. 😊
        </Caption>
      </header>

      <Flex direction="column" gap={4} style={{ marginTop: 16 }}>
        <Body size={14} weight="bold">
          출석 여부
        </Body>

        <Caption color={COLORS.FONT['80']} size={12} weight="semibold">
          <div className="flex items-center space-x-1">
            {getAttendanceText(lesson.myLessonGrade?.attendanceStatus)}
            {lesson.myLessonGrade?.supplementary === Supplementary.Done && (
              <div>(보강완료)</div>
            )}
          </div>
        </Caption>

        {/* 보강/재시험 상태 뱃지 */}
        {(retest === Retest.Need ||
          retest === Retest.Done ||
          lesson.myLessonGrade?.supplementary === Supplementary.Need) && (
          <Flex gap={4} style={{ marginTop: 2 }} wrap="wrap">
            {retest === Retest.Need && (
              <StatusTag status="danger">재시험 대상</StatusTag>
            )}

            {retest === Retest.Done && (
              <StatusTag status="success">재시험 완료</StatusTag>
            )}

            {lesson.myLessonGrade?.supplementary === Supplementary.Need && (
              <StatusTag status="warning">보강 예정</StatusTag>
            )}
          </Flex>
        )}
      </Flex>

      {gradeGroups.map((group) => (
        <GradeGroup
          key={`${lesson.date}-${group.type}`}
          group={group}
          lesson={lesson}
        />
      ))}

      <Flex direction="column" gap={4} style={{ marginTop: 16 }}>
        <Body size={14} weight="bold">
          COMMENT
        </Body>

        <div css={gradeStyles.commentBox}>
          <Caption
            color={
              lesson.myLessonGrade?.comment
                ? COLORS.FONT['80']
                : COLORS.BG['04']
            }
            size={12}
          >
            {lesson.myLessonGrade?.comment || '개별 코멘트가 없습니다.'}
          </Caption>
        </div>
      </Flex>

      <section style={{ marginTop: 16 }}>
        <Caption color={COLORS.FONT['80']} size={12}>
          {lessonGradeComment}
        </Caption>
      </section>
    </CardCollapse>
  )
}

export function EmptyData() {
  return <Caption color={COLORS.FONT['30']}>-</Caption>
}

const getAttendanceText = (attendance?: AttendanceStatus) => {
  switch (attendance) {
    case AttendanceStatus.PRESENT:
      return '출석'
    case AttendanceStatus.ABSENT:
      return '결석'
    case AttendanceStatus.LATE:
      return '지각'
    case AttendanceStatus.EARLY_LEAVE:
      return '조퇴'
    default:
      return <EmptyData />
  }
}

function GradeGroup({
  group,
  lesson,
}: CardDailyGradeProps & {
  group: GradeFormLabelGroup
}) {
  return (
    <Flex direction="column" gap={4} style={{ marginTop: 16 }}>
      <Body size={14} weight="bold">
        {group.type}
      </Body>

      {group.children.map((label) => (
        <GradeSection
          key={`${lesson.date}-${group.type}-${label.id}`}
          label={label}
          lesson={lesson}
        />
      ))}
    </Flex>
  )
}

function GradeSection({
  lesson,
  label,
}: CardDailyGradeProps & {
  label: LectureGradeFormLabel
}) {
  const navigate = useNavigate()

  const examId = label.id.startsWith(EXAM_LABEL_PREFIX)
    ? label.id.slice(EXAM_LABEL_PREFIX.length)
    : undefined

  // ? 시험(자동 채점) 항목은 EXAM 성적에서, 그 외 항목은 데일리(DEFAULT) 성적에서 조회
  const grade = (
    examId ? lesson.myExamLessonGrade : lesson.myLessonGrade
  )?.data?.find((item) => item.id === label.id)
  const formattedGrade = formatGradeValue(grade)

  // ? 시험(자동 채점) 항목이면서 성적이 반영된 경우 [성적 보기] 버튼 노출
  const showExamResultButton = !!examId && hasGradeValue(grade?.value)

  return (
    <Flex key={label.id} gap={6} items="stretch">
      <div css={gradeStyles.labelBox}>
        <Caption color={COLORS.FONT['40']} size={12} weight="medium">
          {label.value}
        </Caption>
      </div>

      <div css={gradeStyles.divider} />

      <Flex css={gradeStyles.scoreBox}>
        <Caption color={COLORS.FONT['80']} size={12} weight="semibold">
          {formattedGrade || <EmptyData />}
        </Caption>

        {showExamResultButton && (
          <button
            css={gradeStyles.examResultButton}
            type="button"
            onClick={() => navigate(`/grades/exams/${examId}`)}
          >
            성적 보기
          </button>
        )}
      </Flex>
    </Flex>
  )
}

export const gradeStyles = {
  labelBox: css`
    width: 80px;
    flex-shrink: 0;
  `,

  divider: css`
    width: 2px;
    margin: 4px 0;
    background: ${COLORS.BG['01']};
  `,

  scoreBox: css`
    width: 100%;
    min-width: 0;
    align-items: center;
    gap: 8px;
  `,

  commentBox: css`
    padding: 12px;
    border-radius: 8px;
    background: ${COLORS.BG['01']};
  `,

  examResultButton: css`
    flex-shrink: 0;
    margin-left: auto;
    min-width: 104px;
    padding: 9px 14px;
    border: 1px solid ${COLORS.POINT.PRIMARY};
    border-radius: 10px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.2px;
    line-height: 18px;
    color: ${COLORS.POINT.TERTIARY};
    background: #fff;

    &:active {
      background: ${COLORS.BG.BACKGROUND_TEXT};
    }
  `,
}

export default CardDailyGrade
