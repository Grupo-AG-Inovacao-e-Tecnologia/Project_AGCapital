import { auth } from "@/lib/auth";

export async function listMessages(): Promise<any> {
  const session = await auth();

  const res = await fetch("https://graph.microsoft.com/v1.0/me/messages", {
    headers: {
      method: "GET",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return await res.json();
}
