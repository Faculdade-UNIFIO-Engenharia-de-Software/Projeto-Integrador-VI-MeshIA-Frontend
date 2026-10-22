import Link from "next/link";
import { ArrowLeft, Database } from "lucide-react";

import NewDatabaseForm from "./_components/NewDatabaseForm";

export default function NewDatabasePage() {
  return (
    <div className="flex flex-col gap-6 py-2">
      <Link href="/data-catalog" className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1 text-sm">
        <ArrowLeft className="size-4" />
        Bases de Dados
      </Link>
      <header>
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Database className="size-5" />
          Nova conexão de base
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">Conecte uma base para que o agente possa consultá-la.</p>
      </header>
      <NewDatabaseForm />
    </div>
  );
}
