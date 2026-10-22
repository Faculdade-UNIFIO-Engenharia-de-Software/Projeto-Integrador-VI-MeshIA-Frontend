import { cookies } from "next/headers";

export type DatabaseStatus = "online" | "syncing" | "offline";

export type DatabaseItem = {
  id: string;
  name: string;
  provider: string;
  company: string;
  status: DatabaseStatus;
  tables: number;
  latencyMs: number | null;
};

type Result<T> = { ok: true; data: T } | { ok: false; message: string };

const MOCK_DATABASES: DatabaseItem[] = [
  { id: "d1", name: "Vendas & ERP", provider: "PostgreSQL v16", company: "Empresa A (Matriz)", status: "online", tables: 18, latencyMs: 24 },
  { id: "d2", name: "Data Warehouse", provider: "Snowflake DW", company: "Corporativo Global", status: "online", tables: 42, latencyMs: 18 },
  { id: "d3", name: "E-commerce App", provider: "MySQL 8.0", company: "Plataforma Web", status: "online", tables: 12, latencyMs: 32 },
  { id: "d4", name: "Marketing Ops", provider: "Google BigQuery", company: "Campanhas & Ads", status: "syncing", tables: 8, latencyMs: null },
];

export async function listDatabases(): Promise<Result<DatabaseItem[]>> {
  if (process.env.USE_MOCK_API === "true") {
    await new Promise((r) => setTimeout(r, 250));
    return { ok: true, data: MOCK_DATABASES };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    const res = await fetch(`${process.env.API_URL}/databases`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        ok: false,
        message: res.status === 403 ? "Você não tem permissão para ver as bases." : "Não foi possível carregar as bases.",
      };
    }
    return { ok: true, data: (await res.json()) as DatabaseItem[] }; // contrato a combinar com o back
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}

export type NewDatabase = {
  name: string;
  provider: string;
  company: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
};

export async function createDatabase(input: NewDatabase): Promise<Result<DatabaseItem>> {
  if (process.env.USE_MOCK_API === "true") {
    await new Promise((r) => setTimeout(r, 400));
    if (MOCK_DATABASES.some((d) => d.name.toLowerCase() === input.name.toLowerCase())) {
      return { ok: false, message: "Já existe uma base com esse nome." };
    }
    // a senha NÃO é guardada nem devolvida, nem no mock
    const item: DatabaseItem = {
      id: `d${MOCK_DATABASES.length + 1}`,
      name: input.name,
      provider: input.provider,
      company: input.company,
      status: "syncing",
      tables: 0,
      latencyMs: null,
    };
    MOCK_DATABASES.push(item);
    return { ok: true, data: item };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    const res = await fetch(`${process.env.API_URL}/databases`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(input),
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        ok: false,
        message:
          res.status === 403
            ? "Você não tem permissão para cadastrar bases."
            : res.status === 409
              ? "Já existe uma base com esse nome."
              : "Não foi possível cadastrar a base.",
      };
    }
    return { ok: true, data: (await res.json()) as DatabaseItem }; // contrato a combinar com o back
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}
