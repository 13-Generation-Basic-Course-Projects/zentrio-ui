import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
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
        // try {
        //   const res = await loginZentrioCredentailService({ email, password });
        //   if (!res?.success) {
        //     return null;
        //   }
        //   return res;
        // } catch (err) {
        //   console.error("Login error:", err);
        //   return null;
        // }
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
  callbacks: {
    async jwt(token) {
      // if (account) {
      //   token.accessToken = account.access_token;
      //   token.refreshToken = account.refresh_token;
      //   token.idToken = account.id_token;
      // }

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
