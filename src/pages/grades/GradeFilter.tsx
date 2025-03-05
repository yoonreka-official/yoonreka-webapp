import { css } from '@emotion/react';
import dayjs from 'dayjs';

import Flex from '~/components/display/Flex.tsx';
import Select from '~/components/inputs/Select.tsx';
import { COLORS } from '~/configs/theme.ts';

import 'dayjs/locale/ko';

import useAuth from '~/hooks/useAuth.tsx';
import useGrades from '~/hooks/useGrades.ts';

dayjs.locale('ko');

function GradeFilter() {
  const {
    state: { authUser },
  } = useAuth();

  const {
    state: {
      lecture,
      // activeTab,
    },
    fetchData,
  } = useGrades();

  return (
    <Flex direction="column" gap={8} style={{ marginTop: 2, marginBottom: 10 }}>
      <Select
        value={lecture?.id}
        css={[
          styles.borderPrimary,
          // activeTab === 'daily' && styles.borderPrimary,
        ]}
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

const styles = {
  borderPrimary: css`
    border: 1px solid ${COLORS.POINT.PRIMARY};
  `,
};

export default GradeFilter;
