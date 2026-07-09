import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { authConfig } from "./auth.config";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
});

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
