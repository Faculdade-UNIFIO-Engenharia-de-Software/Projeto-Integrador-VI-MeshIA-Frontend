import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Users } from "lucide-react";

import { deleteTeamAction } from "@/actions/squads/deleteTeamAction";
import DangerZone from "@/components/DangerZone";
import { getTeam, listUsers } from "@/services/api/users";
import NewSquadForm from "../../new/_components/NewSquadForm";

export default async function EditSquadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [teamRes, usersRes] = await Promise.all([getTeam(id), listUsers()]);
  if (!teamRes.ok) notFound();

  const users = usersRes.ok ? usersRes.data.map((u) => ({ id: u.id, name: u.name })) : [];

  return (
    <div className="flex flex-col gap-6 py-2">
      <Link href="/squads" className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1 text-sm">
        <ArrowLeft className="size-4" />
        Squads
      </Link>
      <header>
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Users className="size-5" />
          Editar equipe
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">{teamRes.data.name}</p>
      </header>

      <NewSquadForm users={users} team={teamRes.data} />

      <DangerZone
        id={teamRes.data.id}
        action={deleteTeamAction}
        buttonLabel="Excluir equipe"
        description="Excluir a equipe não exclui os colaboradores: eles apenas deixam de pertencer a ela."
      />
    </div>
  );
}
