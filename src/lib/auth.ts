import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { path } from "@/lib/path";

/**
 * Para o link por e-mail funcionar você precisa:
 * 1. Variáveis de ambiente: AUTH_SECRET, EMAIL_SERVER e EMAIL_FROM
 *    Ex.: EMAIL_SERVER=smtp://user:pass@smtp.example.com:587
 *         EMAIL_FROM=noreply@seudominio.com
 * 2. Instalar: bun add nodemailer
 * 3. (Obrigatório para magic link) Configurar um database adapter em adapter:
 *    https://authjs.dev/getting-started/database
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GitHub,
    Google,
  ],
  pages: {
    signIn: path.auth.loginLink,
    signOut: path.auth.login,
    error: path.auth.login,
    verifyRequest: path.auth.loginLink,
    newUser: path.home,
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
