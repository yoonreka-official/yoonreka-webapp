import { useNavigate } from 'react-router-dom'

import {
  signIn,
  signOut,
  updateAuthUser,
  withdrawUser,
} from '~/api/auth.api.ts'
import useFcmToken from '~/configs/useFcmToken.tsx'
import useLoading from '~/hooks/useLoading.ts'
import { useAppDispatch, useAppSelector } from '~/stores'
import { fetchMe, setNotificationConfig } from '~/stores/AuthSlice.ts'
import { setToken } from '~/utils/apollo.util.ts'
import { getCookie, removeCookie } from '~/utils/cookie.util.ts'
import dialog from '~/utils/dialog.util.tsx'

import { useApolloHelper } from '~/plugins/apollo/context'
import type { LoginInput, UpdateUserBody } from '~/types/auth.type.ts'

const useAuth = () => {
  const state = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const { setToken: apolloSetToken } = useApolloHelper()

  const navigate = useNavigate()

  const { toggleLoading } = useLoading()

  const { getFcmTokenData } = useFcmToken()

  const fetchAuthUser = () => {
    return dispatch(fetchMe()).unwrap()
  }

  const handleLogin = async (body: LoginInput) => {
    toggleLoading(true)

    const { fcmToken, deviceType, userAgent } = getFcmTokenData()

    try {
      await signIn({
        ...body,
        token: fcmToken || undefined,
        deviceType: deviceType || undefined,
        userAgent,
      })

      toggleLoading(false)
      navigate('/', { replace: true })
    } catch (e) {
      await dialog.message({
        title: '핸드폰 번호/비밀번호 오류',
        content: (
          <>
            핸드폰 번호 또는 비밀번호가 잘못 되었습니다.
            <br />
            핸드폰 번호와 비밀번호를 정확히 입력해 주세요.
          </>
        ),
      })

      toggleLoading(false)
    }
  }

  const handleUpdate = async (body: UpdateUserBody) => {
    // toggleLoading(true);

    try {
      await updateAuthUser(body)
      dispatch(setNotificationConfig(body))
      // toggleLoading(false);
    } catch (e) {
      console.log(e)
      // toggleLoading(false);
    }
  }

  const resetToken = () => {
    removeCookie('accessToken')
    removeCookie('refreshToken')
    setToken(undefined)
    apolloSetToken(null)
  }

  const handleLogout = async () => {
    const confirm = await dialog.confirm({
      title: '정말 로그아웃 하시겠습니까?',
      content: '로그아웃',
    })
    if (!confirm) return

    const accessToken = getCookie('accessToken')
    if (!accessToken) return

    toggleLoading(true)
    try {
      await signOut(accessToken)
      resetToken()
      window.location.replace('/')
    } catch (e) {
      console.log(e)
      toggleLoading(false)
    }
  }

  const handleWithdraw = async () => {
    const confirm = await dialog.confirm({
      title: '정말 탈퇴하시겠습니까?',
      content: '회원 탈퇴시 수업 및 성적 정보 복구가 안될 수 있습니다.',
      danger: true,
    })
    if (!confirm) return

    toggleLoading(true)
    try {
      await withdrawUser()
      resetToken()
      window.location.replace('/')
    } catch (e) {
      console.log(e)
      toggleLoading(false)
    }
  }

  return {
    state,
    fetchAuthUser,
    handleLogin,
    handleUpdate,
    handleLogout,
    handleWithdraw,
  }
}

export default useAuth
