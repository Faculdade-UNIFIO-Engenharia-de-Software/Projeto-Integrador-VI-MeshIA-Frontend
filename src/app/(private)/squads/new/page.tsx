import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";

import { listUsers } from "@/services/api/users";
import NewSquadForm from "./_components/NewSquadForm";

export default async function NewSquadPage() {
  const res = await listUsers();
  const users = res.ok ? res.data.map((u) => ({ id: u.id, name: u.name })) : [];

  return (
    <div className="flex flex-col gap-6 py-2">
      <Link href="/squads" className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1 text-sm">
        <ArrowLeft className="size-4" />
        Squads
      </Link>
      <header>
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Users className="size-5" />
          Criar nova equipe
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">Defina o nome, a descrição e quem lidera a equipe.</p>
      </header>
      {!res.ok && (
        <p role="alert" className="text-destructive text-sm">
          {res.message}
        </p>
      )}
      <NewSquadForm users={users} />
    </div>
  );
}
