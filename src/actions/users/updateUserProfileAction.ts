"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { updateUserProfile } from "@/services/api/users";

export type UserProfileState = {
  fieldErrors?: Record<string, string[] | undefined>;
  formError?: string;
  values?: Record<string, string>;
};

// Use a mesma regra de nome do createUserAction, para criar e editar serem iguais.
const schema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(3, "Informe o nome completo."),
  jobTitle: z.string().trim().min(2, "Informe o cargo."),
  department: z.string().trim().min(2, "Informe a unidade ou o departamento."),
});

export async function updateUserProfileAction(_prev: UserProfileState, formData: FormData): Promise<UserProfileState> {
  const get = (k: string) => String(formData.get(k) ?? "");
  const values = {
    id: get("id"),
    name: get("name"),
    jobTitle: get("jobTitle"),
    department: get("department"),
  };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const { id, ...rest } = parsed.data;
  const result = await updateUserProfile(id, rest);
  if (!result.ok) return { formError: result.message, values };

  revalidatePath("/users");
  redirect(`/users?user=${id}`);
}
