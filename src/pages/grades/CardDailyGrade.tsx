import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useMemo } from 'react'

import CardCollapse from '~/components/cards/CardCollapse.tsx'
import Flex from '~/components/display/Flex.tsx'
import Body from '~/components/typography/Body.tsx'
import Caption from '~/components/typography/Caption.tsx'
import { COLORS } from '~/configs/theme.ts'
import useAuth from '~/hooks/useAuth.tsx'
import useGrades from '~/hooks/useGrades.ts'
import { GetDailyGradeCommentDocument } from '~/types/api'
import { AttendanceStatus } from '~/types/grades.type.ts'

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
    state: { labelGroups },
  } = useGrades()

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
          {getAttendanceText(lesson.myLessonGrade?.attendanceStatus)}
        </Caption>
      </Flex>

      {labelGroups.map((group) => (
        <GradeGroup
          key={`${lesson.date}-${group.type}`}
          group={group}
          lesson={lesson}
        />
      ))}

      <Flex direction="column" gap={4} style={{ marginTop: 16 }}>
        <Body size={14} weight="bold">
          {`지윤T's COMMENT`}
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
  const grade = lesson.myLessonGrade?.data?.find((item) => item.id === label.id)

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
          {grade?.value2 && `${grade?.value2} `}
          {grade?.value || <EmptyData />}
          {grade?.maxValue && `/${grade?.maxValue}`}
        </Caption>
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
  `,

  commentBox: css`
    padding: 12px;
    border-radius: 8px;
    background: ${COLORS.BG['01']};
  `,
}

export default CardDailyGrade
