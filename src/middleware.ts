import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = '/'
  return NextResponse.redirect(url, 308)
}

export const config = {
  matcher: [
    '/blog/:path*',
    '/services/:path*',
    '/service-areas/:path*',
    '/locations/:path*',
    '/sanity-debug/:path*',
  ],
}
