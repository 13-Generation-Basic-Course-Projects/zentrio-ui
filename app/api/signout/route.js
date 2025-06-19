import { NextResponse } from "next/server";

export async function GET(request) {
  // Create response to redirect to login page
  const response = NextResponse.redirect(new URL("/login", request.url));

  // Clear all cookies
  const cookies = request.headers.get("cookie")?.split(";") || [];
  cookies.forEach((cookie) => {
    const [name] = cookie.trim().split("=");
    response.headers.append(
      "Set-Cookie",
      `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly`
    );
  });

  return response;
}
