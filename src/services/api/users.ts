import { cookies } from "next/headers";
import type { Role } from "@/lib/roles";

export type UserStatus = "active" | "suspended";
export type UserUpdate = { role?: Role; status?: UserStatus };

export type UserItem = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  role: Role;
  status: UserStatus;
  lastAccess: string | null; // ISO 8601
};

export type TeamItem = { id: string; name: string; members: number };

export type NewUser = Pick<UserItem, "name" | "email" | "jobTitle" | "department" | "role">;

type Result<T> = { ok: true; data: T } | { ok: false; message: string };

const USE_MOCK = process.env.USE_MOCK_API === "true";
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const MOCK_USERS: UserItem[] = [
  {
    id: "u1",
    name: "Mariana Costa",
    email: "mariana.costa@empresa.com",
    jobTitle: "Gerente de Dados",
    department: "Matriz Brasil",
    role: "admin",
    status: "active",
    lastAccess: "2026-10-15T14:12:00-03:00",
  },
  {
    id: "u2",
    name: "Lucas Silva",
    email: "lucas.silva@empresa.com",
    jobTitle: "Analista",
    department: "BI & Analytics",
    role: "senior_analyst",
    status: "active",
    lastAccess: "2026-10-14T09:40:00-03:00",
  },
  {
    id: "u3",
    name: "Carlos Prado",
    email: "carlos.prado@empresa.com",
    jobTitle: "Financeiro",
    department: "FP&A",
    role: "junior_analyst",
    status: "active",
    lastAccess: "2026-10-12T17:05:00-03:00",
  },
  {
    id: "u4",
    name: "Ana Dias",
    email: "ana.dias@empresa.com",
    jobTitle: "Operações",
    department: "Supply Chain",
    role: "senior_analyst",
    status: "active",
    lastAccess: "2026-10-13T11:20:00-03:00",
  },
  {
    id: "u5",
    name: "Felipe Ramo",
    email: "felipe.ramo@empresa.com",
    jobTitle: "Diretoria",
    department: "Executivo",
    role: "viewer",
    status: "active",
    lastAccess: "2026-10-09T08:10:00-03:00",
  },
  {
    id: "u6",
    name: "Beatriz Lima",
    email: "beatriz.lima@empresa.com",
    jobTitle: "Marketing",
    department: "Growth",
    role: "viewer",
    status: "suspended",
    lastAccess: null,
  },
];

const MOCK_TEAMS: TeamItem[] = [
  { id: "t1", name: "Equipe 1 - BI & Analytics", members: 6 },
  { id: "t2", name: "Equipe 2 - Financeiro & FP&A", members: 4 },
  { id: "t3", name: "Equipe 3 - Operações & Supply", members: 8 },
  { id: "t4", name: "Equipe 4 - Diretoria Executiva", members: 3 },
];

async function apiGet<T>(path: string, params?: Record<string, string>): Promise<Result<T>> {
  try {
    const token = (await cookies()).get("token")?.value;
    const url = new URL(`${process.env.API_URL}${path}`);
    for (const [key, value] of Object.entries(params ?? {})) {
      if (value) url.searchParams.set(key, value);
    }
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      return { ok: false, message: res.status === 404 ? "Não encontrado." : "Não foi possível carregar os dados." };
    }
    return { ok: true, data: (await res.json()) as T };
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}

export async function listUsers(query = ""): Promise<Result<UserItem[]>> {
  if (USE_MOCK) {
    await delay(300);
    const q = normalize(query.trim());
    const data = MOCK_USERS.filter((u) => !q || normalize(u.name).includes(q) || normalize(u.email).includes(q) || normalize(u.jobTitle).includes(q));
    return { ok: true, data };
  }
  return apiGet<UserItem[]>("/users", { q: query });
}

export async function getUser(id: string): Promise<Result<UserItem>> {
  if (USE_MOCK) {
    await delay(150);
    const user = MOCK_USERS.find((u) => u.id === id);
    return user ? { ok: true, data: user } : { ok: false, message: "Colaborador não encontrado." };
  }
  return apiGet<UserItem>(`/users/${encodeURIComponent(id)}`);
}

export async function listTeams(): Promise<Result<TeamItem[]>> {
  if (USE_MOCK) {
    await delay(150);
    return { ok: true, data: MOCK_TEAMS };
  }
  return apiGet<TeamItem[]>("/teams");
}

export async function updateUser(id: string, patch: UserUpdate): Promise<Result<UserItem>> {
  if (USE_MOCK) {
    await delay(400);
    const user = MOCK_USERS.find((u) => u.id === id);
    if (!user) return { ok: false, message: "Colaborador não encontrado." };
    Object.assign(user, patch); // no mock, a mudança fica só em memória (reinicia ao reiniciar o servidor)
    return { ok: true, data: user };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    const res = await fetch(`${process.env.API_URL}/users/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(patch), // contrato a combinar com o back
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        ok: false,
        message: res.status === 403 ? "Você não tem permissão para esta ação." : "Não foi possível salvar.",
      };
    }
    return { ok: true, data: (await res.json()) as UserItem };
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}

export async function createUser(input: NewUser): Promise<Result<UserItem>> {
  if (USE_MOCK) {
    await delay(500);
    if (MOCK_USERS.some((u) => u.email === input.email)) {
      return { ok: false, message: "Já existe um colaborador com este e-mail." };
    }
    const user: UserItem = { id: `u${Date.now()}`, ...input, status: "active", lastAccess: null };
    MOCK_USERS.push(user);
    return { ok: true, data: user };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    const res = await fetch(`${process.env.API_URL}/users`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(input), // contrato a combinar com o back
      cache: "no-store",
    });
    if (!res.ok) {
      const message =
        res.status === 409
          ? "Já existe um colaborador com este e-mail."
          : res.status === 403
            ? "Você não tem permissão para esta ação."
            : "Não foi possível cadastrar.";
      return { ok: false, message };
    }
    return { ok: true, data: (await res.json()) as UserItem };
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}
