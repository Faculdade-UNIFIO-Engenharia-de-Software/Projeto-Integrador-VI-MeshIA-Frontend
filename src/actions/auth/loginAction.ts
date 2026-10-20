"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { login } from "@/services/api/auth";

const loginSchema = z.object({
  email: z.email("Informe um e-mail válido."),
  password: z.string().min(8, "A senha deve ter ao menos 8 caracteres."),
});

export type LoginState = {
  fieldErrors?: { email?: string; password?: string };
  formError?: string;
  values?: { email: string };
};

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const parsed = loginSchema.safeParse({ email, password });
  if (!parsed.success) {
    const f = z.flattenError(parsed.error).fieldErrors;
    return { fieldErrors: { email: f.email?.[0], password: f.password?.[0] }, values: { email } };
  }

  const result = await login(parsed.data.email, parsed.data.password);
  if (!result.ok) return { formError: result.message, values: { email } };

  const store = await cookies();
  store.set("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: result.expiresIn,
  });

  redirect("/");
}
