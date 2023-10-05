import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // console.log(
  //   '---',
  //   req.cookies.getAll().find((cookie) => cookie.name === 'SESSION_KEY')
  // )
  // const res = NextResponse.next()
  // res.cookies.delete('SESSION_KEY')
  // res.cookies.delete('ACCESS_TOKEN')
  // return res
  // console.log('---new page', req.nextUrl.href)
}
