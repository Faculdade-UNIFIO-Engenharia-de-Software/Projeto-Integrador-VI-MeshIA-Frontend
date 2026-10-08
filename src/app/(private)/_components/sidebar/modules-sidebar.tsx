// === Icones ===
import { Settings, ChartNetwork, BuildingComplex } from "lucide-react"


export const sidebarModules = {
  navMain: [
    {
      title: "Analytics",
      url: "#",
      icon: ChartNetwork,
      isActive: true,
      items: [
        {
          title: "Dashboards",
          url:"/dashboards",
          isActive:true
        },
        {
          title: "ChatIA",
          url:"/chats",
          isActive:true
        },
        {
          title: "Catálogo de Dados",
          url:"/data-catalog",
          isActive:true
        },
      ]
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings,
      isActive: false,
      items: [
        {
          title: "Usuários",
          url:"/users",
          isActive:true
        },
        {
          title: "Times",
          url:"/squads",
          isActive:true
        },
        {
          title: "Agentes e Limites",
          url:"#",
          isActive:true
        },
        {
          title: "Faturamento",
          url: "/billing",
          isActive:true
        },
      ]
    }
  ]
}

export const sidebarUser = {
  user: {
    name: "Lucas",
    email: "lucasadriano@email.com",
    avatar:"/lucas-avatar.png"
  }
}

export const sidebarTeams = {
  teams: [
    {
      name: "MeshIA",
      logo: BuildingComplex,
      plan: "Premium",
    },
    {
      name: "Webby Internet",
      logo: BuildingComplex,
      plan: "Premium",
    },
    {
      name: "Alares Internet",
      logo: BuildingComplex,
      plan: "Premium",
    },
  ]
}
