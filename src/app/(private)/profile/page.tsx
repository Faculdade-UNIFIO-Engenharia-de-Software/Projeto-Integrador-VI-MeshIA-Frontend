import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2Icon, Mail, IdCardLanyard, Building, SquarePen, ComputerIcon, MoreHorizontalIcon} from 'lucide-react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EditProfileModal from "../_components/modals/editProfile/EditProfile";
import { Badge } from "@/components/ui/badge";

export default function Profile(){
  return (
    <div >
      <header id="title" className="w-full pt-1">
        <div className="flex gap-2">
        <User2Icon className=" text-primary"/><h4 className="text-primary"> Dados Pessoais e Perfil</h4>
        </div>
        <p className="text-sm text-muted-foreground my-1">
          Gerencie suas credencias corporativas, segurança de conta e preferências
        </p>
        <hr className="bg-muted-foreground my-6"/>
      </header>
      <div id="profile" className="flex gap-8 border bg-white dark:border-muted-foreground my-4 dark:bg-background rounded-md w-full p-8 items-center">
        <Avatar className="h-30 w-30 rounded-full">
          <AvatarImage src="/lucas-avatar.png" alt="profile" />
          <AvatarFallback className="rounded-full">L</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1 gap-1 h-full justify-start font-inter">
          <h3>Lucas Adriano dos Santos</h3>
          
          <span className="flex items-center gap-2 text-muted-foreground">
            <Mail size={18}/>
            lucasadriano@meshia.com.br
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <IdCardLanyard  size={18}/> 
            Software Engineering Junior
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <Building  size={18}/> 
            MeshIA Software and Data
          </span>
        </div>
        <div className="h-full flex justify-start text-muted-foreground">
          <EditProfileModal>
            <SquarePen />
          </EditProfileModal>
        </div>
      </div>
      <section>
        <Tabs defaultValue="sections" >
          
          <TabsList className='w-120 mt-2'>
            <TabsTrigger value='sections'>Sessões e Dispositivos</TabsTrigger>
            <TabsTrigger value='security'>Segurança e Acesso</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sections">
            <div className="p-4 bg-white dark:bg-background border rounded-lg">
              <div id="title-content" className="flex flex-1 flex-col">
                <h4 className="flex items-center gap-2">
                  <ComputerIcon size={18}/>Sessões Ativas
                </h4>
                <p>Auditoria em tempo real de instâncias Autenticadas</p>
              </div>
              <Separator orientation="horizontal" className="mt-2 mb-6 dark:bg-muted-foreground" />
              <Table >
                <TableHeader className="light:bg-blue-50">
                  <TableRow>
                    <TableHead>Dispositivo / Cliente</TableHead>
                    <TableHead>Localização Aproximada</TableHead>
                    <TableHead>Endereço IP</TableHead>
                    <TableHead>Última Atividade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Teste</TableCell>
                    <TableCell>Teste</TableCell>
                    <TableCell>Teste</TableCell>
                    <TableCell>Teste</TableCell>
                    <TableCell>
                      
                      <Badge variant="secondary"><div className="bg-primary h-1.5 w-1.5 rounded-full animate-pulse"></div>Sessão Atual</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="destructive" className=" text-center">
                        Encerrar Sessão
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5}>Total</TableCell>
                    <TableCell >$2,500.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="security" >
            <div className="p-2">
              Segurança
            </div>
          </TabsContent>
          
        </Tabs>
      </section>
    </div>
  )
}
