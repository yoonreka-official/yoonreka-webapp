import { css } from '@emotion/react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { MessageFilled } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import IconBell24 from '~/assets/svg/icon_bell_24.svg?react'
import Flex from '~/components/display/Flex.tsx'
import SelectYearMonth from '~/components/inputs/SelectYearMonth.tsx'
import DrawerNotifications from '~/components/notifications/DrawerNotifications.tsx'
import { COLORS } from '~/configs/theme.ts'
import useNotifications from '~/hooks/useNotifications.ts'
import useSchedules from '~/hooks/useSchedules.ts'
import { GetUserChatsDocument } from '~/types/api'
import { DrawerMessages } from '../messages/DrawerMessages'

const SHOW_NOTIFICATIONS_MODAL = 'notifications'
const SHOW_MESSAGES_MODAL = 'messages'

export default function ScheduleHeader() {
  const [params] = useSearchParams()
  const redirectTo = params.get('to')
  const modal = params.get('modal')
  const { data } = useQuery(GetUserChatsDocument, { fetchPolicy: 'no-cache' })

  const navigate = useNavigate()

  const { state, handleSetMonth, handleSetDate } = useSchedules()
  const {
    state: { hasNew: hasNewNotification },
  } = useNotifications()
  const [hasNewMessages, setHasNewMessages] = useState(false)

  const isOpenNotification = modal === SHOW_NOTIFICATIONS_MODAL
  const isOpenMessages = modal === SHOW_MESSAGES_MODAL

  const handleOpenNotification = () => {
    navigate(`/?modal=${SHOW_NOTIFICATIONS_MODAL}`, {
      replace: false,
    })
  }

  const handleOpenMessages = () => {
    navigate(`/?modal=${SHOW_MESSAGES_MODAL}`, {
      replace: false,
    })
  }

  const resetNewMessages = useCallback(() => {
    const lastSeenUserChatId = window.localStorage.getItem('lastSeenUserChatId')
    const userChats = data?.userChats.edges.map((edge) => edge.node) ?? []
    if (lastSeenUserChatId) {
      const hasNew = userChats.some((chat) => +chat.id > +lastSeenUserChatId)
      setHasNewMessages(hasNew)
    } else {
      setHasNewMessages(userChats.length > 0)
    }
  }, [data])

  useEffect(() => {
    // ? 푸시알림을 탭해서 앱에 진입한 경우
    if (
      redirectTo === SHOW_NOTIFICATIONS_MODAL ||
      redirectTo === SHOW_MESSAGES_MODAL
    ) {
      // 1. 강제로 히스토리 변경 (replaceState로 초기화)
      window.history.replaceState({}, '', '/')
      // 2. 가짜 히스토리 추가 (크롬 최적화 방지)
      setTimeout(() => {
        window.history.pushState({}, '', `/?modal=temp`)
      }, 50)

      // 1. 쿼리 초기화후 홈 페이지에서 새로운 히스토리 시작
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 200)

      // 2. 홈페이지에서 알림 모달 오픈 히스토리 푸시
      setTimeout(() => {
        if (redirectTo === SHOW_NOTIFICATIONS_MODAL) {
          handleOpenNotification()
        } else {
          handleOpenMessages()
        }
      }, 400)
    }
  }, [redirectTo, navigate, window.history])

  useEffect(() => {
    const handlePopState = () => {
      navigate('/', { replace: false })
    }

    if (isOpenNotification) {
      window.addEventListener('popstate', handlePopState)
    } else {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isOpenNotification])

  useEffect(() => {
    resetNewMessages()
  }, [resetNewMessages])

  return (
    <header css={styles.header}>
      <Flex items="center" justify="space-between">
        <SelectYearMonth
          value={state.selectedMonth}
          onChange={(date) => {
            handleSetMonth(date)
            handleSetDate(date)
          }}
        />

        <div className="flex items-center gap-4">
          <button
            css={styles.notificationButton}
            onClick={() => handleOpenMessages()}
          >
            {hasNewMessages && <div css={styles.redDot} />}
            <MessageFilled className="text-xl fill-current !text-[#B0B8C1]" />
          </button>

          <button
            css={styles.notificationButton}
            onClick={() => handleOpenNotification()}
          >
            {hasNewNotification && <div css={styles.redDot} />}
            <IconBell24 />
          </button>
        </div>
      </Flex>

      <DrawerNotifications
        open={isOpenNotification}
        onClose={() => {
          navigate(-1)
        }}
      />

      <DrawerMessages
        open={isOpenMessages}
        onClose={() => {
          navigate(-1)
          resetNewMessages()
        }}
      />
    </header>
  )
}

const styles = {
  header: css`
    padding: 12px 20px;
  `,

  notificationButton: css`
    position: relative;
    line-height: 1;

    button {
      appearance: none;
      background: none;
      border: 0;
      line-height: 1;
    }
  `,

  redDot: css`
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    height: 5px;
    background: ${COLORS.TAG.RED};
    border-radius: 50%;
  `,
}
