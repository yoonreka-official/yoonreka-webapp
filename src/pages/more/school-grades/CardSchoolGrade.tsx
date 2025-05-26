import ButtonSecondary from '~/components/buttons/ButtonSecondary.tsx'
import CardCollapse from '~/components/cards/CardCollapse.tsx'
import Flex from '~/components/display/Flex.tsx'
import Caption from '~/components/typography/Caption.tsx'
import { COLORS } from '~/configs/theme.ts'
import { EmptyData, gradeStyles } from '~/pages/grades/CardDailyGrade.tsx'
import { SchoolGradeType } from '~/types/school-grades.type.ts'

import type { SchoolGrade } from '~/types/school-grades.type.ts'

interface Props {
  schoolGrade: SchoolGrade
  onUpdate?: (grade: SchoolGrade) => void
}

const getTestName = (type: SchoolGradeType) => {
  switch (type) {
    case SchoolGradeType.MOCK:
      return '모의고사'
    case SchoolGradeType.FINAL:
      return '기말고사'
    case SchoolGradeType.MIDTERM:
      return '중간고사'
    default:
      return ''
  }
}

function CardSchoolGrade({ schoolGrade, onUpdate }: Props) {
  const type = getTestName(schoolGrade.type)

  return (
    <CardCollapse
      title={[
        schoolGrade.school.name,
        `${schoolGrade.grade}학년`,
        `${schoolGrade.term}학기`,
        type,
      ].join(' ')}
    >
      <Flex direction="column" gap={4}>
        <GradeRow label="종류" value={type} />
        <GradeRow label="등급" value={`${schoolGrade.level}등급`} />
        <GradeRow label="점수" value={`${schoolGrade.score}점`} />
        <GradeRow label="백분위" value={`${schoolGrade.percentage}%`} />
        <GradeRow
          label="석차"
          value={`${schoolGrade.rank}/${schoolGrade.totalCount}`}
        />
        <GradeRow
          label="성적표 이미지"
          value={schoolGrade.attachment?.filename}
        />
      </Flex>

      <ButtonSecondary
        style={{ marginTop: 24 }}
        block
        onClick={() => onUpdate?.(schoolGrade)}
      >
        수정하기
      </ButtonSecondary>
    </CardCollapse>
  )
}

function GradeRow({ label, value }: { label: string; value?: string }) {
  return (
    <Flex gap={6} items="stretch">
      <div css={gradeStyles.labelBox}>
        <Caption color={COLORS.FONT['40']} size={12} weight="medium">
          {label}
        </Caption>
      </div>

      <div css={gradeStyles.divider} />

      <Flex css={gradeStyles.scoreBox}>
        <Caption color={COLORS.FONT['80']} size={12} weight="semibold">
          {value || <EmptyData />}
        </Caption>
      </Flex>
    </Flex>
  )
}

export default CardSchoolGrade
