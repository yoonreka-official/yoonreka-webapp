import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import useFcmToken from '~/configs/useFcmToken.tsx'
import { initNative } from '~/utils/app.util.ts'

function AppConfig() {
  useFcmToken()

  const navigate = useNavigate()

  useEffect(() => {
    initNative((link) => navigate(link))
  }, [])

  return <Outlet />
}

export default AppConfig
