import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Database } from "lucide-react";

import { PROVIDERS } from "@/lib/db-providers";
import { getDatabase } from "@/services/api/databases";
import NewDatabaseForm from "../../new/_components/NewDatabaseForm";

export default async function EditDatabasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getDatabase(id);
  if (!res.ok) notFound();

  // o provedor salvo pode vir com versão ("PostgreSQL v16"); casa com a opção do select
  const provider = PROVIDERS.find((p) => res.data.provider.startsWith(p.value))?.value ?? PROVIDERS[0].value;

  return (
    <div className="flex flex-col gap-6 py-2">
      <Link href="/data-catalog" className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1 text-sm">
        <ArrowLeft className="size-4" />
        Bases de Dados
      </Link>
      <header>
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Database className="size-5" />
          Editar base
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">{res.data.name}</p>
      </header>
      <NewDatabaseForm database={{ ...res.data, provider }} />
    </div>
  );
}
