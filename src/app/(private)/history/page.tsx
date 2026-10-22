import { Suspense } from "react";
import Link from "next/link";
import Form from "next/form";
import { History, Search } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { listConversations } from "@/services/api/conversations";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo", // o servidor da Vercel roda em UTC
});

export default async function HistoryPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q: rawQ } = await searchParams;
  const q = (Array.isArray(rawQ) ? rawQ[0] : rawQ)?.trim() ?? "";

  return (
    <>
      <div id="title">
        <h4 className="flex gap-2">
          <History />
          Histórico de Análises
        </h4>
        <p className="text-muted-foreground mt-1 mb-6">Retome suas conversas anteriores.</p>
        <Separator />
      </div>

      <Form action="/history" className="my-6 max-w-md">
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <Search />
          </InputGroupAddon>
          <InputGroupInput name="q" defaultValue={q} placeholder="Buscar por título ou conteúdo" aria-label="Buscar conversas" />
        </InputGroup>
      </Form>

      <Suspense key={q} fallback={<ListSkeleton />}>
        <ConversationList query={q} />
      </Suspense>
    </>
  );
}

async function ConversationList({ query }: { query: string }) {
  const result = await listConversations(query);

  if (!result.ok) {
    return (
      <p role="alert" className="text-sm text-destructive">
        {result.message}
      </p>
    );
  }

  if (result.data.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        {query ? (
          <>
            <p>Nenhuma conversa encontrada para &quot;{query}&quot;.</p>
            <Link href="/history" className="underline">
              Limpar busca
            </Link>
          </>
        ) : (
          <>
            <p>Você ainda não tem conversas.</p>
            <Link href="/chats" className="underline">
              Iniciar uma conversa
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {result.data.map((c) => (
        <li key={c.id}>
          {/* TODO: levar para /chats/[id] quando o chat abrir uma conversa específica */}
          <Link href="/chats" className="flex flex-col gap-1 rounded-lg border bg-card p-4 transition-colors hover:bg-accent">
            <div className="flex items-start justify-between gap-4">
              <span className="font-medium">{c.title}</span>
              <time dateTime={c.updatedAt} className="shrink-0 text-xs text-muted-foreground">
                {dateFormatter.format(new Date(c.updatedAt))}
              </time>
            </div>
            <p className="line-clamp-2 text-sm text-muted-foreground">{c.preview}</p>
            <span className="text-xs text-muted-foreground">
              {c.messageCount} {c.messageCount === 1 ? "mensagem" : "mensagens"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ListSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-lg" />
      ))}
    </div>
  );
}
