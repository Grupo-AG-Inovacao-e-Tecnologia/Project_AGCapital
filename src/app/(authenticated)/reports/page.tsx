import { listMessages } from "@/API/microsoft-graph/list-messages";
import { SiteHeader } from "@/components/templates/SiteHeader/site-header";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  return (
    <>
      <SiteHeader title="Relatórios" />
      <div className="flex-1 justify-center items-center flex flex-col">
        <h1 className="text-5xl font-bold capitalize">Relatórios</h1>
        <p className="text-muted-foreground text-sm">
          {session?.session_token ?? "Sem sessão"}
        </p>
        <pre className="mt-4 max-w-full overflow-auto text-xs">
          {JSON.stringify(await listMessages(), null, 2)}
        </pre>
      </div>
    </>
  );
}
