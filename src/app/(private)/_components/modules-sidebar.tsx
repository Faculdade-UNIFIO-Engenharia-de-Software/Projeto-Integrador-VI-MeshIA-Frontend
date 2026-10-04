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
          url:"#",
          isActive:true
        },
        {
          title: "ChatIA",
          url:"#",
          isActive:true
        },
        {
          title: "Catálogo de Dados",
          url:"#",
          isActive:true
        },
      ]
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings,
      isActive: true,
      items: [
        {
          title: "Usuários",
          url:"#",
          isActive:true
        },
        {
          title: "Times",
          url:"#",
          isActive:true
        },
        {
          title: "Agentes e Limites",
          url:"#",
          isActive:true
        },
        {
          title: "Faturamento",
          url: "#",
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
