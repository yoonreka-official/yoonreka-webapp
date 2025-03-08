import { Link } from 'react-router-dom';

import IconBook16 from '~/assets/svg/icon_book_16.svg?react';
import IconClock16 from '~/assets/svg/icon_clock_16.svg?react';
import IconMarker16 from '~/assets/svg/icon_marker_16.svg?react';
import Flex from '~/components/display/Flex.tsx';
import Body from '~/components/typography/Body.tsx';
import Caption from '~/components/typography/Caption.tsx';
import ScheduleMarker from '~/pages/schedules/ScheduleMarker.tsx';

import type { Lesson } from '~/types/schedules.type.ts';

interface Props {
  index: number;
  lesson: Lesson;
}

function ScheduleCalendar({ index, lesson }: Props) {
  return (
    <Link to={`/grades?lectureId=${lesson.lecture.id}&date=${lesson.date}`}>
      <Flex key={index} direction="column" gap={2}>
        <Flex gap={4} items="center">
          <ScheduleMarker order={index} block />
          <Body color="#313234" size={14} weight="bold">
            {lesson.lecture.title}
          </Body>
        </Flex>

        <Flex gap={4} items="center">
          <IconClock16 />
          <Caption color="#5F5F5F" size={12} weight="medium">
            {lesson.startTime} ~ {lesson.endTime}
          </Caption>
        </Flex>

        <Flex gap={4} items="center">
          <IconMarker16 />
          <Caption color="#5F5F5F" size={12} weight="medium">
            {lesson.lecture.place}
          </Caption>
        </Flex>

        <Flex gap={4} items="center">
          <IconBook16 />
          <Caption color="#5F5F5F" size={12} weight="medium">
            {lesson.lecture.book?.title}
          </Caption>
        </Flex>
      </Flex>
    </Link>
  );
}

export default ScheduleCalendar;
