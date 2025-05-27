import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'

import { useMemo } from 'react'
import NotificationLoading from '~/components/notifications/NotificationLoading.tsx'
import Body from '~/components/typography/Body.tsx'
import NoData from '~/components/utils/NoData.tsx'
import { COLORS } from '~/configs/theme.ts'
import Container from '~/layouts/Container.tsx'
import { GetMyNoticesDocument } from '~/types/api'
import { AttachmentFile } from '~/types/lectures.type'
import { NotificationTypeName } from '~/types/notification.type'
import CardNotification from './CardNotification'

export default function NoticeList() {
  const {
    previousData,
    data = previousData,
    loading,
  } = useQuery(GetMyNoticesDocument, {
    fetchPolicy: 'no-cache',
  })

  const { notices, pinnedNotices } = useMemo(() => {
    const notices = data?.myNotices ?? []
    return {
      notices: notices.filter((notice) => !notice.pinned),
      pinnedNotices: notices.filter((notice) => notice.pinned),
    }
  }, [data])

  if (loading) {
    return (
      <Container css={styles.notificationContainer}>
        <NotificationLoading />
      </Container>
    )
  }
  return (
    <Container css={styles.notificationContainer}>
      {!notices.length && (
        <NoData
          description={
            <Body color={COLORS.FONT['30']} size={14}>
              등록된 공지사항이 없습니다.
            </Body>
          }
          disableWrapper
        />
      )}

      {pinnedNotices.map((notice) => (
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

      {notices.map((notice) => (
        <CardNotification
          key={notice.id}
          title={notice.title}
          attachments={notice.attachments as unknown as AttachmentFile[]}
          createdAt={notice.createdAt}
          description={notice.description}
          link={notice.link}
          type={NotificationTypeName.NOTICE}
        />
      ))}
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
