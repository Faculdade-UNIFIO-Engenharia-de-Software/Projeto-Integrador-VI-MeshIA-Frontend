import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, UserPen } from "lucide-react";

import { listUsers } from "@/services/api/users";
import EditUserForm from "./_components/EditUserForm";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await listUsers();
  const user = res.ok ? res.data.find((u) => u.id === id) : undefined;
  if (!user) notFound();

  return (
    <div className="flex flex-col gap-6 py-2">
      <Link href={`/users?user=${user.id}`} className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1 text-sm">
        <ArrowLeft className="size-4" />
        Usuários & Equipes
      </Link>
      <header>
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <UserPen className="size-5" />
          Editar colaborador
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">{user.name}</p>
      </header>
      <EditUserForm user={user} />
    </div>
  );
}
