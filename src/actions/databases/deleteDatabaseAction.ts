"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { deleteDatabase } from "@/services/api/databases";

export type DeleteState = { error?: string };

export async function deleteDatabaseAction(_prev: DeleteState, formData: FormData): Promise<DeleteState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Base inválida." };

  const result = await deleteDatabase(id);
  if (!result.ok) return { error: result.message };

  revalidatePath("/data-catalog");
  redirect("/data-catalog");
}
