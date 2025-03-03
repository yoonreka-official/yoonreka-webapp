import { css } from '@emotion/react';
import { useState } from 'react';

import ButtonNav from '~/components/buttons/ButtonNav.tsx';
import DrawerNotifications from '~/components/notifications/DrawerNotifications.tsx';
import Headline from '~/components/typography/Headline.tsx';

function LectureHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header css={styles.header}>
        <Headline>공부하기</Headline>

        <ButtonNav onClick={() => setOpen(true)}>학습자료</ButtonNav>
      </header>

      <DrawerNotifications
        defaultActiveKey="education"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

const styles = {
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 14px;
  `,
};

export default LectureHeader;
