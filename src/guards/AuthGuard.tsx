import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import Spinner from '~/components/utils/Spinner.tsx'
import { useAppDispatch, useAppSelector } from '~/stores'
import { fetchMe } from '~/stores/AuthSlice.ts'
import { setToken as setApolloToken } from '~/utils/apollo.util.ts'
import { getCookie } from '~/utils/cookie.util.ts'

import type { PropsWithChildren } from 'react'

import type { RootState } from '~/stores'

function AuthGuard({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch()

  const { authUser, isLoading } = useAppSelector(
    (state: RootState) => state.auth,
  )

  const navigate = useNavigate()

  const accessToken = getCookie('accessToken')

  useEffect(() => {
    ;(async () => {
      // ? authUser 가 존재하면 이미 로그인한 것이
      if (authUser) return

      if (!accessToken) {
        navigate('/auth/login')
        return
      }

      setApolloToken(accessToken)
      await dispatch(fetchMe())
    })()
  }, [])

  if (isLoading) return <Spinner fullScreen />

  return authUser ? children : <Navigate to="/auth/login" />
}

export default AuthGuard
