"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { loginAction, type LoginState } from "@/actions/auth/loginAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <form action={formAction} noValidate className="flex flex-col gap-3 my-2">
      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Digite seu e-mail"
          defaultValue={state.values?.email}
          aria-invalid={!!state.fieldErrors?.email}
          className="h-10 rounded-xl bg-secondary/60 transition-[color,background-color,border-color,box-shadow] duration-200 ease-soft focus-visible:ring-4 focus-visible:ring-ring/30"
        />
        {state.fieldErrors?.email && <p className="text-xs text-destructive">{state.fieldErrors.email}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Senha</Label>
        <InputGroup>
          <InputGroupInput
            id="password"
            name="password"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            aria-invalid={!!state.fieldErrors?.password}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              variant="ghost"
              type="button"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {state.fieldErrors?.password && <p className="text-xs text-destructive">{state.fieldErrors.password}</p>}
      </div>

      {state.formError && (
        <p role="alert" className="text-sm text-destructive">
          {state.formError}
        </p>
      )}

      <Button type="submit" disabled={pending} className="mt-2 h-10 w-full rounded-xl text-white">
        {pending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
