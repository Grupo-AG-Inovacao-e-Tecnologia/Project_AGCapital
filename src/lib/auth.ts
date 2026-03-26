import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { paths } from "@/lib/paths";

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: process.env.AUTH_DEBUG === "true",
  adapter: PrismaAdapter(prisma),
  session: {
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
    // jwt: async ({ token, account }) => {
    //   if (account) {
    //     token.access_token = account.access_token;
    //     token.refresh_token = account.refresh_token;
    //     token.expires_at = account.expires_at;
    //   }
    //   return token;
    // },
    session: async ({ session, token, user }) => {
      if (session?.user && token != null) {
        session.user.id = token.sub ?? "";
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.image = user.image;
        // session.accessToken = token.access_token as string;
      }
      return session;
    },
  },
});

/** Converte a session do NextAuth no formato esperado pelo sidebar (evita acoplamento). */
export function sessionToGetUser(
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  } | null,
) {
  if (!session?.user) return null;
  return {
    name: session.user.name ?? "Usuário",
    email: session.user.email ?? "",
    avatar: session.user.image ?? "",
  };
}
