"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { updateUserAction, type UpdateUserState } from "@/actions/users/updateUserAction";
import { ROLES, type Role } from "@/lib/roles";
import type { UserStatus } from "@/services/api/users";

export function UserAccessForm({ id, role, status }: { id: string; role: Role; status: UserStatus }) {
  const [state, formAction, pending] = useActionState<UpdateUserState, FormData>(updateUserAction, {});
  const suspended = status === "suspended";

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="id" value={id} />

      <fieldset disabled={pending} className="flex flex-col gap-2">
        <legend className="text-sm font-semibold">Cargo de acesso</legend>
        {ROLES.map((r) => (
          <label
            key={r.value}
            className="flex cursor-pointer items-start gap-3 rounded-md border p-3 has-[:checked]:border-primary has-[:checked]:bg-accent"
          >
            <input type="radio" name="role" value={r.value} defaultChecked={r.value === role} className="mt-1" />
            <span>
              <span className="block text-sm font-medium">{r.label}</span>
              <span className="block text-xs text-muted-foreground">{r.description}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" name="intent" value="save" disabled={pending}>
          {pending && <Loader2 className="animate-spin" />}
          Salvar alterações
        </Button>

        <Button
          type="submit"
          name="intent"
          value={suspended ? "reactivate" : "suspend"}
          variant={suspended ? "outline" : "destructive"}
          disabled={pending}
          onClick={(e) => {
            if (!suspended && !window.confirm("Suspender o acesso deste colaborador?")) e.preventDefault();
          }}
        >
          {suspended ? "Reativar acesso" : "Suspender acesso"}
        </Button>
      </div>

      {state.message && (
        <p role={state.ok ? "status" : "alert"} className={state.ok ? "text-sm text-muted-foreground" : "text-sm text-destructive"}>
          {state.message}
        </p>
      )}
    </form>
  );
}
