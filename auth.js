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
        const data = await res.json();
        if (res?.success === true && res?.status === "OK") {
          data.payload;
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
  callbacks: {
    async jwt({ token, account }) {
      // only on first sign-in
      // console.log(account, token);
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session(props) {
      const { token } = props;
      console.log(token);
      return token;
    },
  },
  strategy: "jwt",
  pages: {
    signIn: "/login",
  },
});
