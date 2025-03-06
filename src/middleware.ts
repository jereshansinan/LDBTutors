import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes (accessible without logging in)
const isPublicRoute = createRouteMatcher([
  '/',            
  '/about',       
  '/services',    
  '/contact',     
  '/members', 
  '/sign-in(.*)',     
]);

// Define protected routes that require authentication
const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isCoachRoute = createRouteMatcher(['/coach(.*)']);
const isClientRoute = createRouteMatcher(['/client(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Allow access to public pages without authentication
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Protect admin routes (ensure only admins can access)
  if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'admin') {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  // Protect coach routes (ensure only coaches can access)
  if (isCoachRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'coach') {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  // Allow anyone with a registered account (but not an admin or coach) to access the client dashboard
  if (isClientRoute(req)) {
    const role = (await auth()).sessionClaims?.metadata?.role;

    // If there's no role (not signed in or role is undefined) OR the role is 'admin' or 'coach', redirect to home
    if (role === 'admin' || role === 'coach') {
      const url = new URL('/', req.url); // Redirect to home or another appropriate page
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});


export const config = {
  matcher: [
    // Apply middleware to all pages except static files, unless explicitly allowed
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)', // Always run for API routes
  ],
};