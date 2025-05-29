import { Outlet } from 'react-router-dom'

import Spinner from '~/components/utils/Spinner.tsx'
import BottomNavigation from '~/layouts/BottomNavigation.tsx'
import { useAppSelector } from '~/stores'

export default function LayoutDefault() {
  const isLoading = useAppSelector((state) => state.layout.isLoading)

  return (
    <div className="h-screen max-w-md mx-auto relative">
      <main className="h-full">
        <Outlet />
      </main>

      <BottomNavigation />

      {isLoading && <Spinner fullScreen />}
    </div>
  )
}
