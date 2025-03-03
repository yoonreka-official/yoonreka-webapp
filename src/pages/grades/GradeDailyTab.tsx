import Flex from '~/components/display/Flex.tsx';
import useGrades from '~/hooks/useGrades.ts';
import CardDailyGrade from '~/pages/grades/CardDailyGrade.tsx';

function GradeDailyTab() {
  const {
    state: { lecture },
  } = useGrades();

  return (
    <Flex direction="column">
      {lecture?.lessons.map((lesson, index) => (
        <CardDailyGrade key={index} lesson={lesson} />
      ))}
    </Flex>
  );
}

export default GradeDailyTab;
