import { css } from '@emotion/react'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'

import IconQuestions from '~/assets/svg/icon_questions.svg?react'
import ButtonNav from '~/components/buttons/ButtonNav.tsx'
import Headline from '~/components/typography/Headline.tsx'
import { COLORS } from '~/configs/theme.ts'
import useQuestions from '~/hooks/useQuestions.ts'
import useScroll from '~/hooks/useScroll.ts'
import DrawerQuestionCreate from '~/pages/questions/DrawerQuestionCreate.tsx'
import { QuestionUser } from '~/types/question.type.ts'

const QUESTION_TABS = [
  { key: QuestionUser.STUDENT, label: '학생' },
  { key: QuestionUser.PARENT, label: '학부모' },
]

function QuestionHeader() {
  const [type, setType] = useState<string>(QuestionUser.STUDENT)
  const [open, setOpen] = useState<boolean>(false)

  const { fetchData } = useQuestions()

  const { reset: scrollReset } = useScroll()

  useEffect(() => {
    scrollReset()
  }, [type])

  return (
    <header css={styles.header}>
      <div css={styles.titleBox}>
        <Headline>질문하기</Headline>

        <ButtonNav onClick={() => setOpen(true)}>
          <IconQuestions height={16} width={16} />
          질문하기
        </ButtonNav>
      </div>

      <Tabs
        css={styles.tabs}
        defaultActiveKey={QuestionUser.STUDENT}
        indicator={{ align: 'center', size: 168 }}
        items={QUESTION_TABS}
        onChange={(activeKey) => {
          setType(activeKey)
          fetchData(activeKey as QuestionUser)
        }}
      />

      <DrawerQuestionCreate open={open} onClose={() => setOpen(false)} />
    </header>
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

export default QuestionHeader
