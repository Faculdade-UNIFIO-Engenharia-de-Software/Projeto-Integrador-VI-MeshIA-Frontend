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

  const togglePasswordVis = () => {
    setShowPassword((prev)=>!prev)
  }
  
  return (
    <div className="flex flex-col gap-8 my-6">
      <form action='' className="space-y-4">
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
        </div>
      </form>
      <Button className="w-full py-5">Entrar</Button>
  </div>
  )
}
