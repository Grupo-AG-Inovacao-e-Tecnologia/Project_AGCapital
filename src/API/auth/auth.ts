"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { POST } from "../APIservice";
import { paths } from "@/lib/paths";
import { signOut } from "@/lib/auth";

// Modo de desenvolvimento sem back-end
const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_API === "true";

export async function login(email: string, password: string) {
  // Código original para quando o back-end estiver disponível
  const res = await POST(paths.auth.login, { email, password }, true);
  const cookiesList = await cookies();
  cookiesList.set("access_token", res.headers["access_token"]);
  cookiesList.set("auth_token", res.headers["auth_token"]);
  revalidatePath(paths.root);
  return res.data;
}

export const logout = async () => {
  const jar = await cookies();
  jar.delete("access_token");
  jar.delete("auth_token");
  revalidatePath(paths.root);
  await signOut({ redirectTo: paths.auth.login });
};

export const validateToken = async (token: string) => {
  if (MOCK_MODE) {
    return { valid: true };
  }
  return POST("/auth/validate_token", { token });
};

export const getMe = async (token: string) => {
  if (MOCK_MODE) {
    return {
      id: 1,
      email: "teste@email.com",
      name: "FranceTech",
    };
  }
  return POST("/auth/me", { token });
};
