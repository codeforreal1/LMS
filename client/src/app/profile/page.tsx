import React from 'react'

import apolloClient from '.././../apollo'
import { GET_USER } from '@/apollo/queries/user'

import Navbar from '@/ui/Navbar'

async function Profile(...args: any[]) {
  try {
    const { data } = await apolloClient.query({
      query: GET_USER,
      variables: {
        id: 1,
      },
    })

    const user = data?.getUser?.data

    return <pre>{!(user == null) ? JSON.stringify(data, null, 2) : null}</pre>
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

//   const user = data?.getUser?.data

//   return !(user == null) ? <code>{JSON.stringify(user, null, 2)}</code> : null
// }

// export default withApolloProvider(Profile)
