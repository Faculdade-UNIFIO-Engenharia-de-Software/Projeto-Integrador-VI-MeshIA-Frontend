export type Role = "admin" | "senior_analyst" | "junior_analyst" | "viewer";

// Textos provisórios: alinhar com os perfis reais do RBAC (CASL) do back-end.
export const ROLES: { value: Role; label: string; description: string }[] = [
  {
    value: "admin",
    label: "Administrador",
    description: "Gerencia usuários, perfis e configurações da plataforma.",
  },
  {
    value: "senior_analyst",
    label: "Analista Sênior",
    description: "Consulta o conhecimento corporativo em todas as fontes permitidas.",
  },
  {
    value: "junior_analyst",
    label: "Analista Júnior",
    description: "Consulta o conhecimento com acesso mais restrito.",
  },
  {
    value: "viewer",
    label: "Visualizador",
    description: "Apenas leitura de conversas e resumos.",
  },
];

export const findRole = (role: Role) => ROLES.find((r) => r.value === role);
