"use client";

import { useActionState, useState } from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTeamAction, type CreateTeamState } from "@/actions/squads/createTeamAction";
import { updateTeamAction } from "@/actions/squads/updateTeamAction";
import type { TeamItem } from "@/services/api/users";

const initial: CreateTeamState = {};

function Field({ label, error, children }: { label: string; error?: string[]; children: React.ReactNode }) {
  // mexeu no campo = esconde o erro antigo (o form é recriado a cada resposta)
  const [dirty, setDirty] = useState(false);

  return (
    <label onInput={() => setDirty(true)} className="flex flex-col gap-1.5 text-sm font-medium">
      {label}
      {children}
      {!dirty && error?.[0] && <span className="text-destructive text-xs font-normal">{error[0]}</span>}
    </label>
  );
}

export default function NewSquadForm({ users, team }: { users: { id: string; name: string }[]; team?: TeamItem }) {
  const [state, action, pending] = useActionState(team ? updateTeamAction : createTeamAction, initial);
  const v = state.values ?? {};
  const e = state.fieldErrors ?? {};

  return (
    <form key={JSON.stringify(state.values ?? {})} action={action} className="flex max-w-xl flex-col gap-5" noValidate>
      {team && <input type="hidden" name="id" value={team.id} />}

      <Field label="Nome da equipe" error={e.name}>
        <Input name="name" defaultValue={v.name ?? team?.name} placeholder="Ex.: Analytics" />
      </Field>

      <Field label="Descrição (opcional)" error={e.description}>
        <textarea
          name="description"
          defaultValue={v.description ?? team?.description}
          rows={3}
          maxLength={200}
          placeholder="O que essa equipe faz?"
          className="border-input bg-background rounded-md border px-3 py-2 text-sm"
        />
      </Field>

      <Field label="Líder" error={e.leadId}>
        <select name="leadId" defaultValue={v.leadId ?? team?.leadId ?? ""} className="border-input bg-background h-9 rounded-md border px-3 text-sm">
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
          {pending ? "Salvando..." : team ? "Salvar alterações" : "Criar equipe"}
        </Button>
        <Link href="/squads" className={buttonVariants({ variant: "outline" })}>
          Cancelar
        </Link>
      </div>
    </form>
  );
}
