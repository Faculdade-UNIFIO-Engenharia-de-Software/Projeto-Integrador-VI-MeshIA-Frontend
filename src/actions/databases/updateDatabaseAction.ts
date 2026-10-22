"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { PROVIDER_VALUES } from "@/lib/db-providers";
import { updateDatabase } from "@/services/api/databases";
import type { CreateDatabaseState } from "./createDatabaseAction";

const schema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(3, "Informe o nome da base (mín. 3 caracteres)."),
  provider: z.enum(PROVIDER_VALUES, { message: "Escolha um provedor." }),
  company: z.string().trim().min(2, "Informe a empresa ou área."),
  host: z.string().trim().min(1, "Informe o host."),
  port: z.coerce.number().int().min(1, "Porta inválida.").max(65535, "Porta inválida."),
  database: z.string().trim().min(1, "Informe o nome do banco."),
  username: z.string().trim().min(1, "Informe o usuário."),
  password: z.string().optional(), // vazio = manter a senha atual
});

export async function updateDatabaseAction(_prev: CreateDatabaseState, formData: FormData): Promise<CreateDatabaseState> {
  const get = (k: string) => String(formData.get(k) ?? "");

  // a senha nunca volta para o formulário
  const values = {
    id: get("id"),
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

  const { id, password, ...rest } = parsed.data;
  const result = await updateDatabase(id, { ...rest, password: password || undefined });
  if (!result.ok) return { formError: result.message, values };

  revalidatePath("/data-catalog");
  redirect("/data-catalog");
}
