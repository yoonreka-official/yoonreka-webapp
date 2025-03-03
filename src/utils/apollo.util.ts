import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import type { DefaultOptions } from '@apollo/client';

export const makeLink = (
  token?: string,
  getHeaders?: () => Promise<Record<string, string>>,
) => {
  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        ...(await getHeaders?.()),
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    };
  });

  const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_API_URL}/graphql`,
    fetch,
  });

  return authLink.concat(httpLink);
};

export const createApolloClient = (
  token?: string,
  getHeaders?: () => Promise<Record<string, string>>,
  defaultOptions?: DefaultOptions,
) => {
  const cache = new InMemoryCache();
  return new ApolloClient({
    link: makeLink(token, getHeaders),
    cache,
    defaultOptions,
  });
};

export const appolo = createApolloClient();

export const setToken = (token?: string) => {
  appolo.setLink(makeLink(token));
};
