'use client'

import React from 'react'

import LoginForm from './LoginForm'
import ErrorBoundary from '@/components/ErrorBoundary'
import Navbar from '@/ui/Navbar'

function Login() {
  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <LoginForm />
      </ErrorBoundary>
    </>
  )
}

export default Login
