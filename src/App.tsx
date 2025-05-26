import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ConfigProvider as ThemeProvider } from 'antd'
import { Suspense } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import '~/assets/styles/global.css'

import { RouterProvider } from 'react-router-dom'

import Spinner from '~/components/utils/Spinner.tsx'
import antDesignTheme from '~/configs/antDesignTheme.ts'
import router from '~/routes.tsx'
import { store } from '~/stores'

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_API_URL}/graphql`,
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
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
