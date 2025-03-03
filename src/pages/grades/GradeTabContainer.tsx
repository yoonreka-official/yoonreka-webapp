import useGrades from '~/hooks/useGrades.ts';
import GradeDailyTab from '~/pages/grades/GradeDailyTab.tsx';
import GradeTotalTab from '~/pages/grades/GradeTotalTab.tsx';

function GradeTabContainer() {
  const {
    state: { activeTab },
  } = useGrades();

  return activeTab === 'daily' ? <GradeDailyTab /> : <GradeTotalTab />;
}

export default GradeTabContainer;
