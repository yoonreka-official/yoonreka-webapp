import { useEffect, useState } from 'react'

import useScroll from '~/hooks/useScroll.ts'
import Container from '~/layouts/Container.tsx'
import ScreenBase from '~/layouts/ScreenBase.tsx'
import { Invoices } from '~/pages/more/invoices'
import MoreHeader from '~/pages/more/MoreHeader.tsx'
import SchoolGrades from '~/pages/more/school-grades'

import type { MoreTabKey } from '~/pages/more/MoreHeader.tsx'

function MorePage() {
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
        {activeTab === 'invoice' ? <Invoices /> : <SchoolGrades />}
      </Container>
    </ScreenBase>
  )
}

export default MorePage
