"use client";

import { useActionState, useState } from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROVIDERS } from "@/lib/db-providers";
import { createDatabaseAction, type CreateDatabaseState } from "@/actions/databases/createDatabaseAction";

const initial: CreateDatabaseState = {};

function Field({ label, error, children }: { label: string; error?: string[]; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      {label}
      {children}
      {error?.[0] && <span className="text-destructive text-xs font-normal">{error[0]}</span>}
    </label>
  );
}

export default function NewDatabaseForm() {
  const [state, action, pending] = useActionState(createDatabaseAction, initial);
  const v = state.values ?? {};
  const e = state.fieldErrors ?? {};

  const [provider, setProvider] = useState<string>(v.provider || PROVIDERS[0].value);
  const [port, setPort] = useState<string>(v.port || String(PROVIDERS[0].port));

  function onProviderChange(value: string) {
    setProvider(value);
    const found = PROVIDERS.find((p) => p.value === value);
    if (found) setPort(String(found.port));
  }

  return (
    <form key={JSON.stringify(state.values ?? {})} action={action} className="flex max-w-2xl flex-col gap-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome da base" error={e.name}>
          <Input name="name" defaultValue={v.name} placeholder="Ex.: Vendas & ERP" />
        </Field>
        <Field label="Empresa / área" error={e.company}>
          <Input name="company" defaultValue={v.company} placeholder="Ex.: Empresa A (Matriz)" />
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
          <Input name="database" defaultValue={v.database} placeholder="Ex.: vendas_prod" />
        </Field>

        <Field label="Host" error={e.host}>
          <Input name="host" defaultValue={v.host} placeholder="db.empresa.com" />
        </Field>
        <Field label="Porta" error={e.port}>
          <Input name="port" inputMode="numeric" value={port} onChange={(ev) => setPort(ev.target.value)} />
        </Field>

        <Field label="Usuário" error={e.username}>
          <Input name="username" defaultValue={v.username} autoComplete="off" />
        </Field>
        <Field label="Senha" error={e.password}>
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
          {pending ? "Cadastrando..." : "Cadastrar base"}
        </Button>
        <Link href="/data-catalog" className={buttonVariants({ variant: "outline" })}>
          Cancelar
        </Link>
      </div>
    </form>
  );
}
