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
      // First time login
      if (account?.provider === "google") {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        // Fix: account.expires_at is already an absolute timestamp in seconds
        token.accessTokenExpires = account.expires_at * 1000;

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

      // Credentials login
      if (account?.provider === "credentials" && user) {
        token.backendToken = user?.payload?.token;
        token.email = user?.payload?.email;
      }

      // Check if we have the necessary tokens for refresh
      if (!token.accessToken || !token.refreshToken || !token.accessTokenExpires) {
        return token;
      }


      // Refresh access token if expired (check 5 minutes before actual expiry)
      const shouldRefresh = Date.now() > (token.accessTokenExpires - 5 * 60 * 1000);
      
      // TEMPORARY: Force refresh if token seems to be from future (incorrect calculation)
      const tokenSeemsIncorrect = token.accessTokenExpires > Date.now() + (24 * 60 * 60 * 1000); // More than 24 hours
      
      if (tokenSeemsIncorrect) {
        console.log("Detected incorrect token expiration, forcing refresh...");
      }
      
      if (shouldRefresh || tokenSeemsIncorrect) {
        console.log("Refreshing access token...");
        try {
          const refreshed = await refreshGoogleAccessToken(token.refreshToken);
          
          return {
            ...token,
            accessToken: refreshed.access_token,
            accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
            refreshToken: refreshed.refresh_token || token.refreshToken,
            error: undefined, // Clear any previous errors
          };
        } catch (err) {
          console.error("Failed to refresh access token:", err);
          return {
            ...token,
            error: "RefreshAccessTokenError",
          };
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        backendToken: token.backendToken,
      };
      session.accessToken = token.accessToken;
      session.error = token.error;
      
      // Add debug info (remove in production)
      if (process.env.NODE_ENV === 'development') {
        session.debug = {
          tokenExpires: new Date(token.accessTokenExpires),
          hasRefreshToken: !!token.refreshToken,
          timeUntilExpiry: token.accessTokenExpires ? Math.round((token.accessTokenExpires - Date.now()) / 1000 / 60) : null,
        };
      }
      
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
