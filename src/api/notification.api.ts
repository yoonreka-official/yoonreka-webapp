import { gql } from '@apollo/client'

import { appolo } from '~/utils/apollo.util.ts'

import type {
  NotificationParams,
  NotificationResponse,
} from '~/types/notification.type.ts'

export const getNotifications = async ({
  pagination,
  filter,
}: NotificationParams) => {
  const {
    data: {
      myNotificationPagination: { totalCount, edges, pageInfo },
    },
  } = await appolo.query<{
    myNotificationPagination: NotificationResponse
  }>({
    query: gql`
      # 알림
      # first: 몇개 가지고 올건지
      # skip: 몇개 건너뛸건지
      # (ex. first: 10, skip: 2 -> 정렬 후, 3번째 부터 10개 아이템 가져옴)
      # (위가 페이지네이션 방식이고, cursor 방식 이용하려면, after 나 before에 cursor 값 넣으면 됨)
      # filter 에 types 이용해서 전체, 공지, 학습자료, 회비 별로 가져올 수 있습니다.

      query GetMyNotifications(
        $first: Int
        $order: NotificationRelayOrder
        $skip: Int
        $filter: NotificationFilterInput
        $asc: Boolean
      ) {
        myNotificationPagination(
          first: $first
          order: $order
          skip: $skip
          filter: $filter
          asc: $asc
        ) {
          totalCount
          edges {
            cursor
            node {
              id

              link {
                __typename # LectureInvoice 또는 Material 또는 Notice 입니다.
                ... on LectureInvoice {
                  id
                }
                ... on Material {
                  id
                }
                ... on Notice {
                  id
                }
              }
              lectureInvoice {
                price
                state
                type
                paidAt
                method
                lecture {
                  id
                  title
                }
                dueDate
                books {
                  id
                  title
                  price
                }
              }
              material {
                attachments {
                  createdAt
                  filename
                  id
                  mimeType
                  size
                  updatedAt
                  url
                }
                description
                id
                lecture {
                  id
                  title
                }
                title
                createdAt
                updatedAt
              }
              createdAt
              notice {
                createdAt
                description
                id
                isAll
                link
                title
                updatedAt
                lectures {
                  id
                  title
                }
                attachments {
                  createdAt
                  filename
                  id
                  mimeType
                  size
                  updatedAt
                  url
                }
              }
              contents
              title
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {
      // ? 최신순 정렬로 고정
      order: 'ID',
      asc: false,

      // ? 페이지네이션
      skip: pagination.offset,
      first: pagination.limit,

      // ? NotificationType 필터
      filter,
    },
  })

  return {
    totalCount,
    pageInfo,
    data: edges.map((edge) => edge.node),
  }
}
