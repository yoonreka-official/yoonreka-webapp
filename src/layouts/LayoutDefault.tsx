import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

import Spinner from '~/components/utils/Spinner.tsx'
import BottomNavigation from '~/layouts/BottomNavigation.tsx'
import { useAppSelector } from '~/stores'

function LayoutDefault() {
  const isLoading = useAppSelector((state) => state.layout.isLoading)
  return (
    <div css={styles.screen}>
      <main css={styles.main}>
        <Outlet />
      </main>

      <BottomNavigation />

      {isLoading && <Spinner fullScreen />}
    </div>
  )
}

const styles = {
  screen: css`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  `,

  main: css`
    height: 100%;
  `,
}

export default LayoutDefault
