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
      console.log("inside signin callback. maybe call api/login here?");
      console.log(user);
      return true;
    },
  },
};
