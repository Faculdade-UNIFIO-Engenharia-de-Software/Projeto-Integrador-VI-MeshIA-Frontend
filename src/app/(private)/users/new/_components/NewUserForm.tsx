"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";

import { createUserAction, type CreateUserState } from "@/actions/users/createUserAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROLES } from "@/lib/roles";

type FieldName = "name" | "email" | "jobTitle" | "department";

export function NewUserForm() {
  const [state, formAction, pending] = useActionState<CreateUserState, FormData>(createUserAction, {});

  const field = (name: FieldName, label: string, props: React.ComponentProps<"input"> = {}) => {
    const error = state.fieldErrors?.[name]?.[0];
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={name}>{label}</Label>
        <Input
          id={name}
          name={name}
          defaultValue={state.values?.[name]}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${name}-error`} className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  };

  const selectedRole = state.values?.role ?? "viewer";

  return (
    <form action={formAction} noValidate className="flex max-w-2xl flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("name", "Nome completo", { autoComplete: "off" })}
        {field("email", "E-mail corporativo", { type: "email", autoComplete: "off" })}
        {field("jobTitle", "Cargo")}
        {field("department", "Unidade / Departamento")}
      </div>

      <fieldset disabled={pending} className="flex flex-col gap-2">
        <legend className="text-sm font-semibold">Cargo de acesso</legend>
        {ROLES.map((r) => (
          <label
            key={r.value}
            className="flex cursor-pointer items-start gap-3 rounded-md border p-3 has-[:checked]:border-primary has-[:checked]:bg-accent"
          >
            <input type="radio" name="role" value={r.value} defaultChecked={r.value === selectedRole} className="mt-1" />
            <span>
              <span className="block text-sm font-medium">{r.label}</span>
              <span className="block text-xs text-muted-foreground">{r.description}</span>
            </span>
          </label>
        ))}
        {state.fieldErrors?.role?.[0] && <p className="text-sm text-destructive">{state.fieldErrors.role[0]}</p>}
      </fieldset>

      {state.formError && (
        <p role="alert" className="text-sm text-destructive">
          {state.formError}
        </p>
      )}

      <div>
        <Button type="submit" disabled={pending}>
          {pending && <Loader2 className="animate-spin" />}
          Cadastrar colaborador
        </Button>
      </div>
    </form>
  );
}
