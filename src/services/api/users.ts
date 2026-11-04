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

export type TeamItem = {
  id: string;
  name: string;
  members: number;
  description?: string;
  leadId?: string | null;
  leadName?: string | null;
};

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

export const MOCK_TEAMS: TeamItem[] = [
  {
    id: "team-eng",
    name: "Engenharia de Dados",
    description: "Desenvolvimento de pipelines, modelagem de dados e governança de integrações.",
    members: 8,
    leadName: "Herbert Santos",
  },
  {
    id: "team-ai",
    name: "Inteligência Artificial",
    description: "Pesquisa, fine-tuning e orquestração de LLMs e agentes de análise preditiva.",
    members: 5,
    leadName: "Ana Beatriz",
  },
  {
    id: "team-fin",
    name: "Indicadores Financeiros",
    description: "Consolidação contábil, previsibilidade de receita e auditoria de métricas.",
    members: 4,
    leadName: "Carlos Eduardo",
  },
  {
    id: "team-ops",
    name: "Operações & Logística",
    description: "Monitoramento de estoque, giro de mercadorias e eficiência de distribuição.",
    members: 6,
    leadName: "Mariana Souza",
  },
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

export type NewTeam = {
  name: string;
  description: string;
  leadId: string;
  leadName: string;
};

export async function createTeam(input: NewTeam): Promise<Result<TeamItem>> {
  if (process.env.USE_MOCK_API === "true") {
    await new Promise((r) => setTimeout(r, 400));
    if (MOCK_TEAMS.some((t) => t.name.toLowerCase() === input.name.toLowerCase())) {
      return { ok: false, message: "Já existe uma equipe com esse nome." };
    }
    const team: TeamItem = {
      id: `t${Date.now()}`,
      name: input.name,
      members: 1, // o líder conta como primeiro membro
      description: input.description,
      leadId: input.leadId,
    };
    MOCK_TEAMS.push(team);
    return { ok: true, data: team };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    const res = await fetch(`${process.env.API_URL}/teams`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: input.name, description: input.description, leadId: input.leadId }),
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        ok: false,
        message:
          res.status === 403
            ? "Você não tem permissão para criar equipes."
            : res.status === 409
              ? "Já existe uma equipe com esse nome."
              : "Não foi possível criar a equipe.",
      };
    }
    return { ok: true, data: (await res.json()) as TeamItem }; // contrato a combinar com o back
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}

export type UserProfileUpdate = { name: string; jobTitle: string; department: string };

export async function updateUserProfile(id: string, input: UserProfileUpdate): Promise<Result<UserItem>> {
  if (USE_MOCK) {
    await delay(400);
    const user = MOCK_USERS.find((u) => u.id === id);
    if (!user) return { ok: false, message: "Colaborador não encontrado." };
    user.name = input.name;
    user.jobTitle = input.jobTitle;
    user.department = input.department;
    return { ok: true, data: user };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    const res = await fetch(`${process.env.API_URL}/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(input),
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        ok: false,
        message:
          res.status === 403
            ? "Você não tem permissão para editar colaboradores."
            : res.status === 404
              ? "Colaborador não encontrado."
              : "Não foi possível salvar os dados.",
      };
    }
    return { ok: true, data: (await res.json()) as UserItem }; // contrato a combinar com o back
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}

export async function deleteTeam(id: string): Promise<Result<null>> {
  if (USE_MOCK) {
    await delay(400);
    const index = MOCK_TEAMS.findIndex((t) => t.id === id);
    if (index === -1) return { ok: false, message: "Equipe não encontrada." };
    MOCK_TEAMS.splice(index, 1);
    return { ok: true, data: null };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    const res = await fetch(`${process.env.API_URL}/teams/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        ok: false,
        message:
          res.status === 403
            ? "Você não tem permissão para excluir equipes."
            : res.status === 404
              ? "Equipe não encontrada."
              : res.status === 409
                ? "Não é possível excluir: a equipe ainda tem vínculos."
                : "Não foi possível excluir a equipe.",
      };
    }
    return { ok: true, data: null }; // 204 sem corpo
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}

export type TeamUpdate = {
  name: string;
  description: string;
  leadId: string;
  leadName: string;
};

export async function getTeam(id: string): Promise<Result<TeamItem>> {
  if (USE_MOCK) {
    await delay(200);
    const team = MOCK_TEAMS.find((t) => t.id === id);
    return team ? { ok: true, data: team } : { ok: false, message: "Equipe não encontrada." };
  }
  return apiGet<TeamItem>(`/teams/${id}`);
}

export async function updateTeam(id: string, input: TeamUpdate): Promise<Result<TeamItem>> {
  if (USE_MOCK) {
    await delay(400);
    const team = MOCK_TEAMS.find((t) => t.id === id);
    if (!team) return { ok: false, message: "Equipe não encontrada." };
    if (MOCK_TEAMS.some((t) => t.id !== id && t.name.toLowerCase() === input.name.toLowerCase())) {
      return { ok: false, message: "Já existe uma equipe com esse nome." };
    }
    team.name = input.name;
    team.description = input.description;
    team.leadId = input.leadId;
    team.leadName = input.leadName;
    return { ok: true, data: team };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    const res = await fetch(`${process.env.API_URL}/teams/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: input.name, description: input.description, leadId: input.leadId }),
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        ok: false,
        message:
          res.status === 403
            ? "Você não tem permissão para editar equipes."
            : res.status === 404
              ? "Equipe não encontrada."
              : res.status === 409
                ? "Já existe uma equipe com esse nome."
                : "Não foi possível salvar a equipe.",
      };
    }
    return { ok: true, data: (await res.json()) as TeamItem }; // contrato a combinar com o back
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}
