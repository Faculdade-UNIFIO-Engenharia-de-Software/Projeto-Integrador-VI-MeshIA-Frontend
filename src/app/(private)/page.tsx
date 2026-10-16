import { Separator } from "@/components/ui/separator";

export default function Dashboard(){
  return (
    <div id="title">
      <h4 className="flex gap-2">
        Olá Lucas, bem-vindo!
      </h4>
      <p className="text-muted-foreground mt-1 mb-6">Acesse os dados da sua organização.</p>
      <Separator/>
    </div>
  )
}
