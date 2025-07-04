import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {
  loginGoogleService,
  loginZentrioCredentailService,
} from "./service/auth.service";

// Move the refresh function outside and fix the import path
export async function refreshGoogleAccessToken(refreshToken) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Token refresh failed:", errorData);
    throw new Error(`Failed to refresh access token: ${response.status}`);
  }

  return await response.json();
}

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
        if (!res?.success) {
          return null;
        }
        return {
          id: res.payload.user?.userId || res.payload.sub,
          email: res.payload.user?.email || credentials.email,
          backendToken: res.payload.token,
          ...res.payload.user,
        };
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
      // Handle Credentials login
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.backendToken = user.backendToken;
        token.username = user.username || token.username;
      }

      // Handle Google login
      if (account && account.provider === "google") {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at; // Store expiration timestamp
        token.scopes = account.scope; // Store granted scopes

        try {
          const backendResponse = await loginGoogleService({
            idToken: account.id_token,
          });

          if (backendResponse?.success) {
            token.backendToken = backendResponse.payload.token;
            token.id = backendResponse.payload.user?.userId || token.sub;
            token.email = backendResponse.payload.user?.email || token.email;
            token.username =
              backendResponse.payload.user?.username || token.username;
          } else {
            console.error("Backend login failed:", backendResponse?.message);
          }
        } catch (error) {
          console.error("Error calling loginGoogleService:", error.message);
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Shape the session object
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        backendToken: token.backendToken,
      };
      session.backendToken = token.backendToken;
      session.googleAuth = {
        accessToken: token.accessToken,
        idToken: token.idToken,
        refreshToken: token.refreshToken,
        expiresAt: token.expiresAt, // Expose expiration timestamp
        scopes: token.scopes, // Expose scopes
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
// 168
