import Link from "next/link";
import { Database } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { listDatabases, type DatabaseItem, type DatabaseStatus } from "@/services/api/databases";

const STATUS: Record<DatabaseStatus, { label: string; dot: string }> = {
  online: { label: "Online", dot: "bg-emerald-500" },
  syncing: { label: "Sincronizando", dot: "bg-amber-500 animate-pulse" },
  offline: { label: "Offline", dot: "bg-red-500" },
};

export default async function DataCatalogPage() {
  const res = await listDatabases();
  const databases = res.ok ? res.data : [];
  const onlineCount = databases.filter((d) => d.status === "online").length;
  const latencies = databases.flatMap((d) => (d.latencyMs === null ? [] : [d.latencyMs]));
  const avgLatency = latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : null;

  return (
    <>
      <div id="title">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h4 className="flex gap-2">
            <Database />
            Bases de Dados
          </h4>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h4 className="flex gap-2">
              <Database />
              Bases de Dados
            </h4>
            <Link href="/data-catalog/new" className={buttonVariants()}>
              Cadastrar nova base
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground mt-1 mb-6">Fontes de dados que o assistente pode consultar.</p>
        <Separator />
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {!res.ok ? (
          <p role="alert" className="text-sm text-destructive">
            {res.message}
          </p>
        ) : databases.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma base cadastrada.</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">{databases.length}</strong> {databases.length === 1 ? "base cadastrada" : "bases cadastradas"} ·{" "}
              {onlineCount} online
              {avgLatency !== null && ` · latência média ${avgLatency} ms`}
            </p>
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {databases.map((d) => (
                <li key={d.id}>
                  <DatabaseCard database={d} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

function DatabaseCard({ database }: { database: DatabaseItem }) {
  const status = STATUS[database.status];

  return (
    <article className="flex h-full flex-col gap-4 rounded-lg border bg-card p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs text-muted-foreground">{database.provider}</span>
        {database.latencyMs !== null && <Badge variant="outline">{database.latencyMs} ms</Badge>}
      </div>

      <div className="min-w-0">
        <h3 className="truncate text-base font-semibold">{database.name}</h3>
        <p className="truncate text-sm text-muted-foreground">{database.company}</p>
      </div>

      <dl className="mt-auto grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">Status</dt>
          <dd className="flex items-center gap-2 font-medium">
            <span aria-hidden className={cn("size-2 rounded-full", status.dot)} />
            {status.label}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Tabelas</dt>
          <dd className="font-medium">{database.tables} mapeadas</dd>
        </div>
      </dl>
      <Link href={`/data-catalog/${database.id}/edit`} className="text-muted-foreground hover:text-foreground w-fit text-xs underline">
        Editar
      </Link>
    </article>
  );
}
