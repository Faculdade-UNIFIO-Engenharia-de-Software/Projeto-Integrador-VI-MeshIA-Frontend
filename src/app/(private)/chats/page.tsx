import Form from "next/form";
import Link from "next/link";
import { Database, FileText, Boxes, Sparkles, TrendingUp, Users, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMe } from "@/services/api/me";
import { listDatabases } from "@/services/api/databases";

// Edite aqui para bater com o Figma (título, descrição, pergunta enviada).
const QUICK_ACTIONS = [
  { icon: TrendingUp, title: "Resumo de vendas", description: "Visão geral do período", question: "Faça um resumo das vendas do último mês" },
  { icon: Users, title: "Análise de clientes", description: "Perfil e comportamento", question: "Quais são os perfis de clientes mais frequentes?" },
  {
    icon: Wallet,
    title: "Indicadores financeiros",
    description: "Receitas e despesas",
    question: "Mostre os principais indicadores financeiros do trimestre",
  },
  { icon: Boxes, title: "Estoque e logística", description: "Níveis e giro", question: "Quais produtos estão com estoque baixo?" },
  { icon: FileText, title: "Relatório personalizado", description: "Monte sua consulta", question: "Quero montar um relatório personalizado" },
] as const;

const EXAMPLES = ["Qual foi o faturamento de setembro?", "Quais clientes mais compraram neste ano?", "Compare as vendas dos dois últimos trimestres"];

function chatHref(question: string) {
  return `/chats/nova?q=${encodeURIComponent(question)}`;
}

export default async function Chats() {
  const [me, databases] = await Promise.all([getMe(), listDatabases()]);

  const firstName = me.ok ? me.data.name.split(" ")[0] : null;
  const bases = databases.ok ? databases.data : [];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 py-6">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="flex items-center justify-center gap-2 text-2xl font-semibold">
          <Sparkles className="size-6" />
          {firstName ? `Olá, ${firstName}!` : "Olá!"}
        </h1>
        <p className="text-muted-foreground">O que você quer saber sobre os dados da sua organização?</p>
        <p className="text-muted-foreground flex items-center justify-center gap-1.5 text-sm">
          <Database className="size-4" />
          {bases.length > 0 ? `${bases.length} ${bases.length === 1 ? "base ativa" : "bases ativas"}` : "Nenhuma base disponível"}
        </p>
      </header>

      <Form action="/chats/nova" className="flex gap-2">
        <Input
          name="q"
          required
          minLength={3}
          maxLength={500}
          placeholder="Faça uma pergunta em linguagem natural..."
          aria-label="Pergunta"
          className="h-11"
        />
        <Button type="submit" className="h-11 px-5">
          Analisar
        </Button>
      </Form>

      <section aria-label="Ações rápidas" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_ACTIONS.map(({ icon: Icon, title, description, question }) => (
          <Link key={title} href={chatHref(question)} className="hover:bg-accent flex flex-col gap-1 rounded-xl border p-4 transition-colors">
            <Icon className="text-muted-foreground size-5" />
            <span className="font-medium">{title}</span>
            <span className="text-muted-foreground text-sm">{description}</span>
          </Link>
        ))}
      </section>

      <section aria-label="Exemplos de perguntas" className="flex flex-col gap-2">
        <h2 className="text-muted-foreground text-sm font-medium">Exemplos de perguntas</h2>
        <ul className="flex flex-wrap gap-2">
          {EXAMPLES.map((example) => (
            <li key={example}>
              <Link href={chatHref(example)} className="hover:bg-accent rounded-full border px-3 py-1.5 text-sm transition-colors">
                {example}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
