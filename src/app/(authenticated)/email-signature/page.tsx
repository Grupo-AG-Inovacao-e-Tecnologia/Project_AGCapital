"use client";

import { SiteHeader } from "@/components/templates/SiteHeader/site-header";

import { EmailSignatureGenerator } from "./email-signature-generator";

export default function Page() {
  return (
    <>
      <SiteHeader title="Assinatura de Email" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 p-4 md:gap-6 md:y-6">
            <EmailSignatureGenerator />
          </div>
        </div>
      </div>
    </>
  );
}
