import React from 'react'

import apolloClient from '.././../apollo'
import { MY_PROFILE } from '@/apollo/queries/user'

import Navbar from '@/ui/Navbar'
import Upgrade from './Upgrade'

async function Profile(...args: any[]) {
  try {
    const { data } = await apolloClient.query({
      query: MY_PROFILE,
    })

    const user = data?.myProfile?.data

    return (
      <pre>{!(user == null) ? JSON.stringify(data ?? {}, null, 2) : null}</pre>
    )
  } catch (error) {
    console.log('---', error)
    return <p>Oops...</p>
  }
}

export default function Test() {
  return (
    <div>
      <Navbar />
      <Profile />
      <Upgrade />
    </div>
  )
}

// 'use client'

// import React from 'react'
// import { useQuery } from '@apollo/client'

// import { withApolloProvider } from '@/providers/ApolloProvider'
// import { MY_PROFILE } from '@/apollo/queries/user'

// function Profile() {
//   const { data } = useQuery(MY_PROFILE)

//   const user = data?.myProfile?.data

//   return !(user == null) ? <pre>{JSON.stringify(user, null, 2)}</pre> : null
// }

// export default withApolloProvider(Profile)
