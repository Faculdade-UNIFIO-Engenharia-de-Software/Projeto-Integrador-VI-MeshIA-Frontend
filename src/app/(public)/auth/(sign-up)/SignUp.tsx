import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {

  const errors = {
    email: false,
    password:false
  }
  
  return (
    <div className="flex flex-col mt-2 px-2">
      <form action=''>
        <div className="space-y-2 mb-2">
          <Label htmlFor="completeName" className="font-inter">Nome Completo:</Label>
          <Input
            name="completeName" 
            type="text" 
            id="completeName"
            placeholder="Digite seu completo"
            className="py-4.5 " />
            <div className="h-5">
              {errors.email && (
                    <p className="text-xs text-destructive">
                  {/*{errors.email.message}*/}
                  Mensagem teste de erro
                    </p>
                  )}
            </div>
        </div>
      <div className="space-y-2 mb-2">
        <Label htmlFor="email" className="font-inter">E-mail:</Label>
        <Input
          name="email" 
          type="email" 
          id="email"
          placeholder="Digite seu e-mail"
            className="py-4.5" />
        <div className="h-5">
          {errors.email && (
                <p className="text-xs text-destructive">
              {/*{errors.email.message}*/}
              Mensagem teste de erro
                </p>
              )}
        </div>
      </div>
      <div className="space-y-2 mb-2">
        <Label htmlFor="password" className="font-inter">Senha:</Label>
        <Input
          name="password" 
          type="password" 
          id="password"
          placeholder="Digite sua senha"
            className="py-4.5" />
        <div className="h-5">
          {errors.email && (
                <p className="text-xs text-destructive">
              {/*{errors.email.message}*/}
              Mensagem teste de erro
                </p>
              )}
        </div>
      </div>
        <div className="space-y-2 mb-2">
          <Label htmlFor="passwordConfirm" className="font-inter">Confirmar Senha:</Label>
          <Input
            name="passwordConfirm" 
            type="password" 
            id="passwordConfirm"
            placeholder="Confirme sua senha"
            className="py-4.5" />
          <div className="h-5">
            {errors.email && (
                  <p className="text-xs text-destructive">
                {/*{errors.email.message}*/}
                Mensagem teste de erro
                  </p>
                )}
          </div>
        </div>
        <Button className="w-full py-4.5 mt-1 text-white">Cadastrar</Button>
    </form>
    </div>
  )
}
