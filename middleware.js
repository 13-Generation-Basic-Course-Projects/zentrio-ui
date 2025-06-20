import { NextResponse } from "next/server";
import { auth } from "./auth";
import { Token } from "./constant/token";

export async function middleware(req) {
  const session = await auth();
  const exitsToekn = await Token();
  //const validToken = exitsToekn.Credential;
  //console.log("aaaaaaaaaa", session);
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  // Optional: Check for basic token presence but don't refresh
  if (session?.error === "RefreshAccessTokenError") {
    // Token refresh failed, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/workspace/:path*", "/dashboard/:path*"],
};
