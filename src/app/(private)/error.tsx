"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

import { ErrorState } from "@/components/ErrorState";
import { Button, buttonVariants } from "@/components/ui/button";

export default function PrivateError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      icon={<TriangleAlert />}
      title="Algo deu errado"
      description="Não foi possível carregar esta página. Tente novamente; se o problema continuar, avise o suporte."
    >
      <Button onClick={reset}>Tentar novamente</Button>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Ir para o início
      </Link>
      {error.digest && <p className="w-full text-xs text-muted-foreground">Código do erro: {error.digest}</p>}
    </ErrorState>
  );
}
