"use client";

import { useActionState, useState } from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROVIDERS } from "@/lib/db-providers";
import { createDatabaseAction, type CreateDatabaseState } from "@/actions/databases/createDatabaseAction";
import { updateDatabaseAction } from "@/actions/databases/updateDatabaseAction";
import type { DatabaseDetail } from "@/services/api/databases";

const initial: CreateDatabaseState = {};

function Field({ label, error, hint, children }: { label: string; error?: string[]; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      {label}
      {children}
      {hint && <span className="text-muted-foreground text-xs font-normal">{hint}</span>}
      {error?.[0] && <span className="text-destructive text-xs font-normal">{error[0]}</span>}
    </label>
  );
}

export default function NewDatabaseForm({ database }: { database?: DatabaseDetail }) {
  const [state, action, pending] = useActionState(database ? updateDatabaseAction : createDatabaseAction, initial);
  const v = state.values ?? {};
  const e = state.fieldErrors ?? {};

  const [provider, setProvider] = useState<string>(v.provider || database?.provider || PROVIDERS[0].value);
  const [port, setPort] = useState<string>(v.port || String(database?.port ?? PROVIDERS[0].port));

  function onProviderChange(value: string) {
    setProvider(value);
    const found = PROVIDERS.find((p) => p.value === value);
    // ao editar, só sugere a porta padrão se a pessoa trocar o provedor
    if (found) setPort(String(found.port));
  }

  return (
    <form key={JSON.stringify(state.values ?? {})} action={action} className="flex max-w-2xl flex-col gap-5" noValidate>
      {database && <input type="hidden" name="id" value={database.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome da base" error={e.name}>
          <Input name="name" defaultValue={v.name ?? database?.name} placeholder="Ex.: Vendas & ERP" />
        </Field>
        <Field label="Empresa / área" error={e.company}>
          <Input name="company" defaultValue={v.company ?? database?.company} placeholder="Ex.: Empresa A (Matriz)" />
        </Field>

        <Field label="Provedor" error={e.provider}>
          <select
            name="provider"
            value={provider}
            onChange={(ev) => onProviderChange(ev.target.value)}
            className="border-input bg-background h-9 rounded-md border px-3 text-sm"
          >
            {PROVIDERS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Banco de dados" error={e.database}>
          <Input name="database" defaultValue={v.database ?? database?.database} placeholder="Ex.: vendas_prod" />
        </Field>

        <Field label="Host" error={e.host}>
          <Input name="host" defaultValue={v.host ?? database?.host} placeholder="db.empresa.com" />
        </Field>
        <Field label="Porta" error={e.port}>
          <Input name="port" inputMode="numeric" value={port} onChange={(ev) => setPort(ev.target.value)} />
        </Field>

        <Field label="Usuário" error={e.username}>
          <Input name="username" defaultValue={v.username ?? database?.username} autoComplete="off" />
        </Field>
        <Field
          label={database ? "Nova senha (opcional)" : "Senha"}
          error={e.password}
          hint={database ? "Deixe em branco para manter a senha atual." : undefined}
        >
          <Input name="password" type="password" autoComplete="new-password" />
        </Field>
      </div>

      <p className="text-muted-foreground text-xs">
        Use um usuário de <strong>somente leitura</strong>. A senha é enviada ao servidor e não é exibida novamente.
      </p>

      {state.formError && (
        <p role="alert" className="text-destructive text-sm">
          {state.formError}
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Salvando..." : database ? "Salvar alterações" : "Cadastrar base"}
        </Button>
        <Link href="/data-catalog" className={buttonVariants({ variant: "outline" })}>
          Cancelar
        </Link>
      </div>
    </form>
  );
}
