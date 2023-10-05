import React from 'react'
import { ApolloProvider as ApolloClientProvider } from '@apollo/client'

import client from '../apollo'

interface ApolloProviderProps {
  children: React.ReactNode
}

function ApolloProvider({ children }: ApolloProviderProps) {
  return <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
}

interface WrappedComponentExtraProps {
  client: typeof client
}

export function withApolloProvider<T>(
  WrappedComponent: React.FC<T & WrappedComponentExtraProps>
) {
  const NewComponent = function (...props: T[]) {
    return (
      <ApolloProvider>
        <WrappedComponent {...(props as T)} client={client} />
      </ApolloProvider>
    )
  }

  NewComponent.displayName = `withApolloProvider${WrappedComponent.displayName}`

  return NewComponent
}

export default ApolloProvider
