import EnfLogo from "@/components/logos/EnfLogo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";

export default function TermsOfService() {
  return (
    <Dialog >
    <DialogTrigger render={<Button variant="link" className="text-xs font-medium text-muted-foreground hover:underline hover:text-primary">Termos de Serviço</Button>} />
      <DialogContent className="w-fit w-max-[100vw] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Termos de Serviço - <EnfLogo/></DialogTitle>
          <DialogDescription>
            Veja nossos termos antes de utilizar nossa plataforma!
          </DialogDescription>
        </DialogHeader>
        <Separator orientation="horizontal"/>
        <div className=" max-h-[65vh] overflow-y-auto space-y-2 px-2 text-sm">
          <article className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed">
                <h1 className="text-3xl font-bold mb-4">TERMOS DE SERVIÇO</h1>
                
                <p className="mb-6 font-semibold">
                  <strong>Última atualização:</strong> 29 de setembro de 2026
                </p>
                <p className="mb-4 text-justify">
                  Estes Termos de Serviço ("Termos") regem o uso da plataforma <EnfLogo/> ("Plataforma" ou "Serviço"), mantida e operada por Meshia Inteligência de Negócios LTDA, inscrita no CNPJ sob o nº 00.000.000/0001-11 ("Empresa").
                </p>
                <p className="mb-6 text-justify">
                  Ao criar uma conta ou utilizar qualquer funcionalidade de nossa plataforma de chatbots e agentes baseados em RAG (Retrieval-Augmented Generation), você ("Cliente" ou "Usuário") concorda expressa e integralmente com estes Termos. Se você não concordar com qualquer disposição aqui prevista, não deverá utilizar o Serviço.
                </p>
                <hr className="my-8 border-gray-300" />
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">1. Objeto e Descrição do Serviço</h2>
                  <p className="mb-1 text-justify">
                    A Plataforma consiste em um software como serviço (SaaS) que permite ao Cliente carregar bases de conhecimento (documentos, URLs, textos e integrações) para a criação, treinamento e disponibilização de chatbots e agentes virtuais utilizando arquitetura RAG e modelos de linguagem de inteligência artificial (LLMs).
                  </p>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">2. Cadastro e Responsabilidade da Conta</h2>
                  <p className="mb-1 text-justify">
                    Para utilizar o Serviço, o Cliente deve fornecer informações verdadeiras, exatas e completas durante o processo de registro.
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>
                      <strong>Confidencialidade das Credenciais:</strong> O Cliente é o único responsável por manter a confidencialidade de seus dados de login e senha.
                    </li>
                    <li>
                      <strong>Uso Autorizado:</strong> Toda atividade realizada sob a conta do Cliente é de sua inteira e exclusiva responsabilidade.
                    </li>
                    <li>
                      <strong>Idade Mínima:</strong> O Serviço destina-se a pessoas físicas maiores de 18 anos ou pessoas jurídicas devidamente representadas.
                    </li>
                  </ul>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">3. Uso Aceitável e Restrições de Conteúdo</h2>
                  <p className="mb-1 text-justify">
                    O Cliente compromete-se a utilizar a Plataforma de forma ética e em conformidade com as leis vigentes. É estritamente proibido carregar, indexar ou gerar conteúdo que:
                  </p>
          
                  <ol className="list-decimal list-inside space-y-4">
                    <li className="font-semibold text-lg">
                      Atividades Ilícitas ou Nocivas
                      <ul className="list-disc list-inside font-normal text-base mt-2 ml-6 space-y-1">
                        <li>Seja ilegal, difamatório, discriminatório, odioso, ameaçador ou que promova violência.</li>
                        <li>Instrua ou incentive a prática de crimes, fraudes ou engenharia social.</li>
                      </ul>
                    </li>
          
                    <li className="font-semibold text-lg">
                      Violação de Direitos Autorais e Propriedade Intelectual
                      <ul className="list-disc list-inside font-normal text-base mt-2 ml-6 space-y-1">
                        <li>Infrinja direitos autorais, marcas registradas, segredos comerciais ou direitos de privacidade de terceiros.</li>
                        <li>O Cliente declara possuir todas as licenças e autorizações necessárias para carregar os documentos enviados à base de conhecimento.</li>
                      </ul>
                    </li>
          
                    <li className="font-semibold text-lg">
                      Abuso da Infraestrutura
                      <ul className="list-disc list-inside font-normal text-base mt-2 ml-6 space-y-1">
                        <li>Tente realizar engenharia reversa, descompilar ou invadir o código-fonte da Plataforma.</li>
                        <li>Realize ataques de negação de serviço (DoS/DDoS), automações abusivas não autorizadas via API ou tentativas de bypass de limites da conta.</li>
                      </ul>
                    </li>
                  </ol>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">4. Propriedade Intelectual e Bases de Conhecimento</h2>
                  
                  <ul className="list-disc list-inside space-y-3 mb-4">
                    <li>
                      <strong>Propriedade do Cliente:</strong> O Cliente mantém a titularidade e todos os direitos de propriedade intelectual sobre os arquivos, documentos e dados enviados para alimentação do RAG ("Conteúdo do Cliente").
                    </li>
                    <li>
                      <strong>Propriedade da Empresa:</strong> A Empresa detém todos os direitos de propriedade intelectual referentes ao software, código-fonte, design, marca, algoritmo de RAG, conectores e funcionalidades da Plataforma.
                    </li>
                    <li>
                      <strong>Licença Operacional:</strong> O Cliente concede à Empresa uma licença não exclusiva, temporária e mundial apenas para processar, armazenar, vetorizar e transmitir o Conteúdo do Cliente estritamente para a prestação do Serviço contratado.
                    </li>
                  </ul>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">5. Natureza das Respostas de Inteligência Artificial</h2>
                  <p className="mb-1">
                    O Cliente reconhece que a Plataforma utiliza modelos de inteligência artificial generativa e arquitetura de busca semântica para gerar respostas automáticas.
                  </p>
          
                  <blockquote className="p-4 bg-gray-100 border-l-4 border-amber-500 rounded mb-4">
                    <p>
                      <strong>Aviso de Limitação de IA:</strong> Respostas geradas por modelos de linguagem podem eventualmente conter imprecisões, erros de interpretação ou alucinações. É de responsabilidade do Cliente supervisionar, validar e auditar as respostas fornecidas pelo chatbot aos seus usuários finais.
                    </p>
                  </blockquote>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">6. Planos, Pagamentos e Cancelamento</h2>
                  
                  <ol className="list-decimal list-inside space-y-2 mb-4">
                    <li>
                      <strong>Assinatura e Cobrança:</strong> Os Serviços são disponibilizados mediante planos de assinatura (mensal ou anual). As cobranças ocorrem de forma recorrente no início de cada período.
                    </li>
                    <li>
                      <strong>Atraso no Pagamento:</strong> A inadimplência por período superior a [7] dias poderá acarretar a suspensão temporária do acesso à Plataforma e à API do chatbot.
                    </li>
                    <li>
                      <strong>Cancelamento:</strong> O Cliente pode solicitar o cancelamento de sua assinatura a qualquer momento através do painel de controle. O acesso permanecerá ativo até o final do período já faturado.
                    </li>
                    <li>
                      <strong>Reembolsos:</strong> Salvo indicação em contrário ou exigência legal (como o direito de arrependimento do Código de Defesa do Consumidor para compras online), os valores pagos por períodos já iniciados não serão reembolsados.
                    </li>
                  </ol>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">7. Disponibilidade do Serviço (SLA) e Suporte</h2>
                  <p className="mb-1">
                    Buscamos manter a Plataforma disponível de forma contínua e estável. Contudo, não garantimos que o Serviço funcionará sem interrupções ou falhas operacionais decorrentes de:
                  </p>
          
                  <ul className="list-disc list-inside space-y-2">
                    <li>Manutenções programadas ou de emergência no sistema.</li>
                    <li>Indisponibilidade ou oscilação nos provedores de LLMs terceirizados (ex: OpenAI, Anthropic, Google Cloud).</li>
                    <li>Instabilidade na infraestrutura de internet do Cliente ou de terceiros.</li>
                  </ul>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">8. Limitação de Responsabilidade</h2>
                  <p className="mb-1">
                    Na máxima extensão permitida pela legislação aplicável, a Empresa não será responsável por quaisquer danos indiretos, incidentais, lucros cessantes, perda de dados ou interrupção de negócios decorrentes do uso ou da impossibilidade de uso da Plataforma ou das respostas geradas pelo chatbot.
                  </p>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">9. Modificações nos Termos</h2>
                  <p>
                    Reservamo-nos o direito de alterar estes Termos a qualquer momento. Alterações substanciais serão comunicadas previamente por e-mail ou por aviso em destaque na Plataforma. O uso continuado do Serviço após a vigência dos novos Termos implica aceitação integral das modificações.
                  </p>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">10. Foro e Legislação Aplicável</h2>
                  <p className="mb-1">
                    Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o Foro da Comarca de [Sua Cidade / Estado] para dirimir eventuais controvérsias oriundas destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
                  </p>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">11. Contato</h2>
                  <p className="mb-1">
                    Em caso de dúvidas relativas a estes Termos de Serviço, entre em contato através dos canais:
                  </p>
          
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Empresa:</strong> [NOME DA EMPRESA]
                    </li>
                    <li>
                      <strong>E-mail de Suporte:</strong> [SEU-EMAIL@SEUDOMINIO.COM]
                    </li>
                    <li>
                      <strong>Endereço:</strong> [ENDEREÇO FÍSICO OU "Atuação 100% Digital"]
                    </li>
                  </ul>
                </section>
              </article>
        </div>          
        <DialogFooter>
          <DialogClose render={<Button variant="ghost">Fechar</Button>} />
        </DialogFooter>
      </DialogContent>
      </Dialog>

  )
}
