import { css } from '@emotion/react'
import { Checkbox as AntdCheckbox } from 'antd'

import { COLORS } from '~/configs/theme.ts'

import type { CheckboxProps } from 'antd'

interface Props extends CheckboxProps {
  label?: string
}

function Checkbox({ children, ...props }: Props) {
  return (
    <AntdCheckbox css={styles} {...props}>
      {children}
    </AntdCheckbox>
  )
}

const styles = css`
  &.ant-checkbox-wrapper {
    display: flex;
    align-items: center;

    color: ${COLORS.FONT['90']};
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.16px;
    line-height: 0;

    .ant-checkbox {
      .ant-checkbox-inner {
        border: 1px solid ${COLORS.FONT['20']};
        outline: 1px solid #fff;
        outline-offset: -2px;
        width: 16px;
        height: 16px;

        :hover {
          border: 1px solid ${COLORS.POINT.PRIMARY};
        }

        :disabled {
          outline: none;
        }

        :after {
          top: 47%;
          inset-inline-start: 25%;
          display: table;
          width: 5px;
          height: 8px;
        }
      }
    }

    .ant-checkbox-indeterminate {
      &.ant-checkbox {
        .ant-checkbox-inner {
          border: 1px solid ${COLORS.POINT.PRIMARY} !important;
          background-color: ${COLORS.POINT.PRIMARY} !important;

          :after {
            content: '';
            position: absolute;
            border-radius: 4px;
            left: 50%;
            top: 50%;
            display: block;
            background: #fff;
            height: 2px;
            width: 6px;
            z-index: 1;
          }
        }

        &.ant-checkbox-disabled {
          .ant-checkbox-inner {
            outline: 1px solid ${COLORS.FONT['10']};
            background-color: ${COLORS.FONT['30']} !important;
            border: 1px solid ${COLORS.FONT['30']} !important;

            :after {
              background: ${COLORS.FONT['10']};
            }
          }
        }
      }
    }

    &.ant-checkbox-wrapper-checked {
      .ant-checkbox {
        .ant-checkbox-inner {
          border-color: ${COLORS.POINT.PRIMARY};
        }
      }

      &.ant-checkbox-wrapper-disabled {
        .ant-checkbox {
          .ant-checkbox-inner {
            outline: 1px solid ${COLORS.FONT['10']};
            border-color: ${COLORS.FONT['30']};
            background-color: ${COLORS.FONT['30']};

            :after {
              border-color: ${COLORS.FONT['10']};
            }
          }
        }
      }
    }

    &.ant-checkbox-wrapper-disabled {
      .ant-checkbox {
        .ant-checkbox-inner {
          outline: none;
          background-color: ${COLORS.FONT['10']};
        }
      }
    }
  }
`

export default Checkbox
