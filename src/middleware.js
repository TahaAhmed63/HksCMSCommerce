// middleware.js
import { NextResponse } from 'next/server';
import { verifyJWT } from './app/lib/token'; // Adjust this path to where you defined verifyJWT

export async function middleware(req) {
  // Retrieve the token from cookies
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // Redirect to the login page if no token is found
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  try {
    // Verify the token
    const decodedToken = await verifyJWT(token);

    // If the token is invalid, redirect to login
    if (!decodedToken) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // If token is valid, allow the request to continue
  return NextResponse.next();
}

// Configuration to specify which routes should use this middleware
export const config = {
  matcher: ['/about/:path*', '/deshboard/:path*'],
}