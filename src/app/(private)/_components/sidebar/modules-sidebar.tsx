// === Icones ===
import { Settings, ChartNetwork, BuildingComplex, Grid2X2} from "lucide-react"


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
      title: "Engenharia de Dados",
      url: "#",
      icon: Grid2X2,
      isActive: false,
      items: [
        {
          title: "Fontes",
          url:"#",
          isActive:true
        },
        {
          title: "Pipelines",
          url:"#",
          isActive:true
        },
        {
          title: "Jobs",
          url:"#",
          isActive:true
        },
        {
          title: "Linhagem",
          url:"#",
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
