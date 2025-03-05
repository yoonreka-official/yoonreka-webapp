import { css } from '@emotion/react';

import { COLORS, LAYOUT } from '~/configs/theme.ts';

import type { ReactNode } from 'react';

interface Props {
  header: ReactNode;
  children: ReactNode;
}

function ScreenBase({ children, header }: Props) {
  return (
    <div css={styles.screen}>
      <section css={styles.header}>{header}</section>
      <section css={styles.body}>
        {children}
        <div css={styles.bottomMargin} />
      </section>
    </div>
  );
}

const styles = {
  screen: css`
    position: relative;
    background: ${COLORS.BG.BACKGROUND};
    padding-bottom: ${LAYOUT.NAV_BAR_HEIGHT};
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
  `,

  header: css`
    flex-shrink: 0;
  `,

  body: css`
    height: 100%;
    overflow-y: auto;
    padding-bottom: 20px;
  `,

  bottomMargin: css`
    width: 100%;
    height: 20px;
  `,
};

export default ScreenBase;
