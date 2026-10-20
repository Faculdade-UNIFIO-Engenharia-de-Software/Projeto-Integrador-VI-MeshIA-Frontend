import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode; // ações (botões)
};

export function ErrorState({ icon, title, description, children }: Props) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-7">{icon}</div>
      <div className="flex max-w-md flex-col gap-1">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children && <div className="flex flex-wrap items-center justify-center gap-2">{children}</div>}
    </section>
  );
}
