export type TTokenDashboard = {
  value: string
  expiresAt: string
}

export type TDashboard = {
  workspace: string
  uuid: string
  dashboard: string
  embedded: string
  token: TTokenDashboard
  title: string
  description: string
}

export type TDashboards = TDashboard[]

export const dashboads: TDashboards = [
  {
    workspace: "Financeiro",
    uuid: "1",
    dashboard: "",
    embedded: "",
    token: {
      value: "",
      expiresAt: "",
    },
    title: "",
    description: "",
  },
  {
    workspace: "Faturamento",
    uuid: "2",
    dashboard: "",
    embedded: "",
    token: {
      value: "",
      expiresAt: "",
    },
    title: "",
    description: "",
  },
  {
    workspace: "Comercial",
    uuid: "3",
    dashboard: "",
    embedded: "",
    token: {
      value: "",
      expiresAt: "",
    },
    title: "",
    description: "",
  },
  {
    workspace: "Diretoria",
    uuid: "4",
    dashboard: "",
    embedded: "",
    token: {
      value: "",
      expiresAt: "",
    },
    title: "",
    description: "",
  },
]
