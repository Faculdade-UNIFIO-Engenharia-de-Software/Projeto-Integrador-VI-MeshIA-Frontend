import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-6">
      <form action='' className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="completeName">Nome Completo:</Label>
          <Input
            name="completeName" 
            type="text" 
            id="completeName"
            placeholder="Digite seu completo"
            className="py-5"/>
        </div>
      <div className="space-y-2">
        <Label htmlFor="email">E-mail:</Label>
        <Input
          name="email" 
          type="email" 
          id="email"
          placeholder="Digite seu e-mail"
          className="py-5"/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha:</Label>
          <Input
            name="password" 
            type="password" 
            id="password"
            placeholder="Digite sua senha"
            className="py-5"/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="passwordConfirm">Confirmar Senha:</Label>
          <Input
            name="passwordConfirm" 
            type="password" 
            id="passwordConfirm"
            placeholder="Confirme sua senha"
            className="py-5"/>
        </div>
        <Button className="w-full py-5">Cadastrar</Button>
    </form>
    </div>
  )
}
