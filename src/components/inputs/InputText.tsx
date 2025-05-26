import { css } from '@emotion/react'
import { Input } from 'antd'

import IconClear20 from '~/assets/svg/icon_clear_20.svg?react'
import { useFormInstance } from '~/components/forms/FormBase.tsx'
import { COLORS } from '~/configs/theme.ts'

import type { InputProps } from 'antd'

export interface InputTextProps
  extends Omit<InputProps, 'size' | 'status' | 'value'> {
  value?: string
}

function InputText({ id, value, allowClear = true, ...props }: InputTextProps) {
  const form = useFormInstance()

  return (
    <Input
      id={id}
      value={value}
      css={textInputStyle}
      suffix={
        allowClear && value ? (
          <IconClear20 css={clearIcon} onClick={() => form.resetFields([id])} />
        ) : undefined
      }
      {...props}
    />
  )
}

export const textInputStyle = css`
  &.ant-input-outlined {
    border-radius: 8px;
    border: 1px solid ${COLORS.BG.BACKGROUND};
    background: ${COLORS.BG.BACKGROUND};
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
      border: 1px solid ${COLORS.BG.BACKGROUND};
      background: ${COLORS.BG.BACKGROUND};
    }

    :hover,
    :focus {
      border: 1px solid ${COLORS.POINT.PRIMARY};
      background: #fff;
      box-shadow: none;
    }

    ::placeholder {
      color: ${COLORS.FONT['30']};
    }

    :disabled {
      cursor: not-allowed;
      background: ${COLORS.BG.BACKGROUND};
      border: 1px solid ${COLORS.FONT['30']};
    }

    :read-only {
      background: ${COLORS.BG.BACKGROUND};
      border: 1px solid ${COLORS.BG.BACKGROUND};

      :focus {
        background: #fff;
      }
    }
  }

  &.ant-input-affix-wrapper {
    line-height: 1;
    height: 52px;

    &:read-only {
      border: 1px solid ${COLORS.BG.BACKGROUND};
    }

    &.ant-input-affix-wrapper-focused {
      border: 1px solid ${COLORS.POINT.PRIMARY};
      background: #fff;
    }

    &.ant-input-status-error:read-only {
      // border: ${COLORS.BG.BACKGROUND};
      // background: ${COLORS.BG.BACKGROUND};
    }

    &.ant-input-status-warning:read-only {
      border: ${COLORS.BG.BACKGROUND};
      background: ${COLORS.BG.BACKGROUND};
    }
  }
`

export const clearIcon = css`
  margin: 0 !important;
`

export default InputText
