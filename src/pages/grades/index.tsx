import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import useGrades from '~/hooks/useGrades.ts';
import useLoading from '~/hooks/useLoading.ts';
import Container from '~/layouts/Container.tsx';
import ScreenBase from '~/layouts/ScreenBase.tsx';
import GradeFilter from '~/pages/grades/GradeFilter.tsx';
import GradeHeader from '~/pages/grades/GradeHeader.tsx';
import GradeTabContainer from '~/pages/grades/GradeTabContainer.tsx';
import { GradeType } from '~/types/grades.type.ts';

function GradesPage() {
  const { fetchData, handleChangeTab, handleChangeType } = useGrades();

  const { toggleLoading } = useLoading();

  const [params] = useSearchParams();
  const lectureId = params.get('lectureId');

  useEffect(() => {
    (async () => {
      toggleLoading(true);
      await fetchData(lectureId || undefined);
      toggleLoading(false);
    })();

    return () => {
      handleChangeTab('daily', false);
      handleChangeType(GradeType.DEFAULT, false);
    };
  }, []);

  return (
    <ScreenBase header={<GradeHeader />}>
      <Container>
        <GradeFilter />
        <GradeTabContainer />
      </Container>
    </ScreenBase>
  );
}

export default GradesPage;
