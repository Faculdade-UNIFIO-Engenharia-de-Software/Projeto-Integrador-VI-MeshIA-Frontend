'use client'

import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import NavMain from "./NavMain";
import TeamSwitcher from "./TeamSwitcher";
import NavUser from "./NavUser";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher  />
      </SidebarHeader>
      <SidebarContent>
        <NavMain  />
      </SidebarContent>
      <SidebarFooter>
        <NavUser  />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
