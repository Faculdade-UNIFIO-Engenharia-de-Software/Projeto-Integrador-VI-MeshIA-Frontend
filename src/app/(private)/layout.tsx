import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/(private)/_components/app-sidebar"
import { ModeToggle } from "@/services/providers/next-theme-provider/theme-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col flex-1 gap-2 p-2">
        <div className="flex m-2 justify-between">
          <SidebarTrigger className="w-8 h-8"/>
          <ModeToggle/>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
