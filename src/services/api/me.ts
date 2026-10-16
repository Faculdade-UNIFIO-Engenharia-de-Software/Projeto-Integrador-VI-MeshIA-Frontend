import { cookies } from "next/headers";
import type { Role } from "@/lib/roles";

export type Profile = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  role: Role;
  lastAccess: string | null; // ISO 8601
};

type Result<T> = { ok: true; data: T } | { ok: false; message: string };

const USE_MOCK = process.env.USE_MOCK_API === "true";

export async function getMe(): Promise<Result<Profile>> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 200));
    return {
      ok: true,
      data: {
        id: "u2",
        name: "Lucas Silva", // mesmo usuário fictício do menu lateral
        email: "lucasadriano@email.com",
        jobTitle: "Analista",
        department: "BI & Analytics",
        role: "senior_analyst",
        lastAccess: "2026-10-16T19:30:00-03:00",
      },
    };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    const res = await fetch(`${process.env.API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        ok: false,
        message: res.status === 401 ? "Sessão expirada. Entre novamente." : "Não foi possível carregar o perfil.",
      };
    }
    return { ok: true, data: (await res.json()) as Profile }; // contrato a combinar com o back
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}
