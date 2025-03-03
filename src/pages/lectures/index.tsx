import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import useLectures from '~/hooks/useLectures.ts';
import useLoading from '~/hooks/useLoading.ts';
import Container from '~/layouts/Container.tsx';
import ScreenBase from '~/layouts/ScreenBase.tsx';
import LectureAttachmentViewer from '~/pages/lectures/LectureAttachmentViewer.tsx';
import LectureFilter from '~/pages/lectures/LectureFilter.tsx';
import LectureHeader from '~/pages/lectures/LectureHeader.tsx';

function LecturesPage() {
  const {
    fetchData,
    selectLesson,
    state: { isLoading },
  } = useLectures();

  const [params] = useSearchParams();
  const lectureId = params.get('lectureId');
  const lessonDate = params.get('date');

  useLoading(isLoading);

  useEffect(() => {
    (async () => {
      const lecture = await fetchData(lectureId || undefined);

      const lesson = lessonDate
        ? lecture?.lessons.find(lesson => lesson.date === lessonDate)
        : lecture?.lessons[0];

      selectLesson(lesson);
    })();
  }, []);

  return (
    <ScreenBase header={<LectureHeader />}>
      <Container>
        <LectureFilter />
        <LectureAttachmentViewer />
      </Container>
    </ScreenBase>
  );
}

export default LecturesPage;
