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
    MOCK_CONNECTIONS[item.id] = {
      host: input.host,
      port: input.port,
      database: input.database,
      username: input.username,
    };
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
export type DatabaseConnection = {
  host: string;
  port: number;
  database: string;
  username: string;
};
export type DatabaseDetail = DatabaseItem & DatabaseConnection;
export type UpdateDatabase = Omit<NewDatabase, "password"> & { password?: string };

// Dados de conexão do mock (a senha nunca é guardada).
const MOCK_CONNECTIONS: Record<string, DatabaseConnection> = {
  d1: { host: "erp.empresa.local", port: 5432, database: "vendas_prod", username: "leitura" },
  d2: { host: "empresa.snowflakecomputing.com", port: 443, database: "dw_corp", username: "leitura" },
  d3: { host: "shop-db.empresa.local", port: 3306, database: "ecommerce", username: "leitura" },
  d4: { host: "bigquery.googleapis.com", port: 443, database: "marketing_ops", username: "leitura" },
};

export async function getDatabase(id: string): Promise<Result<DatabaseDetail>> {
  if (process.env.USE_MOCK_API === "true") {
    await new Promise((r) => setTimeout(r, 200));
    const item = MOCK_DATABASES.find((d) => d.id === id);
    if (!item) return { ok: false, message: "Base não encontrada." };
    const conn = MOCK_CONNECTIONS[id] ?? { host: "", port: 5432, database: "", username: "" };
    return { ok: true, data: { ...item, ...conn } };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    const res = await fetch(`${process.env.API_URL}/databases/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        ok: false,
        message:
          res.status === 404
            ? "Base não encontrada."
            : res.status === 403
              ? "Você não tem permissão para ver essa base."
              : "Não foi possível carregar a base.",
      };
    }
    return { ok: true, data: (await res.json()) as DatabaseDetail }; // nunca deve conter a senha
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}

export async function updateDatabase(id: string, input: UpdateDatabase): Promise<Result<DatabaseItem>> {
  if (process.env.USE_MOCK_API === "true") {
    await new Promise((r) => setTimeout(r, 400));
    const item = MOCK_DATABASES.find((d) => d.id === id);
    if (!item) return { ok: false, message: "Base não encontrada." };
    if (MOCK_DATABASES.some((d) => d.id !== id && d.name.toLowerCase() === input.name.toLowerCase())) {
      return { ok: false, message: "Já existe uma base com esse nome." };
    }
    item.name = input.name;
    item.provider = input.provider;
    item.company = input.company;
    MOCK_CONNECTIONS[id] = {
      host: input.host,
      port: input.port,
      database: input.database,
      username: input.username,
    };
    return { ok: true, data: item };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    const { password, ...rest } = input;
    const res = await fetch(`${process.env.API_URL}/databases/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      // a senha só vai se foi digitada
      body: JSON.stringify(password ? { ...rest, password } : rest),
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        ok: false,
        message:
          res.status === 403
            ? "Você não tem permissão para editar bases."
            : res.status === 404
              ? "Base não encontrada."
              : res.status === 409
                ? "Já existe uma base com esse nome."
                : "Não foi possível salvar a base.",
      };
    }
    return { ok: true, data: (await res.json()) as DatabaseItem }; // contrato a combinar com o back
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}
