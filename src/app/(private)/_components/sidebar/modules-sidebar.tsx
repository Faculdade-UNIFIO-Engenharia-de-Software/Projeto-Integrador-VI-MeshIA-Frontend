// === Icones ===
import { Settings, ChartNetwork, BuildingComplex } from "lucide-react";

export const sidebarModules = {
  navMain: [
    {
      title: "Analytics",
      url: "#",
      icon: ChartNetwork,
      isActive: true,
      items: [
        { title: "Chat / Consultas", url: "/chats" },
        { title: "Histórico de Análises", url: "/history" },
        { title: "Bases de Dados", url: "/data-catalog" },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings,
      isActive: true,
      items: [
        { title: "Usuários & Equipes", url: "/users" },
        { title: "Squads", url: "/squads" },
        { title: "Perfil", url: "/profile" },
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
    { name: "MeshIA", logo: BuildingComplex, plan: "Premium" },
    { name: "Empresa 2", logo: BuildingComplex, plan: "Premium" },
    { name: "Empresa 3", logo: BuildingComplex, plan: "Premium" },
  ],
};
