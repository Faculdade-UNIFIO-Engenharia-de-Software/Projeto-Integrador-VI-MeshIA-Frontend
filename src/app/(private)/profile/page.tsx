import { SquareUser } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, initials } from "@/lib/format";
import { findRole } from "@/lib/roles";
import { getMe, type Profile } from "@/services/api/me";
import { ThemeSelector } from "./_components/ThemeSelector";

export default async function ProfilePage() {
  const res = await getMe();

  return (
    <>
      <div id="title">
        <h4 className="flex gap-2">
          <SquareUser />
          Perfil
        </h4>
        <p className="text-muted-foreground mt-1 mb-6">Seus dados na plataforma e preferências.</p>
        <Separator />
      </div>

      <div className="mt-6 flex max-w-2xl flex-col gap-6">
        {!res.ok ? (
          <p role="alert" className="text-sm text-destructive">
            {res.message}
          </p>
        ) : (
          <ProfileCard profile={res.data} />
        )}

        <section aria-labelledby="appearance-title" className="rounded-lg border bg-card p-6">
          <h5 id="appearance-title" className="mb-1 font-semibold">
            Aparência
          </h5>
          <p className="mb-4 text-sm text-muted-foreground">Escolha o tema da interface.</p>
          <ThemeSelector />
        </section>
      </div>
    </>
  );
}

function ProfileCard({ profile }: { profile: Profile }) {
  const role = findRole(profile.role);

  return (
    <section aria-label="Dados do usuário" className="rounded-lg border bg-card p-6">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar>
          <AvatarFallback>{initials(profile.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <Badge variant="secondary">{role?.label ?? profile.role}</Badge>
          </div>
          <p className="truncate text-sm text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      <Separator className="my-6" />

      <dl className="grid gap-4 sm:grid-cols-2">
        <Info label="Cargo" value={profile.jobTitle} />
        <Info label="Unidade / Departamento" value={profile.department} />
        <Info label="Último acesso" value={profile.lastAccess ? formatDateTime(profile.lastAccess) : "Primeiro acesso"} />
        <Info label="Cargo de acesso" value={role?.label ?? profile.role} />
      </dl>

      {role && <p className="mt-4 text-sm text-muted-foreground">{role.description}</p>}
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}
