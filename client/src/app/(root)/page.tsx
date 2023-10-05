import React from 'react'
import Link from 'next/link'

import Navbar from '@/ui/Navbar'
import Hero from './(Hero)/index'

function RootPage() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  )
  // return <Link href="login">Login</Link>
}

export default RootPage
