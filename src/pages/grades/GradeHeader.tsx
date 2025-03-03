import { css } from '@emotion/react';
import { Tabs } from 'antd';

import Headline from '~/components/typography/Headline.tsx';
import { COLORS } from '~/configs/theme.ts';
import useGrades from '~/hooks/useGrades.ts';

import type { GradeTab } from '~/stores/GradeSlice.ts';

const GRADE_TABS: Array<{
  key: GradeTab;
  label: string;
}> = [
  { key: 'daily', label: '데일리 성적' },
  { key: 'total', label: '누적 성적' },
];

function GradeHeader() {
  const {
    state: { activeTab },
    handleChangeTab,
  } = useGrades();

  return (
    <header css={styles.header}>
      <div css={styles.titleBox}>
        <Headline>수업성적</Headline>
      </div>

      <Tabs
        css={styles.tabs}
        defaultActiveKey={activeTab}
        indicator={{ align: 'center', size: 168 }}
        items={GRADE_TABS}
        onChange={activeKey => handleChangeTab(activeKey as GradeTab)}
      />
    </header>
  );
}

const styles = {
  header: css`
    background: #fff;
  `,

  titleBox: css`
    padding: 15px 14px 13px;
  `,

  tabs: css`
    padding: 0 14px;
    background: #fff;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      //border-bottom: 1px solid var(--BG-03, #dae0e9);
      border-bottom: 1px solid ${COLORS.BG['03']};
    }

    .ant-tabs-nav {
      margin: 0;

      &:before {
        border: none;
      }
    }

    .ant-tabs-nav-wrap {
      width: 100%;

      .ant-tabs-nav-list {
        width: 100%;

        .ant-tabs-ink-bar {
          //width: 74px !important;
        }

        .ant-tabs-tab {
          justify-content: center;
          flex: 1;
          //font-size: 18px;
          //padding: 8px 0;

          & .ant-tabs-tab {
            margin: 0;
          }
        }
      }
    }
  `,
};

export default GradeHeader;
