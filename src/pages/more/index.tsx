import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { BiChevronRight, BiEditAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import Flex from '~/components/display/Flex.tsx'
import Body from '~/components/typography/Body.tsx'
import Caption from '~/components/typography/Caption.tsx'
import { COLORS } from '~/configs/theme.ts'
import useScroll from '~/hooks/useScroll.ts'
import Container from '~/layouts/Container.tsx'
import ScreenBase from '~/layouts/ScreenBase.tsx'
import { Invoices } from '~/pages/more/invoices'
import MoreHeader from '~/pages/more/MoreHeader.tsx'
import SchoolGrades from '~/pages/more/school-grades'

import type { MoreTabKey } from '~/pages/more/MoreHeader.tsx'

function MorePage() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<MoreTabKey>('invoice')

  const { reset: scrollReset } = useScroll()

  useEffect(() => {
    scrollReset()
  }, [activeTab])

  return (
    <ScreenBase
      header={<MoreHeader value={activeTab} onChange={setActiveTab} />}
    >
      <Container>
        {/* 오답노트 진입 메뉴 */}
        <button
          css={styles.wrongAnswersLink}
          type="button"
          onClick={() => navigate('/wrong-answers')}
        >
          <Flex gap={10} items="center">
            <BiEditAlt color={COLORS.POINT.PRIMARY} size={22} />

            <Flex direction="column" items="flex-start">
              <Body size={14} weight="semibold">
                오답노트
              </Body>

              <Caption color={COLORS.FONT['30']} size={10}>
                틀린 문제를 다시 풀어보세요
              </Caption>
            </Flex>
          </Flex>

          <BiChevronRight color={COLORS.FONT['20']} size={20} />
        </button>

        {activeTab === 'invoice' ? <Invoices /> : <SchoolGrades />}
      </Container>
    </ScreenBase>
  )
}

const styles = {
  wrongAnswersLink: css`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 12px 14px;
    margin-bottom: 10px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0px 4px 20px 0px rgba(206, 218, 241, 0.4);
    text-align: left;
  `,
}

export default MorePage
