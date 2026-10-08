import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/(private)/_components/sidebar/app-sidebar"
import { ModeToggle } from "@/services/providers/next-theme-provider/theme-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider >
      <AppSidebar />
        
      <SidebarInset>
      <main className="flex flex-col gap-6 p-6 flex-1 ">
        <div className="flex justify-between">
          <SidebarTrigger className="w-8 h-8"/>
          <ModeToggle/>
        </div>
        {children}
      </main>
      </SidebarInset>
        
    </SidebarProvider>
  )
}
