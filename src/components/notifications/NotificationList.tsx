import { css } from '@emotion/react';

import CardInvoice from '~/components/notifications/CardInvoice.tsx';
import CardNotification from '~/components/notifications/CardNotification.tsx';
import NotificationLoading from '~/components/notifications/NotificationLoading.tsx';
import Body from '~/components/typography/Body.tsx';
import NoData from '~/components/utils/NoData.tsx';
import { COLORS } from '~/configs/theme.ts';
import useNotifications from '~/hooks/useNotifications.ts';
import Container from '~/layouts/Container.tsx';
import { NotificationTypeName } from '~/types/notification.type.ts';

import type { Notification } from '~/types/notification.type.ts';

function NotificationList() {
  const {
    state: { isLoading, list },
  } = useNotifications();

  const renderNotification = (item: Notification) => {
    // eslint-disable-next-line no-underscore-dangle
    switch (item.link?.__typename) {
      case NotificationTypeName.MATERIAL:
        return (
          <CardNotification
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
              등록된 알림이 없습니다.
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
