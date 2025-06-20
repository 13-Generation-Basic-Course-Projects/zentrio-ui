import { NextResponse } from "next/server";
import { auth } from "./auth";
import { Token } from "./constant/token";

export async function middleware(req) {
  const session = await auth();
  const exitsToekn = await Token();
  //const validToken = exitsToekn.Credential;
  // Extract pathname from req.nextUrl
  const pathname = req.nextUrl.pathname;
  // Skip protection for the specific guestuser route
  if (pathname.match(/^\/dashboard\/[^\/]+\/[^\/]+\/guestuser$/)) {
    return NextResponse.next(); // Allow the request to proceed without protection
  }
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/workspace/:path*", "/dashboard/:path*"],
};
