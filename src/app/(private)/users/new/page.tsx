import Link from "next/link";
import { UserPlus } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { NewUserForm } from "./_components/NewUserForm";

export default function NewUserPage() {
  return (
    <>
      <div id="title">
        <h4 className="flex gap-2">
          <UserPlus />
          Cadastrar Novo Colaborador
        </h4>
        <p className="text-muted-foreground mt-1 mb-6">
          Defina os dados e o cargo de acesso.{" "}
          <Link href="/users" className="underline">
            Voltar para a lista
          </Link>
        </p>
        <Separator />
      </div>
      <div className="mt-6">
        <NewUserForm />
      </div>
    </>
  );
}
