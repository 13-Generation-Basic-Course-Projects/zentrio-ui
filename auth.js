import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {
  loginGoogleService,
  loginZentrioCredentailService,
} from "./service/auth.service";

// ✅ ADDED: Utility function to decode JWT token
function decodeJWT(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

// ✅ ADDED: Check if token is expired
function isTokenExpired(token) {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  return now >= decoded.exp;
}

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

        console.log("Backend response:", res); // Debug log

        if (!res?.success) {
          return null;
        }

        // ✅ FIXED: Work with backend's current response format
        // Backend only returns { success: true, payload: { token: "..." } }
        // Extract user info from JWT token and use credentials

        const backendToken = res.payload.token;
        const decodedToken = decodeJWT(backendToken);

        console.log("Decoded backend token:", decodedToken); // Debug log

        return {
          id: decodedToken?.sub || email, // Use JWT subject or email as ID
          email: decodedToken?.sub || email, // JWT subject is usually email
          backendToken: backendToken,
          username: email.split("@")[0], // Generate username from email
          provider: "credentials",
          // Add any other fields from the JWT if available
          exp: decodedToken?.exp,
          iat: decodedToken?.iat,
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
          scope: "openid email profile https://www.googleapis.com/auth/drive",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      console.log(
        "JWT callback - token:",
        token,
        "account:",
        account,
        "user:",
        user
      ); // Debug log

      // ✅ FIXED: Handle Credentials login properly
      if (user && user.provider === "credentials") {
        token.id = user.id;
        token.email = user.email;
        token.backendToken = user.backendToken;
        token.username = user.username;
        token.provider = "credentials";

        console.log("Credentials login - token after update:", token); // Debug log
        return token;
      }

      // Handle Google login
      if (account && account.provider === "google") {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.scopes = account.scope;
        token.provider = "google";

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

      // ✅ FIXED: Handle token refresh for both Google and backend tokens
      if (token.provider === "google" && token.accessToken && token.expiresAt) {
        const now = Math.floor(Date.now() / 1000);
        if (now >= token.expiresAt - 300) {
          try {
            const refreshedTokens = await refreshGoogleAccessToken(
              token.refreshToken
            );
            token.accessToken = refreshedTokens.access_token;
            token.expiresAt = now + refreshedTokens.expires_in;
            if (refreshedTokens.refresh_token) {
              token.refreshToken = refreshedTokens.refresh_token;
            }
          } catch (error) {
            console.error("Error refreshing access token:", error);
          }
        }
      }

      // ✅ ADDED: Check if backend token is expired for credentials login
      if (token.provider === "credentials" && token.backendToken) {
        if (isTokenExpired(token.backendToken)) {
          console.warn("Backend token is expired. User needs to re-login.");
          // You could implement auto-refresh here if your backend supports it
          // For now, we'll let the API calls handle expired tokens
        }
      }

      return token;
    },

    async session({ session, token }) {
      console.log("Session callback - token:", token); // Debug log

      // ✅ FIXED: Properly structure session object
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
      };

      // ✅ FIXED: Always include backendToken for API calls
      session.backendToken = token.backendToken;

      // ✅ FIXED: Only include Google auth data for Google logins
      if (token.provider === "google") {
        session.googleAuth = {
          accessToken: token.accessToken,
          idToken: token.idToken,
          refreshToken: token.refreshToken,
          expiresAt: token.expiresAt,
          scopes: token.scopes,
        };
      } else {
        session.googleAuth = {}; // Empty object for non-Google logins
      }

      console.log("Final session:", session); // Debug log
      return session;
    },

    async signIn({ user, account, profile }) {
      return true;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log("User signed in:", {
        user: user.email,
        provider: account?.provider,
      });
    },
    async signOut({ token }) {
      console.log("User signed out:", token?.email);
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
