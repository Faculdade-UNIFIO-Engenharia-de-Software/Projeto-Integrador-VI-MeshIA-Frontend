"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-grid">
      <div className="relative flex h-screen flex-col items-center justify-center gap-4 text-center">
        <div className="flex animate-bounce items-center justify-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-0.5 text-slate-100">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          ERRO INESPERADO
        </div>
        <div className="text-9xl font-extrabold text-primary">500</div>
        <div className="text-2xl font-medium text-slate-600">
          Algo deu errado!
          <p className="font-jetbrains my-4 text-base">Não foi possível carregar esta página...</p>
        </div>
        {error.digest && <p className="text-xs text-slate-500">Código do erro: {error.digest}</p>}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button onClick={reset}>Tentar novamente</Button>
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}
