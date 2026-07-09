import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

import { paths } from "@/lib/paths";

export const authConfig = {
  debug: process.env.AUTH_DEBUG === "true",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 2, // 2 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    }),
    GitHub,
    Google,
  ],
  pages: {
    signIn: paths.auth.login,
    signOut: paths.auth.login,
    error: paths.auth.login,
    verifyRequest: paths.auth.login,
    newUser: paths.dashboard,
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt: async ({ token, account }) => {
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.expires_at = account.expires_at;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (session?.user && token != null) {
        session.user.id = token.sub ?? "";
        session.user.name = token.name ?? user.name;
        session.user.email = token.email ?? user.email;
        session.user.image = token.picture ?? user.image;
        session.session_token = token.session_token as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
