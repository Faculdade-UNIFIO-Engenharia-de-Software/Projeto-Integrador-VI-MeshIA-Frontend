import { cookies } from "next/headers";

export type ConversationSummary = {
  id: string;
  title: string;
  preview: string;
  messageCount: number;
  updatedAt: string;
};

type ListResult = { ok: true; data: ConversationSummary[] } | { ok: false; message: string };

const USE_MOCK = process.env.USE_MOCK_API === "true";

const MOCK: ConversationSummary[] = [
  {
    id: "c1",
    title: "Política de reembolso",
    preview: "Qual é o prazo para solicitar reembolso de despesas de viagem?",
    messageCount: 6,
    updatedAt: "2026-10-14T16:42:00-03:00",
  },
  {
    id: "c2",
    title: "Indicadores do último trimestre",
    preview: "Resuma os principais indicadores de vendas do trimestre.",
    messageCount: 12,
    updatedAt: "2026-10-13T09:15:00-03:00",
  },
  {
    id: "c3",
    title: "Onboarding de novos gestores",
    preview: "Onde encontro o material de integração para gestores?",
    messageCount: 4,
    updatedAt: "2026-10-10T14:30:00-03:00",
  },
  {
    id: "c4",
    title: "Processo de homologação de fornecedores",
    preview: "Quais documentos são exigidos para cadastrar um fornecedor?",
    messageCount: 8,
    updatedAt: "2026-10-08T11:05:00-03:00",
  },
  {
    id: "c5",
    title: "Dashboards de logística",
    preview: "Qual dashboard mostra o prazo médio de entrega por região?",
    messageCount: 3,
    updatedAt: "2026-10-02T17:50:00-03:00",
  },
  {
    id: "c6",
    title: "Regras de acesso por perfil",
    preview: "O que um analista pode consultar que um visualizador não pode?",
    messageCount: 1,
    updatedAt: "2026-09-29T08:20:00-03:00",
  },
];

export function recordMockConversation(question: string) {
  const q = question.trim();
  const now = new Date().toISOString();
  const existing = MOCK.find((c) => c.preview === q);
  if (existing) {
    existing.updatedAt = now;
    return;
  }
  MOCK.unshift({
    id: `c${MOCK.length + 1}`,
    title: q.length > 60 ? `${q.slice(0, 57)}...` : q,
    preview: q,
    messageCount: 2,
    updatedAt: now,
  });
}

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export async function listConversations(query?: string): Promise<ListResult> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 400));
    const q = normalize(query?.trim() ?? "");
    const data = MOCK.filter((c) => !q || normalize(c.title).includes(q) || normalize(c.preview).includes(q)).sort(
      (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
    );
    return { ok: true, data };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    const url = new URL(`${process.env.API_URL}/conversations`);
    if (query) url.searchParams.set("q", query);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return { ok: false, message: "Não foi possível carregar o histórico." };

    return { ok: true, data: await res.json() };
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}
