import { css } from '@emotion/react'
import { Drawer } from 'antd'

import IconExpandLeft24 from '~/assets/svg/icon_expand_left_24.svg?react'
import { COLORS } from '~/configs/theme.ts'

import { useMutation, useQuery } from '@apollo/client'
import type { DrawerProps } from 'antd'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ButtonPrimary from '~/components/buttons/ButtonPrimary'
import useScroll from '~/hooks/useScroll'
import { GetUserChatsDocument, ReadAllUserChatsDocument } from '~/types/api'
import { DrawerMessageCreate } from './DrawerMessageCreate'
import { MessageItem } from './MessageItem'

interface Props extends Omit<DrawerProps, 'onClose'> {
  defaultActiveKey?: string
  onClose?: () => void
}

export function DrawerMessages({
  open,
  children,
  defaultActiveKey,
  title,
  onClose,
  ...props
}: Props) {
  const itemsRef = useRef<HTMLDivElement>(null)

  const [readAllUserChats] = useMutation(ReadAllUserChatsDocument)
  const { data, refetch } = useQuery(GetUserChatsDocument, {
    fetchPolicy: 'no-cache',
  })
  const [isMessageCreateOpen, setIsMessageCreateOpen] = useState(false)

  const { scrollTo } = useScroll({
    selector: '.drawerNotificationsRoot .ant-drawer-body',
  })

  const userChats = useMemo(
    () => data?.userChats.edges.map((edge) => edge.node) ?? [],
    [data],
  )

  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  useEffect(() => {
    if (itemsRef.current) {
      scrollTo(itemsRef.current.scrollHeight)
    }
  }, [itemsRef.current, scrollTo])

  useEffect(() => {
    if (!open) {
      return
    }

    ;(async () => {
      await readAllUserChats()
    })()
    const lastUserChatId = userChats[userChats.length - 1]?.id
    if (lastUserChatId) {
      window.localStorage.setItem('lastSeenUserChatId', lastUserChatId)
    }
  }, [userChats, open])

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
          <h1>메시지함</h1>
        </div>
      </header>

      <div className="pt-16 px-4 space-y-4 bg-white" ref={itemsRef}>
        {userChats.map((userChat) => (
          <MessageItem key={userChat.id} userChat={userChat} />
        ))}
        {userChats.length === 0 && (
          <div className="flex items-center justify-center h-[calc(100vh-132px)]">
            <p className="text-gray-500">메시지가 없어요.</p>
          </div>
        )}

        <div className="sticky bottom-0 left-0 right-0 pb-4">
          <ButtonPrimary
            size="small"
            onClick={() => setIsMessageCreateOpen(true)}
          >
            메시지 작성
          </ButtonPrimary>
        </div>
      </div>

      <DrawerMessageCreate
        open={isMessageCreateOpen}
        onClose={() => {
          setIsMessageCreateOpen(false)
          refetch()
        }}
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
}
