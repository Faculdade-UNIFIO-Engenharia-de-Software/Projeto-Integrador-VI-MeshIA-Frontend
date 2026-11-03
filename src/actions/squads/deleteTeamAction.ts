"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { deleteTeam } from "@/services/api/users";

export type DeleteState = { error?: string };

export async function deleteTeamAction(_prev: DeleteState, formData: FormData): Promise<DeleteState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Equipe inválida." };

  const result = await deleteTeam(id);
  if (!result.ok) return { error: result.message };

  revalidatePath("/squads");
  revalidatePath("/users");
  redirect("/squads");
}
