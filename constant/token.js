"use server";
import { auth } from "@/auth";
/*
 * retrive token
 */
export const Token = async () => {
  const session = await auth();
  const UserToken = {
    Credential: `${session?.token?.user?.payload?.token}`,
    Google: `${session?.token?.user?.payload?.token}`,
  };
  return UserToken;
};
