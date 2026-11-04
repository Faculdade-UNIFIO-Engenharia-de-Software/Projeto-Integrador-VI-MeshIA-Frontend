import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(private)/_components/sidebar/app-sidebar";
import { ModeToggle } from "@/services/providers/next-theme-provider/theme-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border/50 bg-background/70 px-6 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="size-9" />
          <ModeToggle />
        </header>

        <div className="flex flex-1 flex-col p-6 md:p-10">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
