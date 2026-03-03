import { SiteHeader } from "@/components/templates/SiteHeader/site-header";

export default function Page() {
  return (
    <>
      <SiteHeader title="Funcionários" />
      <div className="flex-1 justify-center items-center flex">
        <h1 className="text-5xl font-bold capitalize">Funcionários</h1>
      </div>
    </>
  );
}
