import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'

import NotificationLoading from '~/components/notifications/NotificationLoading.tsx'
import Body from '~/components/typography/Body.tsx'
import NoData from '~/components/utils/NoData.tsx'
import { COLORS } from '~/configs/theme.ts'
import Container from '~/layouts/Container.tsx'
import { GetMyLectureInvoicesDocument } from '~/types/api'
import CardInvoice from './CardInvoice'

export default function LectureInvoiceList() {
  const {
    previousData,
    data = previousData,
    loading,
  } = useQuery(GetMyLectureInvoicesDocument, {
    fetchPolicy: 'no-cache',
  })

  const lectureInvoices = data?.myLectureInvoices ?? []

  if (loading) {
    return (
      <Container css={styles.notificationContainer}>
        <NotificationLoading />
      </Container>
    )
  }
  return (
    <Container css={styles.notificationContainer}>
      {!lectureInvoices.length && (
        <NoData
          description={
            <Body color={COLORS.FONT['30']} size={14}>
              등록된 회비가 없습니다.
            </Body>
          }
          disableWrapper
        />
      )}
      {lectureInvoices.map((lectureInvoice) => (
        <CardInvoice
          key={`lecture-invoice-${lectureInvoice.id}`}
          title={lectureInvoice.lecture?.title ?? ''}
          createdAt={lectureInvoice.dueDate}
          invoiceType={lectureInvoice.type}
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
