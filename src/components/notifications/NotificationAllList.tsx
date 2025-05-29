import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import { useMemo } from 'react'

import ButtonNav from '~/components/buttons/ButtonNav.tsx'
import CardInvoice from '~/components/notifications/CardInvoice.tsx'
import CardNotification from '~/components/notifications/CardNotification.tsx'
import NotificationLoading from '~/components/notifications/NotificationLoading.tsx'
import Body from '~/components/typography/Body.tsx'
import NoData from '~/components/utils/NoData.tsx'
import { COLORS } from '~/configs/theme.ts'
import useNotifications from '~/hooks/useNotifications.ts'
import useScroll from '~/hooks/useScroll.ts'
import Container from '~/layouts/Container.tsx'
import { DEFAULT_PAGINATION } from '~/stores/NotificationSlice.ts'
import { GetMyNoticesDocument } from '~/types/api'
import { AttachmentFile } from '~/types/lectures.type'
import {
  NotificationType,
  NotificationTypeName,
} from '~/types/notification.type.ts'

import type {
  Notification,
  NotificationParams,
} from '~/types/notification.type.ts'

const getNotificationTypeLabel = (type: NotificationType | 'ALL') => {
  switch (type) {
    case NotificationType.NEW_MATERIAL:
      return '학습자료 '
    case NotificationType.INVOICE_DUE:
      return '회비 '
    case NotificationType.NEW_NOTICE:
      return '공지사항 '
    default:
      return ''
  }
}

export default function NotificationAllList() {
  const { previousData, data = previousData } = useQuery(GetMyNoticesDocument, {
    fetchPolicy: 'no-cache',
  })
  const pinnedNotices = useMemo(
    () =>
      (data?.myNotices?.filter((notice) => !!notice.pinnedAt) ?? []).sort(
        (a, b) => a.pinnedAt! - b.pinnedAt!,
      ),
    [data],
  )

  const {
    state: { isLoading, list, selectedType, pageInfo, params },
    setReadId,
    fetchData,
  } = useNotifications()

  const { scrollTo, getCurrentPosition } = useScroll({
    selector: '.drawerNotificationsRoot .ant-drawer-body',
  })

  const renderNotification = (item: Notification) => {
    // ? 화면에 그릴 때, 읽은 ID로 저장.
    // ! 단, 실제 읽음 처리는 모달 닫을 뗴 해야함
    setReadId(item.id)

    // eslint-disable-next-line no-underscore-dangle
    switch (item.link?.__typename) {
      case NotificationTypeName.MATERIAL:
        return (
          <CardNotification
            key={item.id}
            title={item.material!.title}
            attachments={item.material!.attachments}
            createdAt={item.material!.createdAt}
            description={item.material!.description}
            isNew={item.isNew}
            type={NotificationTypeName.MATERIAL}
          />
        )
      case NotificationTypeName.NOTICE:
        return (
          <CardNotification
            key={item.id}
            title={item.notice!.title}
            attachments={item.notice!.attachments}
            createdAt={item.notice!.createdAt}
            description={item.notice!.description}
            isNew={item.isNew}
            link={item.notice!.link}
            type={NotificationTypeName.NOTICE}
          />
        )
      case NotificationTypeName.LECTURE_INVOICE:
        return (
          <CardInvoice
            key={item.id}
            title={item.lectureInvoice!.lecture.title}
            createdAt={item.lectureInvoice!.dueDate}
            invoiceType={item.lectureInvoice!.type}
            isNew={item.isNew}
          />
        )
      default:
        return null
    }
  }

  if (isLoading && params?.pagination.offset === 0) {
    return (
      <Container css={styles.notificationContainer}>
        <NotificationLoading />
      </Container>
    )
  }

  return (
    <Container css={styles.notificationContainer}>
      {!list.length && (
        <NoData
          description={
            <Body color={COLORS.FONT['30']} size={14}>
              등록된 {getNotificationTypeLabel(selectedType)} 알림이 없습니다.
            </Body>
          }
          disableWrapper
        />
      )}

      {selectedType === 'ALL' &&
        pinnedNotices.map((notice) => (
          <CardNotification
            key={notice.id}
            title={notice.title}
            attachments={notice.attachments as unknown as AttachmentFile[]}
            createdAt={notice.createdAt}
            description={notice.description}
            link={notice.link}
            type={NotificationTypeName.NOTICE}
            pinned={true}
          />
        ))}

      {list
        .filter(
          (item) =>
            !pinnedNotices.map(({ id }) => id).includes(item.notice?.id ?? ''),
        )
        .map((item) => renderNotification(item))}

      {pageInfo.hasNextPage && (
        <ButtonNav
          onClick={async () => {
            const pos = getCurrentPosition()

            const perPage = DEFAULT_PAGINATION.limit
            const current = params?.pagination.offset || 0
            const newParams: NotificationParams = {
              pagination: {
                limit: perPage,
                offset: current + perPage,
              },
            }

            if (selectedType !== 'ALL') {
              newParams.filter = {
                types: [selectedType],
              }
            }

            await fetchData(newParams)
            if (pos) {
              scrollTo(pos)
            }
          }}
        >
          {DEFAULT_PAGINATION.limit}개 더보기
        </ButtonNav>
      )}
    </Container>
  )
}

const styles = {
  notificationContainer: css`
    padding: 120px 14px 12px;

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 20px;
    }
  `,
}
