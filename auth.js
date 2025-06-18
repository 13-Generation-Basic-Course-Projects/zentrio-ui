import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
  loginGoogleService,
  loginZentrioCredentailService,
  loginZentrioService,
} from "./service/auth.service";
import Credentials from "next-auth/providers/credentials";
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
        if (res?.success == false) {
          return null;
        }
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
            "openid email profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   async jwt(token) {
  //     // if (account) {
  //     //   token.accessToken = account.access_token;
  //     //   token.refreshToken = account.refresh_token;
  //     //   token.idToken = account.id_token;
  //     // }

  //     return token;
  //   },
  callbacks: {
    async jwt({ token, account, profile }) {
      // When the user signs in with Google, `account` contains the tokens
      if (account) {
        token.idToken = account.id_token; // Store Google's id_token
        token.accessToken = account.access_token; // Optional: Store access token
        token.refreshToken = account.refresh_token; // Optional: Store refresh token

        // Call backend to authenticate with idToken
        try {
          const backendResponse = await loginGoogleService({
            accesToken: account.id_token, // Pass id_token to service
          });

          if (backendResponse?.success) {
            token.backendToken = backendResponse.payload.token; // Store backend token
          } else {
            console.error("Backend login failed:", backendResponse?.message);
          }
        } catch (error) {
          console.error("Error calling loginGoogleService:", error.message);
        }
      }

      return token;
    },
    async session(props) {
      const { token } = props;
      return token;
    },
  },
  strategy: "jwt",
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
