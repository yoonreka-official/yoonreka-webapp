import { ApolloProvider as OriginApolloProvider } from '@apollo/client'
import { ReactNode, useMemo, useRef } from 'react'

import { ApolloHelperContext } from './context'
import { createApolloClient } from './createApolloClient'

export interface ApolloProviderProps {
  children: ReactNode
}

export function ApolloProvider({ children }: ApolloProviderProps) {
  const accessToken = useRef<string | null>(null)

  const client = useMemo(
    () => createApolloClient(() => Promise.resolve(accessToken.current)),
    [],
  )

  const contextValue = useMemo<ApolloHelperContext>(() => {
    return {
      getToken() {
        return accessToken.current
      },
      setToken(token: string | null) {
        accessToken.current = token
      },
    }
  }, [])

  return (
    <ApolloHelperContext.Provider value={contextValue}>
      <OriginApolloProvider client={client}>{children}</OriginApolloProvider>
    </ApolloHelperContext.Provider>
  )
}
