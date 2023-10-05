'use client'

import React from 'react'
import { Input } from '@nextui-org/input'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'

import Button from '@/components/Button'
import { LOGIN } from '@/apollo/mutations/authentication'
import { setAuthUser } from '../../../reducers/auth/action'
import { withApolloProvider } from '@/providers/ApolloProvider'

interface LoginFields {
  email: string
  password: string
}

function LoginForm() {
  const router = useRouter()
  const [loginFields, setLoginFields] = React.useState<LoginFields>({
    email: '',
    password: '',
  })

  const [login, { loading }] = useMutation(LOGIN)

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()

    try {
      const { data } = await login({
        variables: { email: loginFields.email, password: loginFields.password },
      })

      console.log('LOGIN DATA', data)
      const isSuccess = data?.login?.success
      if (!isSuccess) {
        throw new Error()
      }

      const user = data?.login?.data as {
        id: number
        uuid: string
      }
      if (user == null) {
        throw new Error()
      }
      setAuthUser({ id: user?.id, uuid: user?.uuid })
      router.replace('/profile')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className="h-screen w-full flex justify-center items-center"
      onSubmit={handleSubmit}
    >
      <section className="max-w-xl p-5">
        <h1 className="text-3xl mb-5">Login</h1>
        <div className="my-5">
          <label htmlFor="email">Email</label>
          <Input
            name="email"
            id="email"
            type="email"
            isRequired
            className="my-2"
            value={loginFields.email}
            onChange={(evt) => {
              setLoginFields((previousState) => ({
                ...previousState,
                email: evt.target?.value,
              }))
            }}
          />
        </div>
        <div className="my-5">
          <label htmlFor="password">Password</label>
          <Input
            name="password"
            id="password"
            type="password"
            isRequired
            className="my-2"
            value={loginFields.password}
            onChange={(evt) => {
              setLoginFields((previousState) => ({
                ...previousState,
                password: evt.target?.value,
              }))
            }}
          />
        </div>
        <Button type="submit" isDisabled={loading}>
          {!loading ? 'Login' : 'Please wait...'}
        </Button>
      </section>
    </form>
  )
}

export default withApolloProvider(LoginForm)
