"use server";
import { auth } from "@/auth";

export const Token = async () => {
  const session = await auth();

  // if (!session) {
  //   console.log("⚠️ No session found");
  //   return { Credential: null, GoogleDocumentToken: null };
  // }

  // // Check for token refresh errors
  // if (session.error === "RefreshAccessTokenError") {
  //   console.log("❌ Token refresh failed - user may need to re-authenticate");
  //   // Handle this case - maybe redirect to login
  // }

  const UserToken = {
    Credential: session?.backendToken
      ? session.backendToken
      : session?.token?.user?.payload?.token,
    GoogleDocumentToken: session?.googleAuth?.accessToken
      ? session?.googleAuth?.accessToken
      : null,
  };

  return UserToken;
};

