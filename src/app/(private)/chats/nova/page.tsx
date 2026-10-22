import { Suspense } from "react";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Database, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Marker, MarkerContent } from "@/components/ui/marker";
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message";
import { initials } from "@/lib/format";
import { getMe } from "@/services/api/me";
import { askQuestion } from "@/services/api/chat";

function AiAvatar() {
  return (
    <MessageAvatar>
      <Avatar>
        <AvatarFallback>
          <Sparkles className="size-4" />
        </AvatarFallback>
      </Avatar>
    </MessageAvatar>
  );
}

async function AnswerBlock({ question }: { question: string }) {
  const result = await askQuestion(question);

  if (!result.ok) {
    return (
      <Message>
        <AiAvatar />
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>{result.message}</BubbleContent>
          </Bubble>
          <Link href={`/chats/nova?q=${encodeURIComponent(question)}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
            Tentar novamente
          </Link>
        </MessageContent>
      </Message>
    );
  }

  const { text, sources } = result.data;

  return (
    <Message>
      <AiAvatar />
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>{text}</BubbleContent>
        </Bubble>
        {sources.length > 0 && (
          <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
            <span>Fontes:</span>
            {sources.map((s) => (
              <span key={`${s.database}.${s.table}`} className="flex items-center gap-1 rounded-full border px-2 py-0.5">
                <Database className="size-3" />
                {s.database} · {s.table}
              </span>
            ))}
          </div>
        )}
      </MessageContent>
    </Message>
  );
}

export default async function NewChat({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const question = q?.trim() ?? "";
  if (question.length < 3) redirect("/chats");

  const me = await getMe();
  const userName = me.ok ? me.data.name : "Você";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-6">
      <Link href="/chats" className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1 text-sm">
        <ArrowLeft className="size-4" />
        Nova consulta
      </Link>

      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>{initials(userName)}</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>{question}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>

      {/* key faz o Suspense recarregar ao trocar de pergunta */}
      <Suspense
        key={question}
        fallback={
          <Marker role="status">
            <MarkerContent className="shimmer">Analisando seus dados...</MarkerContent>
          </Marker>
        }
      >
        <AnswerBlock question={question} />
      </Suspense>

      <Form action="/chats/nova" className="flex gap-2 border-t pt-4">
        <Input name="q" required minLength={3} maxLength={500} placeholder="Faça outra pergunta..." aria-label="Nova pergunta" />
        <Button type="submit">Analisar</Button>
      </Form>
    </div>
  );
}
