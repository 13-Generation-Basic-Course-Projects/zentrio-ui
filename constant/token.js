import { auth } from "@/auth";
/*
 * retrive token
 */
export const Token = async () => {
  const session = await auth();
  return session?.backendToken;
};
