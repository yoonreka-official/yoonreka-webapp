import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Flex from '~/components/display/Flex.tsx';
import useGrades from '~/hooks/useGrades.ts';
import CardDailyGrade from '~/pages/grades/CardDailyGrade.tsx';

function GradeDailyTab() {
  const {
    state: { lecture },
  } = useGrades();

  const [params] = useSearchParams();
  const lectureId = params.get('lectureId');
  const queryDate = params.get('date');
  const scrollId =
    queryDate && lectureId ? `${lectureId}:${queryDate}` : undefined;

  const setScroll = () => {
    if (!scrollId) return;

    const selectedElement = document.getElementById(scrollId);
    selectedElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      // inline: 'center',
    });
  };

  useEffect(() => {
    if (scrollId) {
      setTimeout(() => {
        setScroll();
      }, 300);
    }
  }, [scrollId]);

  return (
    <Flex id={scrollId} direction="column">
      {lecture?.lessons.map((lesson, index) => (
        <CardDailyGrade
          key={index}
          defaultOpen={queryDate === dayjs(lesson.date).format('YYYY-MM-DD')}
          lesson={lesson}
          scrollId={scrollId}
        />
      ))}
    </Flex>
  );
}

export default GradeDailyTab;
