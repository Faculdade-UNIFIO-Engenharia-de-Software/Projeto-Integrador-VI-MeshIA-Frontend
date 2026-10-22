import { cookies } from "next/headers";

export type Source = { database: string; table: string };
export type Answer = { text: string; sources: Source[] };

type Result<T> = { ok: true; data: T } | { ok: false; message: string };

export async function askQuestion(question: string): Promise<Result<Answer>> {
  if (process.env.USE_MOCK_API === "true") {
    await new Promise((r) => setTimeout(r, 1500));

    // Para testar o estado de erro: inclua [erro] na pergunta.
    if (question.includes("[erro]")) {
      return { ok: false, message: "Não foi possível analisar os dados agora." };
    }

    return {
      ok: true,
      data: {
        text: `Esta é uma resposta de exemplo (dados fictícios) para: "${question}". Quando o back-end estiver conectado, aqui vai a resposta gerada pelo agente com base nas bases autorizadas para o seu perfil.`,
        sources: [
          { database: "Vendas & ERP", table: "pedidos" },
          { database: "Data Warehouse", table: "fato_vendas" },
        ],
      },
    };
  }

  try {
    const token = (await cookies()).get("token")?.value;
    const res = await fetch(`${process.env.API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question }),
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        ok: false,
        message: res.status === 403 ? "Você não tem permissão para consultar essas bases." : "Não foi possível analisar os dados agora.",
      };
    }
    return { ok: true, data: (await res.json()) as Answer }; // contrato a combinar com o back
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}
