import { css } from '@emotion/react';
import { Segmented } from 'antd';

import { COLORS } from '~/configs/theme.ts';

import type { SegmentedProps } from 'antd';

export interface InputSegmentedProps<T> extends SegmentedProps<T> {
  isInput?: boolean;
}

function InputSegmented<T>({ isInput, ...props }: InputSegmentedProps<T>) {
  return (
    <Segmented<T>
      css={[styles.segmented, isInput && styles.inputStyle]}
      block
      {...props}
    />
  );
}

const styles = {
  segmented: css`
    background: ${COLORS.BG['03']};
    border-radius: 16px;
    padding: 4px;

    .ant-segmented-group {
      gap: 4px;
    }

    .ant-segmented-thumb,
    .ant-segmented-item {
      border-radius: 12px;
      height: 32px;

      &::after {
        border-radius: 12px;
      }
    }

    .ant-segmented-item-label {
      color: ${COLORS.FONT['80']};
      /* Body/14/B */
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 32px;
      letter-spacing: -0.2px;
      transition: 0.3s all ease;
    }

    .ant-segmented-item-selected .ant-segmented-item-label {
      color: ${COLORS.FONT['90']};
      font-weight: 700;
    }
  `,

  inputStyle: css`
    background: ${COLORS.BG.BACKGROUND};
    border-radius: 10px;

    .ant-segmented-thumb,
    .ant-segmented-item {
      border-radius: 8px;
      height: 44px;

      &::after {
        border-radius: 8px;
      }
    }

    .ant-segmented-item-label {
      line-height: 44px;
    }
  `,
};

export default InputSegmented;
