'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className=" min-h-screen  bg-grid">
      <div className="relative h-screen flex flex-col items-center justify-center gap-4 text-center ">
        <div className="px-4 py-0.5 flex items-center justify-center gap-2 border rounded-full bg-slate-900 border-slate-800 text-slate-100 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
          HTTP 404 • NOT FOUND ERROR
        </div>
        <div className="text-9xl font-extrabold text-primary">
          404
        </div>
        <div className="text-slate-600 font-medium text-2xl">
          Rota não encontrada!
          <p className="font-jetbrains my-4">O Recurso procurado não foi encontrado...</p>
        </div>
        <Button variant="outline" className="w-100 border border-slate-300 hover:border-primary shadow-ring hover:shadow-lg hover:bg-white ">
          <Link href="/" >
            Voltar ao Início
          </Link>
        </Button>
     </div>
    </div>
  )
}
