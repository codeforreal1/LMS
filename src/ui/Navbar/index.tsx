'use client'

import React from 'react'
import { Navbar as Nav, NavbarContent, NavbarItem } from '@nextui-org/navbar'

import Button from '@/components/Button'
import Link from '@/components/Link'
import Layout from '@/components/Layout'
import LogoGradientSVG from '@/assets/images/logo-gradient.svg'

const LogoGradient = LogoGradientSVG as React.FC<React.SVGProps<SVGElement>>

function Navbar() {
  return (
    <>
      <Layout>
        <Nav
          shouldHideOnScroll
          maxWidth="full"
          className="px-8 lg:px-16 xl:px-24"
          classNames={{
            wrapper: 'px-0',
          }}
        >
          <NavbarContent className="sm:flex gap-4" justify="center">
            <Link href="/">
              <LogoGradient width="40" height="40" />
            </Link>
            <div className="mx-2" />
            {/* <NavbarItem>
              <Link color="foreground" href="/">
                Home
              </Link>
            </NavbarItem> */}
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button>Login</Button>
            </NavbarItem>
          </NavbarContent>
        </Nav>
      </Layout>
    </>
  )
}

export default Navbar
