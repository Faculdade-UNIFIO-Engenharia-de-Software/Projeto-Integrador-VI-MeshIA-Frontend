// === Icones ===
import { Settings, ChartNetwork, BuildingComplex, Grid2X2, House, BotMessageSquare, Database, Users, History } from "lucide-react";

export const sidebarModules = {
  navMain: [
    // ===== Menu da V1 (segue o Figma) =====
    { title: "Home", url: "/", icon: House },
    { title: "Chat / Consultas", url: "/chats", icon: BotMessageSquare },
    { title: "Bases de Dados", url: "/data-catalog", icon: Database },
    { title: "Usuários & Equipes", url: "/users", icon: Users },
    { title: "Histórico de Análises", url: "/history", icon: History, hidden: true }, // a rota ainda não existe
    { title: "Configurações", url: "/profile", icon: Settings },

    // ===== Menu antigo: guardado e escondido (fora da V1) =====
    {
      title: "Analytics",
      url: "#",
      icon: ChartNetwork,
      isActive: true,
      hidden: true,
      items: [
        {
          title: "Dashboards",
          url: "/dashboards",
          isActive: true,
        },
        {
          title: "ChatIA",
          url: "/chats",
          isActive: true,
        },
        {
          title: "Catálogo de Dados",
          url: "/data-catalog",
          isActive: true,
        },
      ],
    },
    {
      title: "Engenharia de Dados",
      url: "#",
      icon: Grid2X2,
      isActive: false,
      hidden: true,
      items: [
        {
          title: "Fontes",
          url: "#",
          isActive: true,
        },
        {
          title: "Pipelines",
          url: "#",
          isActive: true,
        },
        {
          title: "Jobs",
          url: "#",
          isActive: true,
        },
        {
          title: "Linhagem",
          url: "#",
          isActive: true,
        },
      ],
    },
    {
      title: "Configurações (antigo)",
      url: "#",
      icon: Settings,
      isActive: false,
      hidden: true,
      items: [
        {
          title: "Usuários",
          url: "/users",
          isActive: true,
        },
        {
          title: "Times",
          url: "/squads",
          isActive: true,
        },
        {
          title: "Agentes e Limites",
          url: "#",
          isActive: true,
        },
        {
          title: "Faturamento",
          url: "/billing",
          isActive: true,
        },
      ],
    },
  ],
};

export const sidebarUser = {
  user: {
    name: "Lucas",
    email: "lucasadriano@email.com",
    avatar: "/lucas-avatar.png",
  },
};

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
  ],
};
