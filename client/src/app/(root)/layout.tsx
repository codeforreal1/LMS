import type { Metadata } from 'next'
import './globals.css'

import UIProvider from '../../providers/UIProvider'
import ThemeProvider from '../../providers/ThemeProvider'
import { combinedFontVariables, Poppins } from '../../assets/fonts'

export const metadata: Metadata = {
  title: 'Code For Real',
  description: 'Learning Management System created by Code For Real.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${Poppins.className} ${combinedFontVariables}`}>
        <UIProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </UIProvider>
      </body>
    </html>
  )
}
