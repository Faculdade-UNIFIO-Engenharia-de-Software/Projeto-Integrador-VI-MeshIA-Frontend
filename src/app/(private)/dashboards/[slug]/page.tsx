import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ChartNoAxesColumnDecreasing, ChevronLeft, Eye, MoveLeft, Pencil, Trash, Wallet } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col">
      <div id="title">
        <Link href="/dashboards" className="flex mb-8 items-center gap-2 hover:text-primary"><ChevronLeft size={22}/>Voltar</Link>
          <h4 className="flex gap-2">
            <Wallet />
            Financeiro
          </h4>
          <p className="text-muted-foreground mt-1 mb-6">Acesse as dashboards da sua workspace</p>
          <Separator/>
        </div>
      <section>
        <Table>
          <TableHeader className="light:bg-blue-50">
            <TableRow>
              <TableHead>Nome da Análise</TableHead>
              <TableHead>Ponto Central</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Última Atualização</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Demonstrativo de Fluxo de Caixa</TableCell>
              <TableCell>
                <Badge variant="secondary">Tesouraria</Badge>
              </TableCell>
              <TableCell>
                
                <Tooltip >
                  <TooltipTrigger render={
                    <Avatar>
                      <AvatarImage src="/lucas-avatar.png" alt="profile" />
                      <AvatarFallback className="rounded-full">L</AvatarFallback>
                    </Avatar>
                    }/>
                  <TooltipContent>
                  <p>@lucasadriano</p>
                  </TooltipContent>
                </Tooltip>
                
              </TableCell>
              <TableCell>30/10/2029 ás 19:01</TableCell>
              <TableCell>
                <Badge variant="secondary"><div className="bg-primary h-1.5 w-1.5 rounded-full animate-pulse">
                </div>Publicada</Badge>
              </TableCell>
              <TableCell className="flex text-center justify-evenly ">
                <Button variant="outline" size={"icon"} className=" text-center">
                  <Pencil/>
                </Button>
                <Button variant="outline" size={"icon"} className=" text-center">
                  <Eye/>
                </Button>
                <Button variant="destructive" size={"icon"} className=" text-center">
                  <Trash/>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  )
}
