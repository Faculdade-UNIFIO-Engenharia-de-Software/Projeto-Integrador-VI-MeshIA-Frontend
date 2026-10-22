"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { PROVIDER_VALUES } from "@/lib/db-providers";
import { createDatabase } from "@/services/api/databases";

export type CreateDatabaseState = {
  fieldErrors?: Record<string, string[] | undefined>;
  formError?: string;
  // a senha nunca volta para o formulário
  values?: Record<string, string>;
};

const schema = z.object({
  name: z.string().trim().min(3, "Informe o nome da base (mín. 3 caracteres)."),
  provider: z.enum(PROVIDER_VALUES, { message: "Escolha um provedor." }),
  company: z.string().trim().min(2, "Informe a empresa ou área."),
  host: z.string().trim().min(1, "Informe o host."),
  port: z.coerce.number().int().min(1, "Porta inválida.").max(65535, "Porta inválida."),
  database: z.string().trim().min(1, "Informe o nome do banco."),
  username: z.string().trim().min(1, "Informe o usuário."),
  password: z.string().min(1, "Informe a senha."),
});

export async function createDatabaseAction(_prev: CreateDatabaseState, formData: FormData): Promise<CreateDatabaseState> {
  const get = (k: string) => String(formData.get(k) ?? "");

  const values = {
    name: get("name"),
    provider: get("provider"),
    company: get("company"),
    host: get("host"),
    port: get("port"),
    database: get("database"),
    username: get("username"),
  };

  const parsed = schema.safeParse({ ...values, password: get("password") });
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const result = await createDatabase(parsed.data);
  if (!result.ok) return { formError: result.message, values };

  revalidatePath("/data-catalog");
  redirect("/data-catalog");
}
