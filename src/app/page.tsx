import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { paths } from "@/lib/paths";

export default async function RootPage() {
  const session = await auth();
  if (session) {
    redirect(paths.dashboard);
  }
  redirect(paths.auth.login);
}
