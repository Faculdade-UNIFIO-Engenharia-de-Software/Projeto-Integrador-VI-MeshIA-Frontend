"use client";
import { useActionState, useState } from "react";

import { loginAction, type LoginState } from "@/actions/auth/loginAction";

// ========= shadcn imports ============
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

// ========= lucide icons ============
import { Eye, EyeOffIcon } from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <form action={formAction} noValidate className="flex flex-col my-6 h-full pb-2 gap-4">
      <div className="space-y-2 py-2">
        <Label htmlFor="email">E-mail:</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Digite seu e-mail"
          className="py-5"
          defaultValue={state.values?.email}
          aria-invalid={!!state.fieldErrors?.email}
        />
        <div className="h-5">{state.fieldErrors?.email && <p className="text-xs text-destructive">{state.fieldErrors.email}</p>}</div>
      </div>

      <div className="space-y-2 mb-2 py-2">
        <Label htmlFor="password">Senha:</Label>
        <InputGroup className="py-5">
          <InputGroupInput
            id="password"
            name="password"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            aria-invalid={!!state.fieldErrors?.password}
          />
          <InputGroupAddon align="inline-end">
            <Button
              className="border-none"
              variant="outline"
              type="button"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye /> : <EyeOffIcon />}
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <div className="h-5">{state.fieldErrors?.password && <p className="text-xs text-destructive">{state.fieldErrors.password}</p>}</div>
      </div>

      {state.formError && (
        <p role="alert" className="text-sm text-destructive">
          {state.formError}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full py-4.5 text-white">
        {pending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
