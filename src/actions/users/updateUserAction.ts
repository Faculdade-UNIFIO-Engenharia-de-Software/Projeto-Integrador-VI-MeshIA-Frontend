"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { ROLE_VALUES } from "@/lib/roles";
import { updateUser, type UserUpdate } from "@/services/api/users";

export type UpdateUserState = { ok?: boolean; message?: string };

const schema = z.object({
  id: z.string().min(1),
  intent: z.enum(["save", "suspend", "reactivate"]),
  role: z.enum(ROLE_VALUES).optional(),
});

export async function updateUserAction(_prev: UpdateUserState, formData: FormData): Promise<UpdateUserState> {
  const parsed = schema.safeParse({
    id: formData.get("id"),
    intent: formData.get("intent"),
    role: formData.get("role") ?? undefined,
  });
  if (!parsed.success) return { ok: false, message: "Dados inválidos." };

  const { id, intent, role } = parsed.data;
  const patch: UserUpdate = intent === "save" ? { role } : { status: intent === "suspend" ? "suspended" : "active" };

  if (intent === "save" && !role) return { ok: false, message: "Escolha um cargo de acesso." };

  const res = await updateUser(id, patch);
  if (!res.ok) return { ok: false, message: res.message };

  revalidatePath("/users");
  return {
    ok: true,
    message: intent === "save" ? "Alterações salvas." : intent === "suspend" ? "Acesso suspenso." : "Acesso reativado.",
  };
}
