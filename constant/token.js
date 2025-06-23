"use server";
import { auth } from "@/auth";

export const Token = async () => {
  const session = await auth();
  
  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log("🔍 Session debug:", {
      hasSession: !!session,
      hasAccessToken: !!session?.accessToken,
      hasBackendToken: !!session?.backendToken,
      sessionKeys: session ? Object.keys(session) : [],
      userKeys: session?.user ? Object.keys(session.user) : [],
      debug: session?.debug
    });
  }
  
  const UserToken = {
    Credential: session?.backendToken 
      ? session.backendToken 
      : session?.token?.user?.payload?.token,
    GoogleDocumentToken: session?.accessToken 
      ? session.accessToken 
      : null,
  };
  
  return UserToken;
};