"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  // Mesmo nome e path do cookie criado no login.
  (await cookies()).delete("token");
  // TODO (back-end): se a API tiver endpoint de logout/revogação de token, chamar aqui antes de redirecionar.
  redirect("/auth");
}
