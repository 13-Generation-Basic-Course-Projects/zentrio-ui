"use server";
import { auth } from "@/auth";

export const Token = async () => {
  const session = await auth();
  
  if (!session) {
    console.log("⚠️ No session found");
    return { Credential: null, GoogleDocumentToken: null };
  }
  
  // Check for token refresh errors
  if (session.error === "RefreshAccessTokenError") {
    console.log("❌ Token refresh failed - user may need to re-authenticate");
    // Handle this case - maybe redirect to login
  }
  
  const UserToken = {
    Credential: session?.user?.backendToken || null,
    GoogleDocumentToken: session?.accessToken || null,
  };
  
  console.log("✅ Access token retrieved:", UserToken.GoogleDocumentToken ? "Present" : "Missing");
  
  return UserToken;
};