import { useEffect } from 'react';

import useLoading from '~/hooks/useLoading.ts';
import useQuestions from '~/hooks/useQuestions.ts';
import Container from '~/layouts/Container.tsx';
import ScreenBase from '~/layouts/ScreenBase.tsx';
import QuestionFilter from '~/pages/questions/QuestionFilter.tsx';
import QuestionHeader from '~/pages/questions/QuestionHeader.tsx';
import QuestionList from '~/pages/questions/QuestionList.tsx';

function QuestionsPage() {
  const { fetchData } = useQuestions();

  const { toggleLoading } = useLoading();

  useEffect(() => {
    (async () => {
      toggleLoading(true);
      await fetchData();
      toggleLoading(false);
    })();
  }, []);

  return (
    <ScreenBase header={<QuestionHeader />}>
      <Container>
        <QuestionFilter />
        <QuestionList />
      </Container>
    </ScreenBase>
  );
}

export default QuestionsPage;
