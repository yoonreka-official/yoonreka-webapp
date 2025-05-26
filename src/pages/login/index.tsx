import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginForm from '~/pages/login/LoginForm.tsx'
import LoginHeader from '~/pages/login/LoginHeader.tsx'
import { getCookie } from '~/utils/cookie.util.ts'

function LoginPage() {
  const navigate = useNavigate()

  const accessToken = getCookie('accessToken')

  useEffect(() => {
    if (accessToken) {
      navigate('/', { replace: true })
    }
  }, [accessToken])

  return !accessToken ? (
    <div css={styles.container}>
      <LoginHeader />
      <LoginForm />
    </div>
  ) : null
}

const styles = {
  container: css`
    padding: 0 20px 50px;
    height: 100%;
    overflow-y: auto;
  `,
}

export default LoginPage
