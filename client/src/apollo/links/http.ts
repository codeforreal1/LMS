import { createHttpLink } from '@apollo/client'

// Client
const GRAPHQL_URL_CLIENT = process.env.NEXT_PUBLIC_GRAPHQL_URL

// Server
const GRAPHQL_URL_SERVER = process.env.GRAPHQL_URL_SERVER

const isServer = typeof window === 'undefined'

const http = createHttpLink({
  credentials: 'include',
  uri: isServer ? GRAPHQL_URL_SERVER : GRAPHQL_URL_CLIENT,
  fetchOptions: {
    ...(isServer ? { cache: 'no-store' } : {}),
  },
})

export default http
