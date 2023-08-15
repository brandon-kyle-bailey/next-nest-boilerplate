import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    access_token?: string;
    refresh_token?: string;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      access_token?: string;
      refresh_token?: string;
    } & DefaultSession["user"];
  }
}
