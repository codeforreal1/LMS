import React from 'react'
import { Navbar as Nav, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import Link from 'next/link'

import Button from '@/components/Button'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LogoGradientSVG from '@/assets/images/logo-gradient.svg'

const LogoGradient = LogoGradientSVG as React.FC<React.SVGProps<SVGElement>>

function Navbar() {
  return (
    <>
      <Nav
        shouldHideOnScroll
        maxWidth={'full'}
        className="px-8 lg:px-16 xl:px-24 max-w-2xl"
        classNames={{
          wrapper: 'px-0',
          base: 'mx-auto',
        }}
      >
        <NavbarContent className="sm:flex gap-4" justify="center">
          <Link href="/">
            <LogoGradient width="40" height="40" />
          </Link>
          <div className="mx-2" />
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} href="/login">
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Nav>
    </>
  )
}

export default Navbar
