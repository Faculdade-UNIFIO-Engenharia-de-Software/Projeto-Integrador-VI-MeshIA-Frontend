import Link from "next/link";
import { Users } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { listTeams, type TeamItem } from "@/services/api/users";

export default async function Squads() {
  const res = await listTeams();
  const teams = res.ok ? res.data : [];

  return (
    <>
      <div id="title">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h4 className="flex gap-2">
            <Users />
            Squads
          </h4>
          <Link href="/squads/new" className={buttonVariants()}>
            Criar nova equipe
          </Link>
        </div>
        <p className="text-muted-foreground mt-1 mb-6">Equipes da organização e seus líderes.</p>
        <Separator />
      </div>

      <div className="mt-6">
        {!res.ok ? (
          <p role="alert" className="text-destructive text-sm">
            {res.message}
          </p>
        ) : teams.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nenhuma equipe cadastrada.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {teams.map((t) => (
              <li key={t.id}>
                <TeamCard team={t} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function TeamCard({ team }: { team: TeamItem }) {
  return (
    <article className="bg-card flex h-full flex-col gap-3 rounded-lg border p-4">
      <div className="min-w-0">
        <h3 className="truncate text-base font-semibold">{team.name}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">{team.description || "Sem descrição."}</p>
      </div>
      <dl className="mt-auto grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-muted-foreground text-xs">Membros</dt>
          <dd className="font-medium">{team.members}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-xs">Líder</dt>
          <dd className="truncate font-medium">{team.leadName ?? "—"}</dd>
        </div>
      </dl>
    </article>
  );
}
