'use client'

import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import TeamSwitcher from "./TeamSwitcher";
import { NavUser } from "./NavUser";
import { sidebarModules, sidebarTeams,sidebarUser } from "./modules-sidebar";
import NavMain from "./NavMain";

const { teams } = sidebarTeams
const { user } = sidebarUser
const {navMain} = sidebarModules

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams}/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
