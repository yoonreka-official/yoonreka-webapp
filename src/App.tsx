import { ConfigProvider as ThemeProvider } from 'antd'
import { Suspense } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import '~/assets/styles/global.css'

import { RouterProvider } from 'react-router-dom'

import Spinner from '~/components/utils/Spinner.tsx'
import antDesignTheme from '~/configs/antDesignTheme.ts'
import { ApolloProvider } from '~/plugins/apollo/ApolloProvider.tsx'
import { router } from '~/routes.tsx'
import { store } from '~/stores'

function App() {
  return (
    <ApolloProvider>
      <ReduxProvider store={store}>
        <ThemeProvider theme={antDesignTheme}>
          <Suspense fallback={<Spinner fullScreen />}>
            <RouterProvider router={router} />
          </Suspense>
        </ThemeProvider>
      </ReduxProvider>
    </ApolloProvider>
  )
}

export default App
