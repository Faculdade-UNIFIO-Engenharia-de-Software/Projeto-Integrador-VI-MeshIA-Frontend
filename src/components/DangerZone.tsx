"use client";

import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type DangerState = { error?: string };

type Props = {
  id: string;
  description: string;
  buttonLabel: string;
  action: (prev: DangerState, formData: FormData) => Promise<DangerState>;
  /** Se informado, a pessoa precisa digitar este texto para liberar a exclusão. */
  confirmName?: string;
};

export default function DangerZone({ id, description, buttonLabel, action, confirmName }: Props) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [state, formAction, pending] = useActionState(action, {});

  const blocked = confirmName ? typed !== confirmName : false;

  return (
    <section className="border-destructive/40 flex max-w-2xl flex-col gap-3 rounded-lg border p-4">
      <h2 className="text-destructive text-sm font-semibold">Zona de perigo</h2>
      <p className="text-muted-foreground text-sm">{description}</p>

      {!open ? (
        <Button type="button" variant="destructive" className="w-fit" onClick={() => setOpen(true)}>
          {buttonLabel}
        </Button>
      ) : (
        <form action={formAction} className="flex flex-col gap-3">
          <input type="hidden" name="id" value={id} />

          {confirmName && (
            <label className="flex flex-col gap-1.5 text-sm">
              <span>
                Digite <strong>{confirmName}</strong> para confirmar:
              </span>
              <Input value={typed} onChange={(ev) => setTyped(ev.target.value)} autoComplete="off" />
            </label>
          )}

          <p className="text-sm font-medium">Tem certeza? Esta ação não pode ser desfeita.</p>

          <div className="flex gap-2">
            <Button type="submit" variant="destructive" disabled={pending || blocked}>
              {pending ? "Excluindo..." : "Confirmar exclusão"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => {
                setOpen(false);
                setTyped("");
              }}
            >
              Cancelar
            </Button>
          </div>

          {state.error && (
            <p role="alert" className="text-destructive text-sm">
              {state.error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
