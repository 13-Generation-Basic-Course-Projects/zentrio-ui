import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {
  loginGoogleService,
  loginZentrioCredentailService,
} from "./service/auth.service";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const res = await loginZentrioCredentailService({ email, password });
        if (res?.success === false) return null;
        return res;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "openid email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
  // Google
  if (account?.provider === "google") {
    token.idToken = account.id_token;
    token.accessToken = account.access_token;
    token.refreshToken = account.refresh_token;

    try {
      const backendResponse = await loginGoogleService({
        idToken: account.id_token,
      });

      if (backendResponse?.success) {
        token.backendToken = backendResponse.payload.token;
      }
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  }

  // Credentials
  if (account?.provider === "credentials" && user) {
    token.backendToken = user?.payload?.token;
    token.email = user?.payload?.email;
  }

  return token;
}
,

    async session({ session, token }) {
      console.log("SESSION CALLBACK", token);
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        backendToken: token.backendToken,
      };
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
