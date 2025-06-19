"use server";
import { auth } from "@/auth";
/*
 * retrive token
 */
export const Token = async () => {
 const session = await auth();

  if (!session) {
    console.log("⚠️ No session found");
    return { Credential: null, GoogleDocumentToken: null };
  }

  const UserToken = {
    Credential: session?.user?.backendToken || null,
    GoogleDocumentToken: session?.accessToken || null,
  };

  console.log("rrrr", UserToken);
  return UserToken;
};
