import { css } from '@emotion/react'
import dayjs from 'dayjs'

import Flex from '~/components/display/Flex.tsx'
import { COLORS } from '~/configs/theme.ts'
import ScheduleMarker from '~/pages/schedules/ScheduleMarker.tsx'

import type { Dayjs } from 'dayjs'

import type { Lesson } from '~/types/schedules.type.ts'

interface Props {
  lessons: Lesson[]
  date: Dayjs
  selected?: Dayjs
}

function ScheduleDateCell({ lessons, date, selected }: Props) {
  const events = lessons.filter((item) => {
    return dayjs(item.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
  })

  const isActive = (date: Dayjs) => {
    return selected?.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
  }

  return (
    <Flex css={[styles.dateBox]} direction="column" gap={6} items="center">
      <span css={[styles.date, isActive(date) && styles.active]}>
        {date.format('D')}
      </span>

      <Flex>
        {events.map((_, i) => (
          <ScheduleMarker key={i} order={i} color={events[i].lecture.color} />
        ))}
      </Flex>
    </Flex>
  )
}

const styles = {
  dateBox: css`
    height: 64px;
  `,

  date: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.2px;
  `,

  active: css`
    background: ${COLORS.POINT.PRIMARY};
    color: #fff;
  `,
}

export default ScheduleDateCell
