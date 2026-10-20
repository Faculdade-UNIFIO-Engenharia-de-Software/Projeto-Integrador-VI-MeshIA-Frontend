"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { ROLE_VALUES } from "@/lib/roles";
import { createUser } from "@/services/api/users";

const FIELDS = ["name", "email", "jobTitle", "department", "role"] as const;

export type CreateUserState = {
  fieldErrors?: Partial<Record<(typeof FIELDS)[number], string[]>>;
  formError?: string;
  values?: Record<string, string>;
};

const schema = z.object({
  name: z.string().trim().min(3, "Informe o nome completo."),
  email: z.email("E-mail inválido."),
  jobTitle: z.string().trim().min(2, "Informe o cargo."),
  department: z.string().trim().min(2, "Informe o departamento."),
  role: z.enum(ROLE_VALUES, "Escolha um cargo de acesso."),
});

export async function createUserAction(_prev: CreateUserState, formData: FormData): Promise<CreateUserState> {
  const values = Object.fromEntries(FIELDS.map((f) => [f, String(formData.get(f) ?? "")]));

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const res = await createUser({ ...parsed.data, email: parsed.data.email.toLowerCase() });
  if (!res.ok) return { formError: res.message, values };

  revalidatePath("/users");
  redirect(`/users?user=${encodeURIComponent(res.data.id)}`); // fora de try/catch, como no login
}
