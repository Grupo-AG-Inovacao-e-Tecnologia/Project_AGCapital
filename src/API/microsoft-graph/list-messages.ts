import { auth } from "@/lib/auth";

export async function listMessages() {
  const session = await auth();
  console.log(session?.session_token);
  const res = await fetch("https://graph.microsoft.com/v1.0/me/messages", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.session_token}`,
    },
  });
  console.log(res);
  return res;
}
