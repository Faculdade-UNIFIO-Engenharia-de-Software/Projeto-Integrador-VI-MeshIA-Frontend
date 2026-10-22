"use client";

import { useActionState } from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserProfileAction, type UserProfileState } from "@/actions/users/updateUserProfileAction";

const initial: UserProfileState = {};

function Field({ label, error, children }: { label: string; error?: string[]; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      {label}
      {children}
      {error?.[0] && <span className="text-destructive text-xs font-normal">{error[0]}</span>}
    </label>
  );
}

export default function EditUserForm({ user }: { user: { id: string; name: string; email: string; jobTitle: string; department: string } }) {
  const [state, action, pending] = useActionState(updateUserProfileAction, initial);
  const v = state.values ?? {};
  const e = state.fieldErrors ?? {};

  return (
    <form key={JSON.stringify(state.values ?? {})} action={action} className="flex max-w-2xl flex-col gap-5" noValidate>
      <input type="hidden" name="id" value={user.id} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome completo" error={e.name}>
          <Input name="name" defaultValue={v.name ?? user.name} />
        </Field>
        <Field label="E-mail corporativo">
          <Input value={user.email} readOnly disabled />
        </Field>
        <Field label="Cargo" error={e.jobTitle}>
          <Input name="jobTitle" defaultValue={v.jobTitle ?? user.jobTitle} />
        </Field>
        <Field label="Unidade / Departamento" error={e.department}>
          <Input name="department" defaultValue={v.department ?? user.department} />
        </Field>
      </div>

      <p className="text-muted-foreground text-xs">
        O e-mail identifica o colaborador e não pode ser alterado. O cargo de acesso é editado na tela de detalhes.
      </p>

      {state.formError && (
        <p role="alert" className="text-destructive text-sm">
          {state.formError}
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Salvando..." : "Salvar alterações"}
        </Button>
        <Link href={`/users?user=${user.id}`} className={buttonVariants({ variant: "outline" })}>
          Cancelar
        </Link>
      </div>
    </form>
  );
}
