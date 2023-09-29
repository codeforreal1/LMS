import { Poppins as GooglePoppins } from 'next/font/google'
import localFont from 'next/font/local'

const Archive = localFont({ src: './Archive.otf', variable: '--font-Archive' })
const Poppins = GooglePoppins({
  weight: ['400', '500'],
  variable: '--font-Poppins',
  subsets: ['latin'],
})

const fonts = [Archive, Poppins]

export const combinedFontVariables = fonts
  .map((font) => `${font.variable}`)
  .join(' ')

export { Archive, Poppins }
