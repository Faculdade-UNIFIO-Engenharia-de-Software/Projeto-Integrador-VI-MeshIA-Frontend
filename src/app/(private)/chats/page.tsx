import { Separator } from "@/components/ui/separator";
import { BotMessageSquare } from "lucide-react";

export default function Chats() {
  return (
  <>
    <div id="title">
        <h4 className="flex gap-2">
          <BotMessageSquare/>
        Chats
      </h4>
      <p className="text-muted-foreground mt-1 mb-6">Acesse os dados da sua organização.</p>
      <Separator/>
    </div>
  </>
  )
}
