import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/(private)/_components/app-sidebar"
import { ModeToggle } from "@/services/providers/next-theme-provider/theme-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col flex-1 gap-2 p-2">
        <div className="flex flex-1 m-2 justify-between">
          <SidebarTrigger className="w-10 h-10 "/>
          <ModeToggle/>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
