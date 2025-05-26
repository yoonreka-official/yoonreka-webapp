import { css } from '@emotion/react'
import { Segmented } from 'antd'

import Flex from '~/components/display/Flex.tsx'
import { COLORS } from '~/configs/theme.ts'
import useGrades from '~/hooks/useGrades.ts'
import { GradeType } from '~/types/grades.type.ts'

const TYPES: Array<{ value: GradeType; label: string }> = [
  { value: GradeType.DEFAULT, label: 'Daily / Weekly' },
  { value: GradeType.EXAM, label: '지윤T 모의고사' },
]

function GradeTotalTabFilters() {
  const {
    state: { gradeType },
    handleChangeType,
  } = useGrades()

  return (
    <Flex direction="column" gap={24}>
      <Segmented<GradeType>
        value={gradeType}
        css={styles.segmented}
        options={TYPES}
        block
        onChange={(value) => {
          handleChangeType(value)
        }}
      />

      <TagGroup />
    </Flex>
  )
}

function TagGroup() {
  const {
    state: { lecture, selectedLabel, labelColor, testLabels },
    handleSelectedLabel,
  } = useGrades()

  return (
    lecture && (
      <Flex gap={4} justify="center" wrap="wrap">
        {testLabels.map((label, index) => (
          <button
            key={label.id}
            css={[
              styles.tag,
              selectedLabel?.id === label.id &&
                labelColor &&
                styles.activeTag(labelColor),
            ]}
            onClick={() => {
              handleSelectedLabel(label, index)
            }}
          >
            {label.value}
          </button>
        ))}
      </Flex>
    )
  )
}

const styles = {
  segmented: css`
    background: ${COLORS.BG['03']};
    border-radius: 16px;
    padding: 4px;

    .ant-segmented-group {
      gap: 4px;
    }

    .ant-segmented-thumb,
    .ant-segmented-item {
      border-radius: 12px;
      height: 32px;

      &::after {
        border-radius: 12px;
      }
    }

    .ant-segmented-item-label {
      color: ${COLORS.FONT['80']};
      /* Body/14/B */
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 32px;
      letter-spacing: -0.2px;
      transition: 0.3s all ease;
    }

    .ant-segmented-item-selected .ant-segmented-item-label {
      color: ${COLORS.FONT['90']};
      font-weight: 700;
    }
  `,

  tag: css`
    display: flex;
    padding: 5px 10px;
    justify-content: center;
    align-items: center;
    gap: 141px;

    border-radius: 20px;
    background: ${COLORS.BG.BACKGROUND};
    border: 1.5px solid ${COLORS.BG.BACKGROUND};

    color: ${COLORS.FONT['40']};
    /* Caption/12/M */
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 150% */
    letter-spacing: -0.2px;
  `,

  activeTag: (color: string) => css`
    border: 1.5px solid ${color};
    background: #fff;
    color: ${color};
  `,
}

export default GradeTotalTabFilters
