"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center p-2 dark:hover:bg-sidebar-accent hover:bg-gray-100 rounded-md border dark:border-gray-500 border-gray-300" >
          <Sun className="h-4 w-4 scale-100 transition-all dark:hidden" />
          <Moon className="h-4 w-4 hidden transition-all dark:block"/>
          <span className="sr-only">Alternar tema</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={()=> setTheme("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=> setTheme("dark")}>
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=> setTheme("system")}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
