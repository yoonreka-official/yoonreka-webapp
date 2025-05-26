import { css } from '@emotion/react'

import ImageProfile from '~/assets/images/login/img_login_profile.png'
import ImageLogo from '~/assets/images/login/img_logo.png'
import Flex from '~/components/display/Flex.tsx'

function LoginHeader() {
  return (
    <header css={styles.header}>
      <Flex direction="column" gap={19} items="center">
        <img alt="profile" css={styles.profile} src={ImageProfile} />
        <img alt="logo" css={styles.logo} src={ImageLogo} />
      </Flex>
    </header>
  )
}

const styles = {
  header: css`
    padding-top: 36px;
    padding-bottom: 48px;
  `,

  profile: css`
    width: 177px;
  `,

  logo: css`
    width: 183px;
  `,
}

export default LoginHeader
