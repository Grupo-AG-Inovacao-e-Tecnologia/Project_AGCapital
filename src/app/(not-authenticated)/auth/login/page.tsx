import Image from "next/image";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-30">
        <div className="flex justify-center gap-2 ">
          <a
            href="https://agcapital.com.br"
            className="flex items-center gap-2 font-medium"
          >
            <Image
              src="/logo.png"
              alt="Grupo AG Capital"
              width={200}
              height={200}
              className="w-full object-cover"
            />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://i.pinimg.com/736x/64/54/ae/6454ae91eb3a58e151efce7e1121c14a.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
