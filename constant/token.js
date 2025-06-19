"use server";
import { auth } from "@/auth";
/*
 * retrive token
 */
export const Token = async () => {
  const session = await auth();
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
