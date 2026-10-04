import EnfLogo from "@/components/logos/EnfLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RecoveryPage(){
  return (
    <div className="min-h-screen w-max-[700px] bg-grid flex flex-col items-center justify-center">
      
      <Card className="w-dvh">
        <CardHeader>
        <CardTitle>
          Recuperar Acesso
          </CardTitle>
          <CardDescription>
            Recupere seu acesso e volte para <EnfLogo />.
          </CardDescription>
        </CardHeader>
          <CardContent className="p-4">
          <form id="access-recovery">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">E-mail:</Label>
                <Input
                  type="text"
                  name="email"
                  placeholder="Digite seu e-mail"
                className="py-5"
                required
              />
              <Button className="py-5 mt-4">Recuperar Acesso</Button>
            </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Link href="/" className="flex items-center gap-2 text-primary hover:underline font-medium "><ArrowLeft size="20"/>Voltar para Login</Link>
          </CardFooter>
        </Card>

  </div>
  )
}
