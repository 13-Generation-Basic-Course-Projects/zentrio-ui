import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {
  loginGoogleService,
  loginZentrioCredentailService,
} from "./service/auth.service";

// Move the refresh function outside and fix the import path
export async function refreshGoogleAccessToken(refreshToken) {
  console.log("🔄 Attempting to refresh Google access token...");
  
  try {
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

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error("❌ Token refresh failed:", {
        status: response.status,
        statusText: response.statusText,
        error: responseData
      });
      throw new Error(`Failed to refresh access token: ${response.status} - ${responseData.error || responseData.error_description || 'Unknown error'}`);
    }

    console.log("✅ Token refresh successful:", {
      hasAccessToken: !!responseData.access_token,
      expiresIn: responseData.expires_in,
      hasRefreshToken: !!responseData.refresh_token,
      tokenType: responseData.token_type
    });

    return responseData;
  } catch (error) {
    console.error("❌ Token refresh error:", error);
    throw error;
  }
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
      // First time login with Google
      if (account?.provider === "google") {
        console.log("🔐 Initial Google login - setting tokens");
        console.log("Account expires_at:", account.expires_at, "Current time:", Math.floor(Date.now() / 1000));
        
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        // account.expires_at is already an absolute timestamp in seconds
        token.accessTokenExpires = account.expires_at * 1000;
        token.provider = "google";
        
        console.log("📅 Google token expires at:", new Date(token.accessTokenExpires));
        console.log("🕐 Current time:", new Date());
        console.log("⏰ Time until expiry:", Math.round((token.accessTokenExpires - Date.now()) / 1000 / 60), "minutes");
        
        try {
          const backendResponse = await loginGoogleService({
            idToken: account.id_token,
          });

          if (backendResponse?.success) {
            token.backendToken = backendResponse.payload.token;
            console.log("🎫 Backend token obtained");
          }
        } catch (error) {
          console.error("❌ Google login error:", error.message);
        }
        
        return token;
      }

      // Credentials login
      if (account?.provider === "credentials" && user) {
        token.backendToken = user?.payload?.token;
        token.email = user?.payload?.email;
        token.provider = "credentials";
        console.log("🔑 Credentials login - backend token set");
        return token;
      }

      // Only attempt to refresh Google tokens
      if (token.provider === "google" && token.accessToken && token.refreshToken && token.accessTokenExpires) {
        const now = Date.now();
        const expiresAt = token.accessTokenExpires;
        const timeUntilExpiry = Math.round((expiresAt - now) / 1000 / 60);
        const shouldRefresh = now > (expiresAt - 5 * 60 * 1000); // 5 minutes before expiry
        
        console.log("🔍 Token refresh check:", {
          now: new Date(now).toISOString(),
          expiresAt: new Date(expiresAt).toISOString(),
          timeUntilExpiry: timeUntilExpiry + " minutes",
          shouldRefresh,
          hasRefreshToken: !!token.refreshToken
        });
        
        if (shouldRefresh && token.refreshToken) {
          console.log("🔄 Refreshing Google access token (expires in " + timeUntilExpiry + " minutes)...");
          try {
            const refreshed = await refreshGoogleAccessToken(token.refreshToken);
            
            if (refreshed.access_token) {
              const newExpiresAt = Date.now() + (refreshed.expires_in * 1000);
              console.log("✅ Token refreshed successfully!");
              console.log("📅 New expiry:", new Date(newExpiresAt).toISOString());
              console.log("⏰ Valid for:", refreshed.expires_in / 60, "minutes");
              
              return {
                ...token,
                accessToken: refreshed.access_token,
                accessTokenExpires: newExpiresAt,
                refreshToken: refreshed.refresh_token || token.refreshToken,
                error: undefined,
              };
            } else {
              throw new Error("No access_token in refresh response");
            }
          } catch (err) {
            console.error("❌ Failed to refresh access token:", err.message);
            return {
              ...token,
              error: "RefreshAccessTokenError",
            };
          }
        } else if (shouldRefresh && !token.refreshToken) {
          console.warn("⚠️ Token expired but no refresh token available");
          return {
            ...token,
            error: "RefreshTokenMissing",
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
      
      // Only include Google access token if it exists and is valid
      if (token.accessToken && !token.error && token.provider === "google") {
        session.accessToken = token.accessToken;
        session.googleTokenExpires = token.accessTokenExpires;
      }
      
      if (token.error) {
        session.error = token.error;
        console.warn("⚠️ Session has token error:", token.error);
      }
      
      // Add debug info (remove in production)
      if (process.env.NODE_ENV === 'development') {
        session.debug = {
          provider: token.provider || 'unknown',
          hasGoogleToken: !!token.accessToken && token.provider === "google",
          hasBackendToken: !!token.backendToken,
          googleTokenExpires: token.accessTokenExpires ? new Date(token.accessTokenExpires) : null,
          hasRefreshToken: !!token.refreshToken,
          timeUntilGoogleExpiry: token.accessTokenExpires ? 
            Math.round((token.accessTokenExpires - Date.now()) / 1000 / 60) : null,
          tokenError: token.error
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