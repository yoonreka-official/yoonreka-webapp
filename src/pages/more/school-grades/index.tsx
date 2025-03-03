import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import ButtonPrimary from '~/components/buttons/ButtonPrimary.tsx';
import ButtonSecondary from '~/components/buttons/ButtonSecondary.tsx';
import Flex from '~/components/display/Flex.tsx';
import Body from '~/components/typography/Body.tsx';
import NoData from '~/components/utils/NoData.tsx';
import { COLORS } from '~/configs/theme.ts';
import useLoading from '~/hooks/useLoading.ts';
import useSchoolGrades from '~/hooks/useSchoolGrades.ts';
import CardSchoolGrade from '~/pages/more/school-grades/CardSchoolGrade.tsx';
import DrawerSchoolGrade from '~/pages/more/school-grades/DrawerSchoolGrade.tsx';

function SchoolGrades() {
  const {
    state: { list },
    fetchData,
    handleSelected,
  } = useSchoolGrades();

  const { toggleLoading } = useLoading();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      toggleLoading(true);
      await fetchData();
      toggleLoading(false);
    })();
  }, []);

  return (
    // eslint-disable-next-line
    <>
      {list.map((item, idx) => (
        <CardSchoolGrade
          key={idx}
          schoolGrade={item}
          onUpdate={selected => {
            handleSelected(selected);
            setOpen(true);
          }}
        />
      ))}

      {list.length && (
        <ButtonPrimary
          block={false}
          css={styles.button}
          onClick={() => setOpen(true)}
        >
          등록하기
        </ButtonPrimary>
      )}

      {!list.length && <NoSchoolGrades onButtonClick={() => setOpen(true)} />}

      <DrawerSchoolGrade open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function NoSchoolGrades({ onButtonClick }: { onButtonClick?: () => void }) {
  return (
    <NoData
      description={
        <Flex
          direction="column"
          gap={15}
          items="center"
          style={{ textAlign: 'center' }}
        >
          <Body color={COLORS.FONT['30']} size={14} weight="semibold">
            기록된 학교 성적이 없어요
            <br />
            지금 기록하고 성적 관리를 시작해 보세요 :)
          </Body>

          <ButtonSecondary onClick={onButtonClick}>
            학교 성적 기록하기
          </ButtonSecondary>
        </Flex>
      }
    />
  );
}

const styles = {
  wrapper: css`
    position: relative;
    height: 100%;
  `,

  button: css`
    position: fixed;
    bottom: 76px;
    right: 14px;
    padding: 0 28px;
  `,
};

export default SchoolGrades;
