import { css } from '@emotion/react';
import { Input } from 'antd';

import { COLORS } from '~/configs/theme.ts';

import type { InputProps } from 'antd';

export interface InputPasswordProps
  extends Omit<InputProps, 'size' | 'status'> {
  removeSpace?: boolean;
}

function InputPassword({ removeSpace, ...props }: InputPasswordProps) {
  return (
    <Input.Password
      css={textInputStyle}
      // size={getInputSize(size)}
      // suffix={getStatusIcon(status, size)}
      {...props}
      onKeyDown={e => {
        // ? removeSpace 값이 true 이면, space 입력 무시
        if (removeSpace && e.code === 'Space') {
          e.preventDefault();
        }
      }}
      onPaste={e => {
        // ? removeSpace 값이 true 이면, 붙여넣기 막고 공백 제거한 value 올려줌
        if (removeSpace) {
          e.preventDefault();
          props.onChange?.({
            ...e,
            target: {
              ...e.currentTarget,
              value: e.clipboardData.getData('text').replace(/ /gi, ''),
            },
          });
        }
      }}
    />
  );
}

export const textInputStyle = css`
  &.ant-input-outlined {
    border-radius: 8px;
    border: 1px solid ${COLORS.BG.BACKGROUND_TEXT};
    background: ${COLORS.BG.BACKGROUND_TEXT};
    transition:
      all 0.2s,
      outline-offset 0s;
    box-shadow: none !important;
    display: flex;
    align-items: center;
    height: 52px;

    &.ant-input-status-error {
    }

    &.ant-input-status-error,
    &.ant-input-status-warning {
      outline: unset;

      // :focus {
      //   outline: 1px solid ${COLORS.STATUS['01']};
      //   outline-offset: 2px;
      // }
    }

    :hover,
    :focus {
      border: 1px solid ${COLORS.POINT.PRIMARY};
      background: #fff;
      // background: ${COLORS.BG.BACKGROUND_TEXT};
      box-shadow: none;
    }

    // :focus {
    //   outline: 1px solid ${COLORS.POINT.PRIMARY};
    //   outline-offset: 2px;
    // }

    ::placeholder {
      color: ${COLORS.FONT['30']};
    }

    :disabled {
      cursor: not-allowed;
      background: ${COLORS.BG.BACKGROUND_TEXT};
      border: 1px solid ${COLORS.FONT['30']};
    }

    :read-only {
      border: 1px solid ${COLORS.FONT['30']};

      :focus {
        outline: 0;
      }
    }
  }

  &.ant-input-affix-wrapper {
    line-height: 1;
    height: 52px;

    &:read-only {
      border: 1px solid ${COLORS.BG.BACKGROUND_TEXT};
    }

    &:focus-within {
      border: 1px solid ${COLORS.POINT.PRIMARY};
    }

    &.ant-input-status-error:read-only {
      border: 1px solid ${COLORS.STATUS['01']};
      background: ${COLORS.BG.BACKGROUND_TEXT};
    }

    &.ant-input-status-warning:read-only {
      border: 1px solid ${COLORS.STATUS['03']};
      background: ${COLORS.BG.BACKGROUND_TEXT};
    }
  }
`;

export default InputPassword;
