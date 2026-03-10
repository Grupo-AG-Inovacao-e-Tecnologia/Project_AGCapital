import { SiteHeader } from "@/components/templates/SiteHeader/site-header";

export default function Page() {
  return (
    <>
      <SiteHeader title="Relatórios" />
      <div className="flex-1 justify-center items-center flex">
        <h1 className="text-5xl font-bold capitalize">Relatórios</h1>
      </div>
    </>
  );
}
