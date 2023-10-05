import type { ObservableSubscription } from '@apollo/client'
import { ApolloLink, Observable } from '@apollo/client'

const isServer = typeof window === 'undefined'

const useToken = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    let handle: ObservableSubscription
    ;(async () => {
      if (isServer) {
        const { cookies } = await import('next/headers')
        const allCookies = cookies().getAll()
        if (allCookies.length !== 0) {
          operation.setContext({
            headers: {
              // Apply Encryption instead of stringify
              'x-cookies': JSON.stringify(
                allCookies.reduce((accumulator, currentValue) => {
                  accumulator[currentValue.name] = currentValue.value
                  return accumulator
                }, Object.create(null))
              ),
            },
          })
        }
      }

      handle = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      })
    })()

    return () => {
      if (handle) {
        handle.unsubscribe()
      }
    }
  })
})

export default useToken
