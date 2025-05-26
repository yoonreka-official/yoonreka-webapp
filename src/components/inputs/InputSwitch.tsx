import { css } from '@emotion/react'
import { Switch as AntdSwitch } from 'antd'

import { COLORS } from '~/configs/theme.ts'

import type { SwitchProps } from 'antd/es/switch'

function Switch({ ...props }: SwitchProps) {
  return <AntdSwitch css={switchStyle} {...props} />
}

const switchStyle = css`
  background: ${COLORS.POINT.SECONDARY};

  &.ant-switch:hover:not(.ant-switch-disabled) {
    background: ${COLORS.POINT.SECONDARY};
  }

  &.ant-switch-checked {
    background: ${COLORS.POINT.PRIMARY};

    :hover:not(.ant-switch-disabled) {
      background: ${COLORS.POINT.PRIMARY};
    }
  }

  &.ant-switch-small {
    .ant-switch-handle {
      inset-inline-start: 3px;
      top: 3px;
    }
  }
`

export default Switch
