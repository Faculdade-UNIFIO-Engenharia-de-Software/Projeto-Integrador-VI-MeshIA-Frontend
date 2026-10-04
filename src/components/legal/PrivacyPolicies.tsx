import EnfLogo from "@/components/logos/EnfLogo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";


export default function TermsOfService() {
  return (
    <Dialog >
    <DialogTrigger render={<Button variant="link" className="text-xs font-medium text-muted-foreground hover:underline hover:text-primary">Política de Privacidade</Button>} />
      <DialogContent className="w-fit w-max-[100vw] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Políticas de Privacidade - <EnfLogo/></DialogTitle>
          <DialogDescription>
            Veja nossas políticas de privacidade antes de utilizar nossa plataforma!
          </DialogDescription>
        </DialogHeader>
        <Separator orientation="horizontal"/>
        <div className=" max-h-[65vh] overflow-y-auto space-y-2 px-2 text-sm">
          <article className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed">
                <h1 className="text-xl font-bold mb-1">POLÍTICA DE PRIVACIDADE</h1>
                <p className="mb-6 font-semibold">
                  Última atualização: 29 de setembro de 2026
                </p>
                <p className="mb-4 text-justify">
                  A <strong>MeshIA Inteligência de Negócios LTDA</strong> ("Nós", "Empresa" ou "Plataforma"), inscrita no CNPJ sob o nº 00.000.000/0001-11, operadora da plataforma <EnfLogo/>, valoriza a privacidade e a segurança dos dados de seus usuários ("Você", "Usuário" ou "Cliente").
                </p>
                <p className="mb-4 text-justify">
                  Esta Política de Privacidade descreve como coletamos, usamos, armazenamos, processamos e protegemos as informações e dados pessoais quando você utiliza nossa plataforma de agentes e chatbots baseados em <strong>RAG (Retrieval-Augmented Generation)</strong>.
                </p>
                <p className="mb-6 text-justify">
                  Ao acessar ou utilizar nossos serviços, você declara estar ciente do tratamento de seus dados na forma aqui descrita.
                </p>
          
                <hr className="my-8 border-gray-300" />
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">1. Definições Importantes</h2>
                  <p className="mb-1">
                    Para fins desta política, aplicam-se as definições da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018):
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-1">
                    <li>
                      <strong>Controlador:</strong> Pessoa natural ou jurídica a quem competem as decisões referentes ao tratamento de dados pessoais.
                    </li>
                    <li>
                      <strong>Operador:</strong> Pessoa natural ou jurídica que realiza o tratamento de dados pessoais em nome do Controlador.
                    </li>
                    <li>
                      <strong>Dado Pessoal:</strong> Informação relacionada a pessoa natural identificada ou identificável.
                    </li>
                    <li>
                      <strong>Base de Conhecimento / Conteúdo do Cliente:</strong> Documentos, arquivos, textos, links e dados fornecidos pelo Cliente para alimentação da arquitetura RAG e treinamento dos chatbots.
                    </li>
                  </ul>
                  <blockquote className="p-4 bg-gray-100 border-l-4 border-blue-500 rounded my-4">
                    <p>
                      <strong>Importante:</strong> Nos casos em que o Cliente cadastra ou carrega dados de terceiros (ex: dados dos clientes do próprio Cliente) em nossa Plataforma para alimentação do RAG, o <strong>Cliente atua como Controlador</strong> e a <strong>Empresa atua exclusivamente como Operadora</strong> desses dados.
                    </p>
                  </blockquote>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">2. Dados Coletados e Formas de Coleta</h2>
                  <p className="mb-1">Coletamos dados nas seguintes situações:</p>
                  
                  <ol className="list-decimal list-inside space-y-4">
                    <li className="font-semibold text-lg">
                      Dados de Cadastro e Conta
                      <ul className="list-disc list-inside font-normal text-base mt-2 ml-6 space-y-1">
                        <li>
                          <strong>O que coletamos:</strong> Nome completo, endereço de e-mail, telefone, CPF/CNPJ, nome da empresa e dados de pagamento (processados via gateway parceiro).
                        </li>
                        <li>
                          <strong>Finalidade:</strong> Criar e gerenciar sua conta, autenticar acessos, faturar serviços e prestar suporte técnico.
                        </li>
                      </ul>
                    </li>
          
                    <li className="font-semibold text-lg">
                      Conteúdo da Base de Conhecimento (Arquivos para RAG)
                      <ul className="list-disc list-inside font-normal text-base mt-2 ml-6 space-y-1">
                        <li>
                          <strong>O que coletamos:</strong> Documentos (PDF, DOCX, TXT, CSV), páginas web (URLs/scraping), integração de bancos de dados ou APIs fornecidos por você para indexação.
                        </li>
                        <li>
                          <strong>Finalidade:</strong> Converter seus dados em embeddings vetoriais para permitir o funcionamento do sistema de busca semântica (RAG) e a geração de respostas contextuais pelos chatbots.
                        </li>
                      </ul>
                    </li>
          
                    <li className="font-semibold text-lg">
                      Logs de Conversas e Interações do Chatbot
                      <ul className="list-disc list-inside font-normal text-base mt-2 ml-6 space-y-1">
                        <li>
                          <strong>O que coletamos:</strong> Mensagens trocadas entre os usuários finais e o chatbot, históricos de chamadas de API, métricas de tempo de resposta e <em>feedback</em> das respostas oferecidas.
                        </li>
                        <li>
                          <strong>Finalidade:</strong> Permitir a auditoria das respostas, aprimoramento da assertividade do modelo, depuração de erros e fornecimento de históricos ao Cliente.
                        </li>
                      </ul>
                    </li>
          
                    <li className="font-semibold text-lg">
                      Dados de Uso e Telemetria
                      <ul className="list-disc list-inside font-normal text-base mt-2 ml-6 space-y-1">
                        <li>
                          <strong>O que coletamos:</strong> Endereço IP, tipo de navegador, sistema operacional, horários de acesso e rotas consumidas.
                        </li>
                        <li>
                          <strong>Finalidade:</strong> Manter a segurança da aplicação, prevenir fraudes e otimizar o desempenho do sistema.
                        </li>
                      </ul>
                    </li>
                  </ol>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">3. Como os Dados São Processados na Arquitetura RAG</h2>
                  <p className="mb-1">
                    Para operar o serviço de RAG, os dados seguem o fluxo de processamento descrito abaixo:
                  </p>
          
                  <ol className="list-decimal list-inside space-y-2 mb-6">
                    <li>
                      <strong>Fragmentação e Embeddings:</strong> Os arquivos ou textos fornecidos são divididos em pequenos trechos (<em>chunks</em>) e convertidos em vetores matemáticos (<em>embeddings</em>).
                    </li>
                    <li>
                      <strong>Armazenamento Vetorial:</strong> Os vetores e seus respectivos fragmentos de texto são armazenados em um Banco de Dados Vetorial com isolamento lógico por conta/locatário (<em>multi-tenancy isolation</em>).
                    </li>
                    <li>
                      <strong>Consulta e Resposta:</strong> Quando uma pergunta é enviada ao chatbot, o sistema busca os fragmentos mais relevantes na sua base vetorial dedicada e envia esse contexto juntamente com a pergunta para a LLM (Large Language Model) gerar a resposta.
                    </li>
                  </ol>
          
                  <h3 className="text-lg font-bold mb-2">Uso dos seus dados para Treinamento de Modelos</h3>
                  <blockquote className="p-4 bg-gray-100 border-l-4 border-blue-500 rounded">
                    <p>
                      <strong>NÃO utilizamos o Conteúdo da sua Base de Conhecimento nem as conversas do seu Chatbot para treinar modelos de inteligência artificial públicos ou de terceiros.</strong> Seus dados pertencem exclusivamente a você e são utilizados apenas para responder às consultas da sua própria conta.
                    </p>
                  </blockquote>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-1">4. Compartilhamento de Dados com Terceiros</h2>
                  <p className="mb-1">
                    Para viabilizar as funcionalidades do SaaS, podemos compartilhar dados estritamente necessários com provedores de infraestrutura e IA:
                  </p>
          
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>
                      <strong>Provedores de Modelos de Linguagem (LLMs):</strong> [Ex: OpenAI, Anthropic, Google Cloud, AWS Bedrock]. O envio de dados se limita ao texto das perguntas e aos fragmentos de contexto necessários para a geração da resposta via API corporativa (com políticas ativas de não-retenção para treino).
                    </li>
                    <li>
                      <strong>Bancos de Dados Vetoriais e Infraestrutura Cloud:</strong> [Ex: Pinecone, Qdrant, Supabase, AWS, Cloudflare] para hospedagem e indexação segura.
                    </li>
                    <li>
                      <strong>Processadores de Pagamento:</strong> [Ex: Stripe, Asaas, Mercado Pago] para gestão de assinaturas.
                    </li>
                  </ul>
          
                  <p>
                    Todos os nossos parceiros são selecionados com base em padrões rígidos de segurança da informação e conformidade com legislações de proteção de dados (como LGPD e GDPR).
                  </p>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">5. Segurança da Informação</h2>
                  <p className="mb-1">
                    Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados, perda ou alteração:
                  </p>
          
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Criptografia:</strong> Transmissão de dados via SSL/TLS (HTTPS) e criptografia em repouso (<em>at-rest</em>) para dados e vetores.
                    </li>
                    <li>
                      <strong>Isolamento de Dados:</strong> Arquitetura projetada para garantir que o chatbot de um cliente jamais acesse a base de conhecimento de outro.
                    </li>
                    <li>
                      <strong>Controle de Acesso:</strong> Políticas de privilégio mínimo e autenticação de dois fatores (2FA) para acesso às bases operacionais.
                    </li>
                  </ul>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">6. Retenção e Exclusão de Dados</h2>
                  <p className="mb-1">
                    Os dados cadastrais e as bases de conhecimento são mantidos enquanto a sua conta permanecer ativa.
                  </p>
          
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Cancelamento:</strong> Em caso de encerramento da assinatura, você poderá solicitar o export da sua base de dados no prazo de [30] dias. Após esse período, seus arquivos, vetores e históricos de conversa serão permanentemente excluídos de nossos servidores e bancos de dados vetoriais.
                    </li>
                    <li>
                      <strong>Exclusão a pedido:</strong> Você pode remover documentos da sua base de conhecimento a qualquer momento através do painel da plataforma.
                    </li>
                  </ul>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">7. Direitos dos Titulares dos Dados</h2>
                  <p className="mb-1">
                    Conforme a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
                  </p>
          
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Confirmar a existência de tratamento;</li>
                    <li>Acessar seus dados pessoais;</li>
                    <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
                    <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
                    <li>Revogar o consentimento a qualquer momento.</li>
                  </ul>
          
                  <p className="text-justify text-sm">
                    Para exercer seus direitos, entre em contato com nosso Encarregado de Proteção de Dados (DPO) pelo e-mail: <em className="text-primary">dataprotect_officer@meshia.com.br</em>
                  </p>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">8. Alterações nesta Política</h2>
                  <p className="text-justify">
                    Podemos atualizar esta Política de Privacidade periodicamente para refletir melhorias no sistema ou mudanças legais. Notificaremos você sobre alterações significativas através do e-mail cadastrado ou por aviso em destaque na plataforma antes que as mudanças entrem em vigor.
                  </p>
                </section>
          
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-1">9. Contato</h2>
                  <p className="mb-1">
                    Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de dados na plataforma, entre em contato:
                  </p>
          
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Empresa:</strong> MeshIA Inteligência de Negócios LTDA
                    </li>
                    <li>
                      <strong>E-mail de Contato/DPO:</strong> dataprotect_officer@meshia.com.br
                    </li>
                    <li>
                      <strong>Endereço:</strong> Atuação 100% Digital
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
