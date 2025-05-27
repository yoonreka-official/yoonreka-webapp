import { css } from '@emotion/react'
import { NavLink, useLocation } from 'react-router-dom'

import IconGrades from '~/assets/svg/icon_grades.svg?react'
import IconMore from '~/assets/svg/icon_more.svg?react'
import IconQuestions from '~/assets/svg/icon_questions.svg?react'
import IconSchedules from '~/assets/svg/icon_schedules.svg?react'
import IconStudies from '~/assets/svg/icon_studies.svg?react'
import Flex from '~/components/display/Flex.tsx'
import Caption from '~/components/typography/Caption.tsx'
import { COLORS, LAYOUT } from '~/configs/theme.ts'

const NAV_ITEMS = [
  {
    title: '스케쥴',
    path: '/',
    icon: <IconSchedules />,
  },
  {
    title: '공부하기',
    path: '/lectures',
    icon: <IconStudies />,
  },
  {
    title: '수업성적',
    path: '/grades',
    icon: <IconGrades />,
  },
  {
    title: '질문하기',
    path: '/questions',
    icon: <IconQuestions />,
  },
  {
    title: '더보기',
    path: '/more',
    icon: <IconMore />,
  },
]

export default function BottomNavigation() {
  const { pathname } = useLocation()

  return (
    <nav css={styles.bottomNavigation} className="max-w-md mx-auto">
      <Flex justify="space-between">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.path} to={item.path}>
            <Flex
              css={styles.navItem(item.path === pathname)}
              direction="column"
              gap={2}
              items="center"
              justify="center"
            >
              {item.icon}

              <Caption size={10} weight="medium">
                {item.title}
              </Caption>
            </Flex>
          </NavLink>
        ))}
      </Flex>
    </nav>
  )
}

const styles = {
  bottomNavigation: css`
    position: fixed;
    height: ${LAYOUT.NAV_BAR_HEIGHT};
    bottom: 0;
    width: 100%;
    left: 0;
    right: 0;
    padding: 8px 40px 12px;

    border-top: 1px solid ${COLORS.BG['03']};
    border-top-right-radius: 24px;
    border-top-left-radius: 24px;
    background: #fff;
  `,

  navItem: (active?: boolean) => css`
    &:hover,
    &:focus,
    &:focus-within,
    &:active {
      background: none;
    }

    svg {
      path {
        fill: ${active ? COLORS.POINT.PRIMARY : COLORS.BG['04']};
      }
    }

    div {
      color: ${active ? COLORS.POINT.PRIMARY : COLORS.FONT['20']};
    }
  `,
}
