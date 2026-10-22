import Link from "next/link";
import Form from "next/form";
import { Search, UserPlus, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, initials } from "@/lib/format";
import { findRole } from "@/lib/roles";
import { cn } from "@/lib/utils";
import { getUser, listTeams, listUsers, type UserItem } from "@/services/api/users";
import { UserAccessForm } from "./_components/UserAccessForm";
import { buttonVariants } from "@/components/ui/button";

type SearchParams = Promise<{ q?: string | string[]; user?: string | string[] }>;

const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v)?.trim() ?? "";

export default async function UsersPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = first(sp.q);
  const requestedId = first(sp.user);

  const [usersRes, teamsRes] = await Promise.all([listUsers(q), listTeams()]);

  const users = usersRes.ok ? usersRes.data : [];
  const selectedId = requestedId || users[0]?.id || "";
  const selectedRes = selectedId ? await getUser(selectedId) : null;
  const activeCount = users.filter((u) => u.status === "active").length;

  const hrefFor = (id: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    params.set("user", id);
    return `/users?${params.toString()}`;
  };

  return (
    <>
      <div id="title">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h4 className="flex gap-2">
            <Users />
            Usuários & Equipes
          </h4>
          <Link href="/users/new" className={buttonVariants()}>
            <UserPlus />
            Novo colaborador
          </Link>
        </div>
        <p className="text-muted-foreground mt-1 mb-6">Gerencie colaboradores, cargos e equipes.</p>
        <Separator />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[22rem_1fr]">
        <div className="flex min-w-0 flex-col gap-6">
          <section aria-labelledby="collab-title" className="rounded-lg border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <h5 id="collab-title" className="font-semibold">
                Colaboradores
              </h5>
              <Badge variant="secondary">{activeCount} ativos</Badge>
            </div>

            <Form action="/users" className="mb-3">
              {selectedId && <input type="hidden" name="user" value={selectedId} />}
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <Search />
                </InputGroupAddon>
                <InputGroupInput name="q" defaultValue={q} placeholder="Filtrar por nome, cargo ou e-mail" aria-label="Filtrar colaboradores" />
              </InputGroup>
            </Form>

            {!usersRes.ok ? (
              <p role="alert" className="text-sm text-destructive">
                {usersRes.message}
              </p>
            ) : users.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum colaborador encontrado.</p>
            ) : (
              <ul className="flex flex-col gap-1">
                {users.map((u) => (
                  <li key={u.id}>
                    <UserListItem user={u} href={hrefFor(u.id)} selected={u.id === selectedId} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="teams-title" className="rounded-lg border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <h5 id="teams-title" className="font-semibold">
                Equipes & Squads
              </h5>
              <Link href="/squads" className="text-xs text-muted-foreground underline">
                Ver todas
              </Link>
            </div>
            {!teamsRes.ok ? (
              <p role="alert" className="text-sm text-destructive">
                {teamsRes.message}
              </p>
            ) : (
              <ul className="flex flex-col gap-1">
                {teamsRes.data.map((t) => (
                  <li key={t.id} className="flex items-center justify-between gap-2 rounded-md p-2 text-sm">
                    <span className="truncate">{t.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{t.members} membros</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="min-w-0">
          {!selectedRes ? (
            <p className="text-sm text-muted-foreground">Selecione um colaborador.</p>
          ) : !selectedRes.ok ? (
            <p role="alert" className="text-sm text-destructive">
              {selectedRes.message}
            </p>
          ) : (
            <UserDetail user={selectedRes.data} />
          )}
        </div>
      </div>
    </>
  );
}

function UserListItem({ user, href, selected }: { user: UserItem; href: string; selected: boolean }) {
  return (
    <Link
      href={href}
      aria-current={selected ? "true" : undefined}
      className={cn("flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-accent", selected && "bg-accent")}
    >
      <Avatar>
        <AvatarFallback>{initials(user.name)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{user.name}</p>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      </div>
      <Badge variant="outline" className="shrink-0">
        {user.jobTitle}
      </Badge>
    </Link>
  );
}

function UserDetail({ user }: { user: UserItem }) {
  const role = findRole(user.role);

  return (
    <section className="rounded-lg border bg-card p-6">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar>
          <AvatarFallback>{initials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <Badge variant="secondary">{role?.label ?? user.role}</Badge>
            {user.status === "suspended" && <Badge variant="destructive">Suspenso</Badge>}
          </div>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
        </div>

        <Link href={`/users/${user.id}/edit`} className="text-muted-foreground hover:text-foreground text-xs underline">
          Editar dados
        </Link>
      </div>

      <Separator className="my-6" />

      <dl className="grid gap-4 sm:grid-cols-2">
        <Info label="Cargo" value={user.jobTitle} />
        <Info label="Unidade / Departamento" value={user.department} />
        <Info label="Último acesso" value={user.lastAccess ? formatDateTime(user.lastAccess) : "Nunca acessou"} />
        <Info label="Situação" value={user.status === "active" ? "Ativo" : "Suspenso"} />
      </dl>

      <Separator className="my-6" />

      <UserAccessForm key={`${user.id}-${user.role}-${user.status}`} id={user.id} role={user.role} status={user.status} />
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
