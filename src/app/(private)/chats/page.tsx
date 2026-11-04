import Form from "next/form";
import Link from "next/link";
import { Database, FileText, Boxes, Sparkles, TrendingUp, Users, Wallet } from "lucide-react";
import { Suspense } from "react";

import RecentConversations from "./_components/RecentConversations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMe } from "@/services/api/me";
import { listDatabases } from "@/services/api/databases";

export const dynamic = "force-dynamic";

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
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 py-10">
      <header className="flex flex-col gap-3 text-center">
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

      <Form action="/chats/nova" className="flex gap-3">
        <Input
          name="q"
          required
          minLength={3}
          maxLength={500}
          placeholder="Faça uma pergunta em linguagem natural..."
          aria-label="Pergunta"
          className="h-12 rounded-2xl px-5 shadow-soft"
        />
        <Button type="submit" className="h-12 rounded-2xl px-7">
          Analisar
        </Button>
      </Form>

      <section aria-label="Ações rápidas" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_ACTIONS.map(({ icon: Icon, title, description, question }) => (
          <Link
            key={title}
            href={chatHref(question)}
            className="flex flex-col gap-1.5 rounded-2xl bg-card p-5 shadow-soft ring-1 ring-foreground/[0.06] transition-[box-shadow,transform,background-color] duration-300 ease-soft hover:-translate-y-0.5 hover:bg-accent/50 hover:shadow-float"
          >
            <span className="bg-primary/15 mb-2 flex size-10 items-center justify-center rounded-xl">
              <Icon className="size-5" />
            </span>
            <span className="font-medium">{title}</span>
            <span className="text-muted-foreground text-sm">{description}</span>
          </Link>
        ))}
      </section>

      <section aria-label="Exemplos de perguntas" className="flex flex-col gap-3.5 pt-2">
        <h2 className="text-muted-foreground text-sm font-medium">Exemplos de perguntas</h2>
        <ul className="flex flex-wrap gap-3">
          {EXAMPLES.map((example) => (
            <li key={example}>
              <Link
                href={chatHref(example)}
                className="bg-secondary/70 hover:bg-accent hover:shadow-soft inline-flex items-center rounded-full px-4.5 py-2.5 text-sm ring-1 ring-foreground/[0.06] transition-[background-color,box-shadow,transform] duration-200 ease-soft hover:-translate-y-0.5"
              >
                {example}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Suspense fallback={<p className="text-muted-foreground text-sm">Carregando consultas recentes...</p>}>
        <RecentConversations />
      </Suspense>
    </div>
  );
}
