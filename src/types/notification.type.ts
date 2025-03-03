import type {
  InvoiceBook,
  InvoiceMethod,
  InvoiceState,
  InvoiceType,
} from '~/types/invoice.type.ts';
import type { AttachmentFile } from '~/types/lectures.type.ts';
import type { Nullable } from '~/types/utils/nullable.type.ts';

export type NotificationOrderKey = 'ID';

export enum NotificationType {
  INVOICE_DUE = 'INVOICE_DUE',
  NEW_MATERIAL = 'NEW_MATERIAL',
  NEW_NOTICE = 'NEW_NOTICE',
  TEST = 'TEST',
}

export interface NotificationParams {
  pagination: {
    offset?: number;
    limit?: number;
  };

  filter?: {
    types: NotificationType[];
  };
}

export interface NotificationPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface NotificationResponse {
  totalCount: number;
  edges: NotificationEdge[];
  pageInfo: NotificationPageInfo;
}

export interface FormattedNotificationResponse {
  totalCount: number;
  pageInfo: NotificationPageInfo;
  data: Notification[];
}

export interface NotificationEdge {
  cursor: string;
  node: Notification;
}

export enum NotificationTypeName {
  LECTURE_INVOICE = 'LectureInvoice',
  MATERIAL = 'Material',
  NOTICE = 'Notice',
}

export interface Notification {
  // ! 푸시 알림으로 나가는 데이터 시작
  id: string;
  title: string;
  contents: string;
  createdAt: number;
  // ! 푸시 알림으로 나가는 데이터 끝

  // ? __typename 으로 공지의 타입을 체크
  link: Nullable<{
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __typename: NotificationTypeName;
  }>;

  // ? 공지사항
  notice: Nullable<Notice>;
  // ? 학습자료
  material: Nullable<NotificationMaterial>;
  // ? 회비
  lectureInvoice: Nullable<NotificationLectureInvoice>;

  // ? 프론트 새로운 알림 관리용 필드
  isNew?: boolean;
}

export interface NotificationMaterial {
  id: string;
  title: string;
  description: string;

  attachments: AttachmentFile[];

  lecture: NotificationLecture;

  createdAt: number;
  updatedAt: number;
}

export interface NotificationLectureInvoice {
  type: InvoiceType;
  state: InvoiceState;
  price: number;
  paidAt: number;
  dueDate: number;
  method: InvoiceMethod;
  lecture: NotificationLecture;
  books: InvoiceBook[];
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  link: string;
  lectures: NotificationLecture[];
  attachments: AttachmentFile[];
  createdAt: number;
  updatedAt: number;
}

export interface NotificationLecture {
  id: string;
  title: string;
}
