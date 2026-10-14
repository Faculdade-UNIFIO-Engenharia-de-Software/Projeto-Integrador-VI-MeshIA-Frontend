import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Wallet } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col">
      <div id="title">
        <Link href="/dashboards/list" className="flex mb-8 items-center gap-2 hover:text-primary w-fit"><ChevronLeft size={22}/>Voltar</Link>
          <h4 className="flex gap-2">
            <Wallet />
            Financeiro
          </h4>
          <p className="text-muted-foreground mt-1 mb-6">Acesse as dashboards da sua workspace</p>
          <Separator/>
        </div>
      
    </div>
  )
}
