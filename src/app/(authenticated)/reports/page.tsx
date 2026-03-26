import { listMessages } from "@/API/microsoft-graph/list-messages";
import { SiteHeader } from "@/components/templates/SiteHeader/site-header";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  return (
    <>
      <SiteHeader title="Relatórios" />
      <div className="flex-1 justify-center items-center flex">
        <h1 className="text-5xl font-bold capitalize">Relatórios</h1>
        <p>{session?.accessToken ?? "Não autenticado"}</p>
        <p>{listMessages()}</p>
      </div>
    </>
  );
}
