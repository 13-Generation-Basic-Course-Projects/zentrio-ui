"use server";
import { auth } from "@/auth";
/*
 * retrive token
 */
export const Token = async () => {
  const session = await auth();
  const UserToken = {
    Credential: session?.user?.backendToken || null,
    GoogleDocumentToken: session?.accessToken || null,
  };
  console.log("rrrr", UserToken)
  return UserToken;
};

