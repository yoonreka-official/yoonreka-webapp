import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'

import NotificationLoading from '~/components/notifications/NotificationLoading.tsx'
import Body from '~/components/typography/Body.tsx'
import NoData from '~/components/utils/NoData.tsx'
import { COLORS } from '~/configs/theme.ts'
import Container from '~/layouts/Container.tsx'
import { GetMyMaterialsDocument } from '~/types/api'
import { AttachmentFile } from '~/types/lectures.type'
import { NotificationTypeName } from '~/types/notification.type'
import CardNotification from './CardNotification'

export default function MaterialList() {
  const {
    previousData,
    data = previousData,
    loading,
  } = useQuery(GetMyMaterialsDocument, {
    fetchPolicy: 'no-cache',
  })

  const materials = data?.myMaterials ?? []

  if (loading) {
    return (
      <Container css={styles.notificationContainer}>
        <NotificationLoading />
      </Container>
    )
  }
  return (
    <Container css={styles.notificationContainer}>
      {!materials.length && (
        <NoData
          description={
            <Body color={COLORS.FONT['30']} size={14}>
              등록된 학습자료가 없습니다.
            </Body>
          }
          disableWrapper
        />
      )}

      {materials.map((material) => (
        <CardNotification
          key={material.id}
          title={material.title}
          attachments={material.attachments as unknown as AttachmentFile[]}
          createdAt={material.createdAt}
          description={material.description}
          type={NotificationTypeName.MATERIAL}
        />
      ))}
    </Container>
  )
}

const styles = {
  notificationContainer: css`
    padding: 114px 14px 12px;

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 20px;
    }
  `,
}
