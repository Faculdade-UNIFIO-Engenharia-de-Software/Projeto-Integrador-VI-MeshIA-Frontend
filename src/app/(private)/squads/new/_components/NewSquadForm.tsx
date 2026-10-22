"use client";

import { useActionState } from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTeamAction, type CreateTeamState } from "@/actions/squads/createTeamAction";

const initial: CreateTeamState = {};

function Field({ label, error, children }: { label: string; error?: string[]; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      {label}
      {children}
      {error?.[0] && <span className="text-destructive text-xs font-normal">{error[0]}</span>}
    </label>
  );
}

export default function NewSquadForm({ users }: { users: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState(createTeamAction, initial);
  const v = state.values ?? {};
  const e = state.fieldErrors ?? {};

  return (
    <form action={action} className="flex max-w-xl flex-col gap-5" noValidate>
      <Field label="Nome da equipe" error={e.name}>
        <Input name="name" defaultValue={v.name} placeholder="Ex.: Analytics" />
      </Field>

      <Field label="Descrição (opcional)" error={e.description}>
        <textarea
          name="description"
          defaultValue={v.description}
          rows={3}
          maxLength={200}
          placeholder="O que essa equipe faz?"
          className="border-input bg-background rounded-md border px-3 py-2 text-sm"
        />
      </Field>

      <Field label="Líder" error={e.leadId}>
        <select name="leadId" defaultValue={v.leadId ?? ""} className="border-input bg-background h-9 rounded-md border px-3 text-sm">
          <option value="">Selecione...</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </Field>

      {state.formError && (
        <p role="alert" className="text-destructive text-sm">
          {state.formError}
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Criando..." : "Criar equipe"}
        </Button>
        <Link href="/squads" className={buttonVariants({ variant: "outline" })}>
          Cancelar
        </Link>
      </div>
    </form>
  );
}
