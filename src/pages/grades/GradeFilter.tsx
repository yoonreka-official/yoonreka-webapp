import dayjs from 'dayjs';

import Flex from '~/components/display/Flex.tsx';
import Select from '~/components/inputs/Select.tsx';
import useAuth from '~/hooks/useAuth.tsx';
import useGrades from '~/hooks/useGrades.ts';

import 'dayjs/locale/ko';

dayjs.locale('ko');

function GradeFilter() {
  const {
    state: { authUser },
  } = useAuth();

  const {
    state: { lecture },
    fetchData,
  } = useGrades();

  return (
    <Flex direction="column" gap={8} style={{ marginTop: 2, marginBottom: 10 }}>
      <Select
        value={lecture?.id}
        options={authUser?.lectures.map(item => ({
          label: item.title,
          value: item.id,
        }))}
        onChange={value => {
          fetchData(value);
        }}
      />
    </Flex>
  );
}

export default GradeFilter;
