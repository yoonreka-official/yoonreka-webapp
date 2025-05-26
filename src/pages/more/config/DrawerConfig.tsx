import { css } from '@emotion/react'
import { Drawer } from 'antd'
import { useState } from 'react'

import IconExpandLeft24 from '~/assets/svg/icon_expand_left_24.svg?react'
import Flex from '~/components/display/Flex.tsx'
import Body from '~/components/typography/Body.tsx'
import { COLORS } from '~/configs/theme.ts'
import useAuth from '~/hooks/useAuth.tsx'
import Container from '~/layouts/Container.tsx'
import CardConfig, {
  CardConfigButton,
} from '~/pages/more/config/CardConfig.tsx'
import DrawerConfigMyInfo from '~/pages/more/config/DrawerConfigMyInfo.tsx'
import DrawerConfigNotification from '~/pages/more/config/DrawerConfigNotification.tsx'

import type { DrawerProps } from 'antd'

interface Props extends Omit<DrawerProps, 'onClose'> {
  onClose?: () => void
}

function DrawerConfig({ children, onClose, ...props }: Props) {
  const {
    state: { notificationConfig },
    handleLogout,
    handleWithdraw,
  } = useAuth()

  const [isMyInfoOpen, setIsMyInfoOpen] = useState(false)
  const [isNotificationModeOpen, setIsNotificationModeOpen] = useState(false)

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
          <h1>설정</h1>
        </div>
      </header>

      <Container css={styles.container}>
        <CardConfig title="내 정보">
          <CardConfigButton onClick={() => setIsMyInfoOpen(true)}>
            회원 정보
          </CardConfigButton>
        </CardConfig>

        <CardConfig title="알림">
          <CardConfigButton
            suffix={
              notificationConfig?.isDistractionMode ? (
                <Body color={COLORS.POINT.PRIMARY} size={14} weight="bold">
                  ON
                </Body>
              ) : (
                <Body color={COLORS.FONT['20']} size={14} weight="bold">
                  OFF
                </Body>
              )
            }
            onClick={() => setIsNotificationModeOpen(true)}
          >
            방해금지 모드
          </CardConfigButton>
        </CardConfig>

        <CardConfig title="기타">
          <Flex direction="column" gap={16}>
            <Flex justify="space-between">
              <Body size={16} weight="semibold">
                버전 정보
              </Body>

              <Body color={COLORS.POINT.PRIMARY} size={14} weight="bold">
                1.0.0
              </Body>
            </Flex>
            <CardConfigButton onClick={handleLogout}>로그아웃</CardConfigButton>
            <CardConfigButton
              color={COLORS.STATUS['01']}
              onClick={handleWithdraw}
            >
              회원탈퇴
            </CardConfigButton>
          </Flex>
        </CardConfig>
      </Container>

      <DrawerConfigMyInfo
        open={isMyInfoOpen}
        onClose={() => setIsMyInfoOpen(false)}
      />

      <DrawerConfigNotification
        open={isNotificationModeOpen}
        onClose={() => setIsNotificationModeOpen(false)}
      />
    </Drawer>
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
}

export default DrawerConfig
