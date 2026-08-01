import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET || 'braintether-secret-zen-key-2026' 
  });

  const hasDemoCookie = 
    req.cookies.has('braintether_demo_session') || 
    req.cookies.has('next-auth.session-token') || 
    req.cookies.has('__Secure-next-auth.session-token');

  const { pathname } = req.nextUrl;

  // Protected Routes requiring authentication
  const isProtectedRoute = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/profile');

  // If attempting to access protected route without valid session or demo cookie, redirect to signin
  if (isProtectedRoute && !token && !hasDemoCookie) {
    const signInUrl = new URL('/auth/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/auth/signin', '/auth/signup'],
};
