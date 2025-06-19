import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
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
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        try {
          const token = await loginZentrioCredentailService({
            email,
            password,
          });

          if (!token || typeof token !== "string") {
            console.error("❌ Invalid token from backend:", token);
            return null;
          }

          return {
            id: email,
            email,
            backendToken: token,
          };
        } catch (error) {
          console.error("🔴 Authorization failed:", error.message);
          return null;
        }
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
            "openid email profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user?.backendToken) {
        // for credentials login
        token.backendToken = user.backendToken;
      } else if (account?.provider === "google" && account.id_token) {
        try {
          const backendToken = await loginGoogleService(
            account.id_token,
            "GOOGLE"
          );
          token.backendToken = backendToken;
        } catch (error) {
          console.error("🔴 Google backend login failed:", error.message);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.backendToken = token.backendToken;
      console.log("session", session);
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});
