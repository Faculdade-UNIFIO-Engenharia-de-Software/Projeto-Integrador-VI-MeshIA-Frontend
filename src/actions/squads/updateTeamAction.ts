"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { listUsers, updateTeam } from "@/services/api/users";
import type { CreateTeamState } from "./createTeamAction";

const schema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(3, "Informe o nome da equipe (mín. 3 caracteres)."),
  description: z.string().trim().max(200, "Use no máximo 200 caracteres."),
  leadId: z.string().min(1, "Escolha o líder da equipe."),
});

export async function updateTeamAction(_prev: CreateTeamState, formData: FormData): Promise<CreateTeamState> {
  const get = (k: string) => String(formData.get(k) ?? "");
  const values = {
    id: get("id"),
    name: get("name"),
    description: get("description"),
    leadId: get("leadId"),
  };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const users = await listUsers();
  const lead = users.ok ? users.data.find((u) => u.id === parsed.data.leadId) : undefined;
  if (!lead) return { fieldErrors: { leadId: ["Líder não encontrado."] }, values };

  const { id, ...rest } = parsed.data;
  const result = await updateTeam(id, { ...rest, leadName: lead.name });
  if (!result.ok) return { formError: result.message, values };

  revalidatePath("/squads");
  revalidatePath("/users");
  redirect("/squads");
}
