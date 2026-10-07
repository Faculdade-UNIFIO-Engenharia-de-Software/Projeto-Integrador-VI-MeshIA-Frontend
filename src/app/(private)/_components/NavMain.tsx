'use client'

import { ChevronRight,House, type LucideIcon } from "lucide-react"
import { Collapsible,CollapsibleContent,CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"


export default function NavMain(
  {items,}: {
    items: {
      title: string,
      url: string,
      icon?: LucideIcon,
      isActive?: boolean,
      items?: {
        title: string,
        url: string
        }[]
      }[]
  })
{
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recursos</SidebarGroupLabel>

      
      <SidebarMenu>
        
        <SidebarMenuItem>
          <SidebarMenuButton
            render={
              <Link href="/">
                <House />
                <span>Home</span>
              </Link>
            }/>
        </SidebarMenuItem>

        
            {items.map((item) => (
              <Collapsible
                key={item.title}
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                      </SidebarMenuButton>}
                  />
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton href={subItem.url}>
                              <span>{subItem.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

  )
}
