"use server";
import { auth } from "@/auth";

export const Token = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }
  // const UserToken = {
  //   Credential: session.backendToken || null,
  //   GoogleDocumentToken: session.googleAuth?.accessToken ?  session.googleAuth?.accessToken : null,
  // }; fong old

  const UserToken = {
    Credential: (() => {
      if (
        typeof session?.backendToken === "string" &&
        session.backendToken.trim().length > 0
      ) {
        return session.backendToken;
      }
      if (
        typeof session?.googleAuth?.accessToken === "string" &&
        session.googleAuth.accessToken.trim().length > 0
      ) {
        return session.googleAuth.accessToken;
      }
      return null;
    })(),
    GoogleDocumentToken:
      typeof session?.googleAuth?.accessToken === "string" &&
      session.googleAuth.accessToken.trim().length > 0
        ? session.googleAuth.accessToken
        : null,
  };
  return UserToken;
};

