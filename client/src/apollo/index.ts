import { ApolloClient, InMemoryCache } from '@apollo/client'

import links from './links'

const isServer = typeof window === 'undefined'

const client = new ApolloClient({
  link: links,
  cache: new InMemoryCache(),
  ssrMode: isServer,
  ...(isServer
    ? {
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'no-cache',
          },
          query: {
            fetchPolicy: 'no-cache',
          },
          mutate: {
            fetchPolicy: 'no-cache',
          },
        },
      }
    : {}),
})

export default client
