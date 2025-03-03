import { css } from '@emotion/react';
import { Select } from 'antd';

import { COLORS } from '~/configs/theme.ts';

import type { SelectProps } from 'antd';

export interface AutoCompleteProps extends SelectProps {
  id?: string;
}

function AutoComplete({ ...props }: AutoCompleteProps) {
  return <Select css={styles.autoComplete} suffixIcon={null} {...props} />;
}

const styles = {
  autoComplete: css`
    &.ant-select-outlined {
      height: 52px;

      .ant-select-selector {
        padding: 16px;
        border-radius: 12px;
        height: 52px;

        background: ${COLORS.BG.BACKGROUND} !important;
        border: 1px solid ${COLORS.BG.BACKGROUND} !important;
        outline: none !important;
        box-shadow: none !important;

        &:hover {
          border: 1px solid ${COLORS.BG.BACKGROUND};
        }
      }

      &.ant-select-focused {
        .ant-select-selector {
          background: #fff !important;
          border: 1px solid ${COLORS.POINT.PRIMARY} !important;
        }

        &.ant-select-status-error {
          .ant-select-selector {
            background: #fff !important;
            border: 1px solid ${COLORS.STATUS['01']} !important;
          }
        }
      }
    }
  `,
};

export default AutoComplete;
