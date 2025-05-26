import { css } from '@emotion/react'
import { Drawer } from 'antd'

import IconExpandLeft24 from '~/assets/svg/icon_expand_left_24.svg?react'
import Flex from '~/components/display/Flex.tsx'
import Switch from '~/components/inputs/InputSwitch.tsx'
import SelectTime from '~/components/inputs/SelectTime.tsx'
import Body from '~/components/typography/Body.tsx'
import { COLORS } from '~/configs/theme.ts'
import useAuth from '~/hooks/useAuth.tsx'
import Container from '~/layouts/Container.tsx'
import CardConfig from '~/pages/more/config/CardConfig.tsx'

import type { DrawerProps } from 'antd'
import type { ReactNode } from 'react'

interface Props extends Omit<DrawerProps, 'onClose'> {
  onClose?: () => void
}

function DrawerConfigNotification({ children, onClose, ...props }: Props) {
  const {
    state: { notificationConfig },
    handleUpdate,
  } = useAuth()

  const handleClose = () => {
    onClose?.()
  }

  return (
    <Drawer
      closable={false}
      css={styles.drawer}
      placement="right"
      push={{ distance: 0 }}
      rootClassName="drawerNotificationsRoot"
      width="100%"
      {...props}
      onClose={handleClose}
    >
      <header css={styles.header}>
        <div css={styles.titleBar}>
          <button onClick={() => handleClose()}>
            <IconExpandLeft24 />
          </button>
          <h1>방해금지 모드</h1>
        </div>
      </header>

      <Container css={styles.container}>
        <CardConfig dense>
          <Flex direction="column" gap={12}>
            <MyInfoRow title="방해금지 모드">
              <Switch
                value={notificationConfig?.isDistractionMode}
                onChange={(isDistractionMode) => {
                  handleUpdate({ ...notificationConfig, isDistractionMode })
                }}
              />
            </MyInfoRow>
          </Flex>
        </CardConfig>

        <CardConfig dense>
          <Flex direction="column" gap={12}>
            <MyInfoRow title="시작 시간">
              <SelectTime
                id="startTime"
                value={notificationConfig?.distractionStartTime}
                disabled={!notificationConfig?.isDistractionMode}
                onChange={(value) => {
                  if (
                    !notificationConfig ||
                    notificationConfig.distractionStartTime === value
                  ) {
                    return
                  }

                  handleUpdate({
                    ...notificationConfig,
                    distractionStartTime: value,
                  })
                }}
              />
            </MyInfoRow>
            <MyInfoRow title="종료 시간">
              <SelectTime
                id="endTime"
                value={notificationConfig?.distractionEndTime}
                disabled={!notificationConfig?.isDistractionMode}
                onChange={(value) => {
                  if (
                    !notificationConfig ||
                    notificationConfig.distractionEndTime === value
                  ) {
                    return
                  }

                  handleUpdate({
                    ...notificationConfig,
                    distractionEndTime: value,
                  })
                }}
              />
            </MyInfoRow>
          </Flex>
        </CardConfig>
      </Container>
    </Drawer>
  )
}

interface MyInfoRowProps {
  title: ReactNode
  children: ReactNode
}

function MyInfoRow({ title, children }: MyInfoRowProps) {
  return (
    <Flex items="center" justify="space-between">
      <Body color={COLORS.FONT['40']} size={14} weight="medium">
        {title}
      </Body>
      <Body size={14} weight="semibold">
        {children}
      </Body>
    </Flex>
  )
}

const styles = {
  drawer: css`
    position: relative;

    .ant-drawer-body {
      padding: 0;
      background: ${COLORS.BG.BACKGROUND};
    }
  `,

  header: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  `,

  titleBar: css`
    display: flex;
    align-items: center;
    padding: 15px 14px;

    button {
      display: flex;
    }

    h1 {
      color: #111827;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 26px; /* 130% */
      letter-spacing: -0.5px;
    }
  `,

  container: css`
    padding: 64px 14px 12px;
  `,

  myInfoRowContent: css`
    text-align: right;
  `,
}

export default DrawerConfigNotification
