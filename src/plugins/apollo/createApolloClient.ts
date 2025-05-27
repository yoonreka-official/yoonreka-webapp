import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

export function createApolloClient(
  getToken: () => Promise<string | null>,
  getHeaders?: () => Promise<Record<string, string>>,
  defaultOptions?: DefaultOptions,
) {
  const authLink = setContext(async (_, { headers }) => {
    const token = await getToken()
    return {
      headers: {
        ...headers,
        ...(await getHeaders?.()),
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    }
  })
  const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_API_URL}/graphql`,
    fetch,
  })

  const link = authLink.concat(httpLink)
  const cache = new InMemoryCache()
  return new ApolloClient({
    link,
    cache,
    defaultOptions,
  })
}
