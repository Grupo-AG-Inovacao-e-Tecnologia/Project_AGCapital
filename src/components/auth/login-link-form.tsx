"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { path } from "@/lib/path";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export function LoginLinkForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<{ email: string }>({
    defaultValues: { email: "" },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      console.log(data);
      await signIn("nodemailer", {
        email: data.email,
        redirect: false,
      });

      toast.success("Link de acesso enviado com sucesso, verifique seu email");
    } catch {
      toast.error("Erro ao enviar link de acesso");
    }
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Receber link de acesso</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Digite seu email abaixo para receber um link de acesso
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Digite seu email"
            required
            {...form.register("email", { required: true })}
          />
          <Button type="submit">Enviar link de acesso</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Não tem uma conta? <Link href={path.auth.signup}>Criar conta</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
