import { cookies } from "next/headers";

import { recordMockConversation } from "./conversations";

export type Source = { database: string; table: string };
export type Answer = { text: string; sources: Source[] };

type Result<T> = { ok: true; data: T } | { ok: false; message: string };

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const MOCK_ANSWERS: { keywords: string[]; answer: Answer }[] = [
  {
    keywords: ["venda", "faturamento", "receita"],
    answer: {
      text: "Resumo de vendas (setembro/2026)\n\n• Faturamento: R$ 1,84 mi (+7,2% sobre agosto)\n• Pedidos: 3.412, com ticket médio de R$ 539\n• Maior crescimento: região Sul (+11%)\n• Categoria líder: Eletrônicos (38% da receita)\n\nDados fictícios para demonstração.",
      sources: [
        { database: "Vendas & ERP", table: "pedidos" },
        { database: "Data Warehouse", table: "fato_vendas" },
      ],
    },
  },
  {
    keywords: ["cliente"],
    answer: {
      text: "Perfil dos clientes mais frequentes\n\n• 62% compram ao menos 1 vez por mês\n• Faixa de 25 a 44 anos concentra 71% dos pedidos\n• Os 50 maiores clientes geram 34% da receita\n• Taxa de recompra em 90 dias: 48%\n\nDados fictícios para demonstração.",
      sources: [
        { database: "E-commerce App", table: "clientes" },
        { database: "Data Warehouse", table: "dim_cliente" },
      ],
    },
  },
  {
    keywords: ["financ", "despesa", "lucro", "indicador"],
    answer: {
      text: "Indicadores financeiros do trimestre\n\n• Receita líquida: R$ 5,3 mi\n• Despesas operacionais: R$ 3,1 mi (58% da receita)\n• Margem operacional: 21%\n• Inadimplência: 2,4% (queda de 0,6 p.p.)\n\nDados fictícios para demonstração.",
      sources: [
        { database: "Data Warehouse", table: "fato_financeiro" },
        { database: "Vendas & ERP", table: "contas_receber" },
      ],
    },
  },
  {
    keywords: ["estoque", "logistica", "produto", "entrega"],
    answer: {
      text: "Estoque e logística\n\n• 14 produtos abaixo do estoque mínimo\n• Giro médio de estoque: 5,2x ao ano\n• Prazo médio de entrega: 3,8 dias (Sudeste 2,9, Norte 6,1)\n• Taxa de entrega no prazo: 93%\n\nDados fictícios para demonstração.",
      sources: [
        { database: "Vendas & ERP", table: "estoque" },
        { database: "Marketing Ops", table: "entregas" },
      ],
    },
  },
  {
    keywords: ["acesso", "perfil", "permiss"],
    answer: {
      text: "Acesso por perfil\n\n• Administrador: gerencia usuários, equipes e bases\n• Analista Sênior: consulta todas as fontes permitidas\n• Analista Júnior: consulta com acesso mais restrito\n• Visualizador: apenas leitura de conversas e resumos\n\nO agente só responde com dados das bases autorizadas ao seu perfil.",
      sources: [{ database: "Data Warehouse", table: "politicas_acesso" }],
    },
  },
];

const DEFAULT_ANSWER: Answer = {
  text: "Encontrei informações relacionadas à sua pergunta nas bases autorizadas ao seu perfil.\n\nEsta é uma resposta de demonstração: com o back-end conectado, o agente (RAG + LLM) gera aqui a resposta a partir dos dados da organização.",
  sources: [{ database: "Data Warehouse", table: "fato_vendas" }],
};

function mockAnswer(question: string): Answer {
  const q = normalize(question);
  return MOCK_ANSWERS.find((a) => a.keywords.some((k) => q.includes(k)))?.answer ?? DEFAULT_ANSWER;
}

export async function askQuestion(question: string): Promise<Result<Answer>> {
  if (process.env.USE_MOCK_API === "true") {
    await new Promise((r) => setTimeout(r, 1500));

    // Para testar o estado de erro: inclua [erro] na pergunta.
    if (question.includes("[erro]")) {
      return { ok: false, message: "Não foi possível analisar os dados agora." };
    }

    recordMockConversation(question);
    return { ok: true, data: mockAnswer(question) };
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
