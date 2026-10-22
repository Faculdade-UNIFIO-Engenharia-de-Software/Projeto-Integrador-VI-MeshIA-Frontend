import Link from "next/link";
import { History } from "lucide-react";

import { formatDateTime } from "@/lib/format";
import { listConversations } from "@/services/api/conversations";

const LIMIT = 5;

export default async function RecentConversations() {
  const result = await listConversations();

  return (
    <section aria-label="Consultas recentes" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-muted-foreground flex items-center gap-1.5 text-sm font-medium">
          <History className="size-4" />
          Consultas recentes
        </h2>
        <Link href="/history" className="text-muted-foreground hover:text-foreground text-sm">
          Ver histórico completo
        </Link>
      </div>

      {!result.ok ? (
        <p className="text-muted-foreground rounded-xl border border-dashed p-4 text-sm">{result.message}</p>
      ) : result.data.length === 0 ? (
        <p className="text-muted-foreground rounded-xl border border-dashed p-4 text-sm">Você ainda não fez nenhuma consulta.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {result.data.slice(0, LIMIT).map((c) => (
            <li key={c.id}>
              <Link
                href={`/chats/nova?q=${encodeURIComponent(c.preview)}`}
                className="hover:bg-accent flex flex-col gap-0.5 rounded-xl border p-3 transition-colors"
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="truncate font-medium">{c.title}</span>
                  <span className="text-muted-foreground shrink-0 text-xs">{formatDateTime(c.updatedAt)}</span>
                </span>
                <span className="text-muted-foreground truncate text-sm">{c.preview}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
