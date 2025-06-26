import { NextResponse } from "next/server";
import { auth } from "./auth";
import { Token } from "./constant/token";

export async function middleware(req) {
  const session = await auth();
  const exitsToken = await Token(); // Check token validity
  const pathname = req.nextUrl.pathname;

  // Define protected routes that authenticated users should not access
  const restrictedRoutes = ["/login", "/register", "/forgot-password", "/otp"];

  // Skip protection for the specific guestuser route
  if (pathname.match(/^\/dashboard\/[^\/]+\/[^\/]+\/guestuser$/)) {
    return NextResponse.next(); // Allow the request to proceed without protection
  }

  // If user is authenticated (has session or valid token)
  if (session?.user || exitsToken?.Credential) {
    // Check if the requested route is in restricted routes
    if (restrictedRoutes.includes(pathname)) {
      // Redirect authenticated users to a safe route, e.g.,
      return NextResponse.redirect(new URL("/", req.url));
    }
    // Allow access to other routes for authenticated users
    return NextResponse.next();
  }

  // If user is not authenticated, redirect to login for protected routes
  if (
    pathname.startsWith("/workspace") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile")
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow unauthenticated users to access non-protected routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/workspace/:path*",

    "/dashboard/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/otp",
  ],
};
