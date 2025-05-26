import { Suspense } from 'react'

import CardBase from '~/components/cards/CardBase.tsx'
import GradeTotalTabContent from '~/pages/grades/GradeTotalTabContent.tsx'
import GradeTotalTabFilters from '~/pages/grades/GradeTotalTabFilters.tsx'

function GradeTotalTab() {
  return (
    <CardBase>
      <GradeTotalTabFilters />

      <Suspense fallback={<div />}>
        <GradeTotalTabContent />
      </Suspense>
    </CardBase>
  )
}

export default GradeTotalTab
