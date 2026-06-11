import { css } from '@emotion/react'
import { Tabs } from 'antd'
import { useState } from 'react'

import ButtonNav from '~/components/buttons/ButtonNav.tsx'
import DrawerNotifications from '~/components/notifications/DrawerNotifications.tsx'
import Headline from '~/components/typography/Headline.tsx'
import { COLORS } from '~/configs/theme'
import useNotifications from '~/hooks/useNotifications.ts'
import { DEFAULT_PAGINATION } from '~/stores/NotificationSlice.ts'
import { NotificationType } from '~/types/api'

const LECTURE_TABS = [
  { key: 'videos', label: '복습영상' },
  { key: 'materials', label: '수업자료' },
  { key: 'study-materials', label: '개별자료' },
]

export type LectureTabType = 'videos' | 'materials' | 'study-materials'

export interface LectureHeaderProps {
  defaultType?: LectureTabType
  onTypeChange: (type: LectureTabType) => void
}

export default function LectureHeader({
  defaultType = 'videos',
  onTypeChange,
}: LectureHeaderProps) {
  const { fetchData, handleChangeType } = useNotifications()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header css={styles.header}>
        <div css={styles.titleBox}>
          <Headline>공부하기</Headline>

          <ButtonNav
            onClick={() => {
              handleChangeType(NotificationType.NewMaterial)
              fetchData({
                pagination: DEFAULT_PAGINATION,
                filter: {
                  types: [NotificationType.NewMaterial],
                },
              })
              setOpen(true)
            }}
          >
            학습자료
          </ButtonNav>
        </div>

        <Tabs
          css={styles.tabs}
          defaultActiveKey={defaultType}
          indicator={{ align: 'center', size: (origin) => origin - 16 }}
          items={LECTURE_TABS}
          onChange={(activeKey) => {
            onTypeChange(activeKey as LectureTabType)
          }}
        />
      </header>

      <DrawerNotifications
        defaultActiveKey="education"
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

const styles = {
  header: css`
    background: #fff;
  `,

  titleBox: css`
    padding: 15px 14px 13px;
    display: flex;
    justify-content: space-between;
  `,

  tabs: css`
    padding: 0 14px;
    background: #fff;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      //border-bottom: 1px solid var(--BG-03, #dae0e9);
      border-bottom: 1px solid ${COLORS.BG['03']};
    }

    .ant-tabs-nav {
      margin: 0;

      &:before {
        border: none;
      }
    }

    .ant-tabs-nav-wrap {
      width: 100%;

      .ant-tabs-nav-list {
        width: 100%;

        .ant-tabs-ink-bar {
          //width: 74px !important;
        }

        .ant-tabs-tab {
          justify-content: center;
          flex: 1;
          font-size: 18px;
          font-weight: 500;
          //padding: 8px 0;

          &.ant-tabs-tab-active {
            .ant-tabs-tab-btn {
              font-size: 18px;
              font-weight: 700;
              //line-height: 26px; /* 144.444% */
              letter-spacing: -0.2px;
            }
          }

          & + .ant-tabs-tab {
            margin: 0;
          }
        }
      }
    }
  `,
}
