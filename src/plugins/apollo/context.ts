'use client'

import { createContext, useContext } from 'react'

export interface ApolloHelperContext {
  getToken(): string | null
  setToken(token: string | null): void
}

export const ApolloHelperContext = createContext<ApolloHelperContext | null>(
  null,
)

export function useApolloHelper() {
  const context = useContext(ApolloHelperContext)
  if (!context) {
    throw new Error(
      '[auth]: `useApolloHelper` must be wrapped in a <ApolloProvider />',
    )
  }
  return context
}
