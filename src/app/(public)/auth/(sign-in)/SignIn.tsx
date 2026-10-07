'use client'
import { useState } from "react";

// ========= shadcn imports ============

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

// ========= lucide icons ============
import {Eye, EyeOffIcon} from "lucide-react";


export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)

  const errors = {
    email: false,
    password:false
  }
  const togglePasswordVis = () => {
    setShowPassword((prev)=>!prev)
  }
  
  return (
    <div className="flex flex-col my-6 h-full pb-2 gap-4">
      <form action='' >
        <div id="inputOnly" className="flex flex-col">
          <div className="space-y-2 py-2">
            <Label htmlFor="email" >E-mail:</Label>
            <Input
              name="email"
              type="email" 
              id="email"
              placeholder="Digite seu e-mail"
              className="py-5"
              
            />
            <div className="h-5">
              {errors.email && (
                    <p className="text-xs text-destructive">
                  {/*{errors.email.message}*/}
                  Mensagem teste de erro
                    </p>
                  )}
            </div>
          </div>
          <div className="space-y-2 mb-2 py-2">
          <Label htmlFor="password" >Senha:</Label>
          <InputGroup className="py-5">
            <InputGroupInput
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
            />
            <InputGroupAddon align="inline-end">
              <Button className="border-none" variant="outline" type="button" onClick={togglePasswordVis}>
                {showPassword ? (<Eye />) : (<EyeOffIcon />)}
              </Button>
              </InputGroupAddon>
            </InputGroup>
            <div className="h-2">
              {errors.email && (
                    <p className="text-xs text-destructive">
                  {/*{errors.email.message}*/}
                  Mensagem de erro teste
                    </p>
                  )}
            </div>
          </div>
        </div>
      </form>
      <Button className="w-full py-4.5 text-white">Entrar</Button>
  </div>
  )
}
