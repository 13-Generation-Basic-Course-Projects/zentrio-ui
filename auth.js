import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {
  loginGoogleService,
  loginZentrioCredentailService,
} from "./service/auth.service";

// Refresh Google access token
export async function refreshGoogleAccessToken(refreshToken) {
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Token refresh failed:", errorData);
      throw new Error(`Failed to refresh access token: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Refresh token error:", error.message);
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
        try {
          const res = await loginZentrioCredentailService({ email, password });
          if (!res?.success) {
            console.error("Credentials login failed:", res?.message);
            return null;
          }
          return {
            id: res.payload.user?.userId || res.payload.sub,
            email: res.payload.user?.email || credentials.email,
            username: res.payload.user?.username,
            backendToken: res.payload.token,
            role: res.payload.user?.role || "user",
            ...res.payload.user,
          };
        } catch (error) {
          console.error("Credentials authorize error:", error.message);
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
            "openid email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.backendToken = user.backendToken;
        token.role = user.role || "user";
      }

      if (account && account.provider === "google") {
        console.log("🔍 Google OAuth Account Debug:");
        console.log("Provider:", account.provider);
        console.log("ID Token present:", !!account.id_token);
        console.log("Access Token present:", !!account.access_token);
        console.log("Refresh Token present:", !!account.refresh_token);
        
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.scopes = account.scope;

        if (token.expiresAt && Date.now() / 1000 > token.expiresAt) {
          try {
            const refreshedTokens = await refreshGoogleAccessToken(
              token.refreshToken
            );
            token.accessToken = refreshedTokens.access_token;
            token.expiresAt =
              Math.floor(Date.now() / 1000) + refreshedTokens.expires_in;
            if (refreshedTokens.id_token)
              token.idToken = refreshedTokens.id_token;
          } catch (error) {
            console.error("Token refresh failed in JWT:", error.message);
            return null;
          }
        }

        try {
          console.log("🔍 Calling loginGoogleService with ID token...");
          const backendResponse = await loginGoogleService({
            idToken: account.id_token,
          });

          console.log("🔍 Backend response received:", backendResponse);

          if (backendResponse?.success) {
            console.log("✅ Backend login successful");
            token.backendToken = backendResponse.payload.token;
            token.id = backendResponse.payload.user?.userId || token.sub;
            token.email = backendResponse.payload.user?.email || token.email;
            token.username =
              backendResponse.payload.user?.username || token.name;
            token.role = backendResponse.payload.user?.role || "user";
          } else {
            console.error("❌ Backend login failed:", backendResponse?.message);
            console.error("Backend response details:", backendResponse);
            return null;
          }
        } catch (error) {
          console.error("❌ Error calling loginGoogleService:", error.message);
          console.error("Error details:", error);
          return null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (!token) return null;
      session.user = {
        id: token.id || token.sub,
        email: token.email,
        username: token.username,
        backendToken: token.backendToken,
        role: token.role || "user",
      };
      session.backendToken = token.backendToken;
      session.googleAuth = {
        accessToken: token.accessToken,
        idToken: token.idToken,
        refreshToken: token.refreshToken,
        expiresAt: token.expiresAt,
        scopes: token.scopes,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
