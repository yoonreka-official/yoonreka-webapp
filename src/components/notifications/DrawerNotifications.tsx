import { css } from '@emotion/react'
import { Drawer, Tabs } from 'antd'
import { useEffect } from 'react'

import IconExpandLeft24 from '~/assets/svg/icon_expand_left_24.svg?react'
import NotificationAllList from '~/components/notifications/NotificationAllList'
import { COLORS } from '~/configs/theme.ts'
import useNotifications from '~/hooks/useNotifications.ts'
import { DEFAULT_PAGINATION } from '~/stores/NotificationSlice.ts'
import { native } from '~/utils/app.util.ts'

import type { DrawerProps } from 'antd'
import MaterialList from './MaterialList'
import NoticeList from './NoticeList'
import { NotificationType } from '~/types/api'

interface Props extends Omit<DrawerProps, 'onClose'> {
  defaultActiveKey?: string
  onClose?: () => void
}

const NOTIFICATION_TABS: Array<{
  key: NotificationType | 'ALL'
  label: string
}> = [
  { key: 'ALL', label: '전체' },
  { key: NotificationType.NewMaterial, label: '학습자료' },
  { key: NotificationType.NewNotice, label: '공지사항' },
  { key: NotificationType.InvoiceDue, label: '회비' },
]

export default function DrawerNotifications({
  open,
  children,
  defaultActiveKey,
  title,
  onClose,
  ...props
}: Props) {
  const {
    state: { selectedType },
    fetchData,
    handleMarkAsRead,
    handleChangeType,
  } = useNotifications()

  const handleClose = () => {
    handleMarkAsRead()
    onClose?.()
  }

  useEffect(() => {
    if (open && selectedType === 'ALL') {
      native.updateBadgeCount()
    }
  }, [open, selectedType])

  return (
    <Drawer
      getContainer={false}
      closable={false}
      css={styles.drawer}
      open={open}
      placement="right"
      push={{ distance: 0 }}
      rootClassName="drawerNotificationsRoot"
      width="100%"
      {...props}
      onClose={() => handleClose()}
    >
      <header css={styles.header}>
        <div css={styles.titleBar}>
          <button onClick={() => handleClose()}>
            <IconExpandLeft24 />
          </button>
          <h1>알림</h1>
        </div>

        <Tabs
          activeKey={selectedType}
          css={styles.tabs}
          defaultActiveKey={defaultActiveKey || 'ALL'}
          indicator={{ align: 'center', size: 74 }}
          items={NOTIFICATION_TABS}
          onChange={(activeKey) => {
            const type = activeKey as NotificationType | 'ALL'
            handleChangeType(type)

            if (type === 'ALL') {
              fetchData({
                pagination: DEFAULT_PAGINATION,
                filter: {
                  types: [
                    NotificationType.InvoiceDue,
                    NotificationType.NewMaterial,
                    NotificationType.NewNotice,
                  ],
                },
              })
            } else {
              fetchData({
                pagination: DEFAULT_PAGINATION,
                filter: {
                  types: [type],
                },
              })
            }
          }}
        />
      </header>

      {selectedType === NotificationType.NewMaterial ? (
        <MaterialList />
      ) : selectedType === NotificationType.NewNotice ? (
        <NoticeList />
      ) : (
        <NotificationAllList />
      )}
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
    z-index: 1000;
  `,

  titleBar: css`
    display: flex;
    align-items: center;
    padding: 15px 14px;
    background: #fff;

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
          font-size: 18px;
          font-weight: 500;
          //padding: 8px 0;

          &.ant-tabs-tab-active {
            .ant-tabs-tab-btn {
              font-size: 18px;
              font-weight: 700;
              //line-height: 26px; /* 144.444% */
              letter-spacing: -0.2px;
            }
          }

          & + .ant-tabs-tab {
            margin: 0;
          }
        }
      }
    }
  `,
}
