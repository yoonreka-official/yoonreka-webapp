import { css } from '@emotion/react';

import CardInvoice from '~/components/notifications/CardInvoice.tsx';
import CardNotification from '~/components/notifications/CardNotification.tsx';
import NotificationLoading from '~/components/notifications/NotificationLoading.tsx';
import Body from '~/components/typography/Body.tsx';
import NoData from '~/components/utils/NoData.tsx';
import { COLORS } from '~/configs/theme.ts';
import useNotifications from '~/hooks/useNotifications.ts';
import Container from '~/layouts/Container.tsx';
import {
  NotificationType,
  NotificationTypeName,
} from '~/types/notification.type.ts';

import type { Notification } from '~/types/notification.type.ts';

const getNotificationTypeLabel = (type: NotificationType | 'ALL') => {
  switch (type) {
    case NotificationType.NEW_MATERIAL:
      return '학습자료 ';
    case NotificationType.INVOICE_DUE:
      return '회비 ';
    case NotificationType.NEW_NOTICE:
      return '공지사항 ';
    default:
      return '';
  }
};

function NotificationList() {
  const {
    state: { isLoading, list, selectedType },
    setReadId,
  } = useNotifications();

  const renderNotification = (item: Notification) => {
    // ? 화면에 그릴 때, 읽은 ID로 저장.
    // ! 단, 실제 읽음 처리는 모달 닫을 뗴 해야함
    setReadId(item.id);

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
        );
      case NotificationTypeName.NOTICE:
        return (
          <CardNotification
            key={item.id}
            title={item.notice!.title}
            attachments={item.notice!.attachments}
            createdAt={item.notice!.createdAt}
            description={item.notice!.description}
            isNew={item.isNew}
            type={NotificationTypeName.NOTICE}
          />
        );
      case NotificationTypeName.LECTURE_INVOICE:
        return (
          <CardInvoice
            key={item.id}
            title={item.lectureInvoice!.lecture.title}
            createdAt={item.lectureInvoice!.dueDate}
            invoiceType={item.lectureInvoice!.type}
            isNew={item.isNew}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Container css={styles.notificationContainer}>
        <NotificationLoading />
      </Container>
    );
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

      {list.map(item => renderNotification(item))}
    </Container>
  );
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
};

export default NotificationList;
