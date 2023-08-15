import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET as string,
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/auth/user/access`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: user.email,
          }),
        }
      );
      const result = await response.json();
      if (result.status === 401) {
        throw new Error("Error");
      }
      user.access_token = result.access_token;
      user.refresh_token = result.refresh_token;
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token = { ...user };
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user = token;
      console.log(session);
      return session;
    },
  },
};
