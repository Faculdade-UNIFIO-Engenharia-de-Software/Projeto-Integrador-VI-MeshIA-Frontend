// ========= shadcn imports ============

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ========= lucide icons ============
import { BadgeCheck, BotMessageSquare, ShieldCheck } from "lucide-react";

// ========= costume imports ============
import { GitHubBrand, GoogleBrand } from "@/components/external-brands/LogoBrands"
import EnfLogo from "@/components/logos/EnfLogo";
import LogoLayout from "../components/logos/Logo";
import SignInPage from "./(public)/auth/sign-in/page";
import Link from "next/link";
import SignUpPage from "./(public)/auth/sign-up/page";
import TermsOfService from "../components/legal/TermsOfServices";
import PrivacyPolicies from "../components/legal/PrivacyPolicies";
 
// ========= others imports ============


export default function Home() {
  return (
    <div className="min-h-screen bg-grid">
      <div className="w-full h-screen flex  items-center justify-center gap-8 text-black">
        <div id="info-layer" className="flex flex-col gap-8">
          <LogoLayout variant="left" />
          <div id="cards" className="flex flex-1 gap-4">
            <Card className=" flex flex-col items-start h-auto w-50 hover:ring-primary transition ease-in-out">
              <CardHeader className="flex flex-col font-inter text-nowrap gap-2">
                <Badge variant="default"><BadgeCheck data-icon="inline-start" />Data Catalog</Badge>
                Catálogo de Dados
              </CardHeader>
              <CardContent className="text-justify text-gray">
                Conhecimento sistêmico de todos os dados da sua operação sem silos de dados.
              </CardContent>
            </Card>
            <Card className=" flex flex-col items-start h-auto w-50 hover:ring-primary transition ease-in-out">
              <CardHeader className="flex flex-col font-inter text-nowrap gap-2">
                <Badge variant="default"><BotMessageSquare data-icon="inline-start" />Chatbot IA</Badge>
                Chatbot Empresarial
              </CardHeader>
              <CardContent className="text-justify text-gray">
                Chatbot treinado com os dados da sua empresa que ajuda sua tomada de decisão.
              </CardContent>
            </Card>
            <Card className=" flex flex-col items-start h-auto w-50 hover:ring-primary transition ease-in-out">
              <CardHeader className="flex flex-col font-inter text-nowrap gap-2">
                <Badge variant="default"><ShieldCheck data-icon="inline-start" />Compliance</Badge>
                Governança de Dados
              </CardHeader>
              <CardContent className="text-justify text-gray">
                Controle quem pode ver seus dados e quais dados podem ver.
              </CardContent>
              </Card>
          </div>
        </div>

        <div
          id="signin-box"
          className="border  border-b-gray-300  bg-white gap-8 px-8 py-8 rounded-md w-125 h-150"
        >
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full rounded-sm">
              <TabsTrigger value="login" className="rounded-sm"> Entrar</TabsTrigger>
              <TabsTrigger value="register" className="rounded-sm"> Cadastrar </TabsTrigger>
            </TabsList>
            <TabsContent value="login">

              
              <div id="title" className="mt-3 mb-2 flex flex-col items-center gap-4">
                <div className="flex flex-col px-4 w-full items-start gap-1">
                  <h1 className="mb text-2xl font-bold"> Acesse sua Conta </h1>
                  <p className="font-inter text-[14px] font-normal text-[#94A3B8]">
                    Acesse sua conta da <EnfLogo /> e conheça seu negócios.
                  </p> 
                </div>
                <div className="flex w-full items-center justify-center gap-6 overflow-hidden p-1.5">
                  <Button variant="outline" className="flex-1 border border-gray-90 text-gray hover:bg-gray-100 hover:text-foreground" >
                    <GoogleBrand /> Google SSO 
                  </Button> 
                  <Button variant="outline" className="flex-1 border border-gray-90 text-gray  hover:bg-gray-100 hover:text-foreground" >
                    <GitHubBrand /> GitHub SSO
                  </Button> 
                </div> 
              </div>
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-slate-300" />
                <span className="font-jetbrains text-xs uppercase tracking-wider text-slate-500">
                  OU CONTINUE COM E-MAIL CORPORATIVO
                </span>
              </div>
              <div id="inputs" className="flex flex-col w-full my-3 h-full">
                <SignInPage />
              </div>
              <div className="flex w-full justify-evenly items-center">
                <Link href="auth/recovery" className="text-xs font-medium text-muted-foreground hover:underline hover:text-primary px-1 text-nowrap">
                  Esqueceu sua Senha?
                </Link>
                <TermsOfService/>
                <PrivacyPolicies/>
              </div>
              
            </TabsContent>

            
            <TabsContent value="register" >

              
              <div id="title" className="mt-3 mb-2 flex flex-col items-center gap-4" >
                <div className="flex flex-col px-4 w-full items-start gap-1">
                  <h1 className="mb text-2xl font-bold"> Cadastre-se </h1>
                  <p className="font-inter text-[14px] font-normal text-[#94A3B8]">
                    Cadastre-se e conheça nossos serviços.
                  </p> 
                </div>
                <div id="inputs" className="flex flex-col flex-1 w-full my-3 h-full">
                  <SignUpPage/>
                </div>
                
                
              </div>
            </TabsContent>
          </Tabs>

      </div>
      </div>
    </div>
  );
}
