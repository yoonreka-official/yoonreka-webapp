import { css } from '@emotion/react'
import { Drawer } from 'antd'

import IconExpandLeft24 from '~/assets/svg/icon_expand_left_24.svg?react'
import Flex from '~/components/display/Flex.tsx'
import Body from '~/components/typography/Body.tsx'
import { COLORS } from '~/configs/theme.ts'
import useAuth from '~/hooks/useAuth.tsx'
import Container from '~/layouts/Container.tsx'
import CardConfig from '~/pages/more/config/CardConfig.tsx'
import {
  formatDate,
  formatGender,
  formatMobileNumber,
} from '~/utils/format.util.ts'

import type { DrawerProps } from 'antd'
import type { ReactNode } from 'react'

interface Props extends Omit<DrawerProps, 'onClose'> {
  onClose?: () => void
}

function DrawerConfigMyInfo({ children, onClose, ...props }: Props) {
  const {
    state: { authUser },
  } = useAuth()

  const handleClose = () => {
    onClose?.()
  }

  return (
    <Drawer
      getContainer={false}
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
          <h1>내 정보</h1>
        </div>
      </header>

      <Container css={styles.container}>
        <CardConfig>
          <Flex direction="column" gap={12}>
            <MyInfoRow title="이름">{authUser?.name}</MyInfoRow>
            <MyInfoRow title="전화번호">
              {formatMobileNumber(authUser?.phone)}
            </MyInfoRow>
            <MyInfoRow title="생년월일">
              {formatDate(authUser?.birthDate, 'YYYY. MM. DD')}
            </MyInfoRow>
            <MyInfoRow title="성별">{formatGender(authUser?.gender)}</MyInfoRow>
            <MyInfoRow title="소속학교">{authUser?.school.name}</MyInfoRow>
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
    <Flex justify="space-between">
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

export default DrawerConfigMyInfo
