import { css } from '@emotion/react';
import { Tabs } from 'antd';
import { useState } from 'react';

import IconSetting24 from '~/assets/svg/icon_setting_24.svg?react';
import Headline from '~/components/typography/Headline.tsx';
import { COLORS } from '~/configs/theme.ts';

export type MoreTabKey = 'invoice' | 'school';

const MORE_TABS: Array<{ key: MoreTabKey; label: string }> = [
  { key: 'invoice', label: '회비' },
  { key: 'school', label: '학교 성적' },
];

interface Props {
  value?: MoreTabKey;
  onChange?: (value: MoreTabKey) => void;
}

function MoreHeader({ value, onChange }: Props) {
  const [_open, setOpen] = useState<boolean>(false);

  return (
    <header css={styles.header}>
      <div css={styles.titleBox}>
        <Headline>더보기</Headline>

        <button onClick={() => setOpen(true)}>
          <IconSetting24 height={24} width={24} />
        </button>
      </div>

      <Tabs
        activeKey={value}
        css={styles.tabs}
        indicator={{ align: 'center', size: 168 }}
        items={MORE_TABS}
        onChange={activeKey => {
          onChange?.(activeKey as MoreTabKey);
        }}
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
    display: flex;
    justify-content: space-between;
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

          & + .ant-tabs-tab {
            margin: 0;
          }
        }
      }
    }
  `,
};

export default MoreHeader;
