import type { Metadata } from 'next'
import './globals.css'

import { mergeClasses } from '@/utils/tailwind'
import UIProvider from '../../providers/UIProvider'
import ThemeProvider from '../../providers/ThemeProvider'
import { combinedFontVariables, Poppins } from '../../assets/fonts'
import Head from './Head'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head />
      <body
        className={mergeClasses([
          `${Poppins.className} ${combinedFontVariables}`,
        ])}
      >
        <ThemeProvider>
          <UIProvider>{children}</UIProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Code For',
    description: 'Learning Management System created by Code For Real.',
  }
}
