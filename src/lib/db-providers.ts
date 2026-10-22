export const PROVIDERS = [
  { value: "PostgreSQL", label: "PostgreSQL", port: 5432 },
  { value: "MySQL", label: "MySQL", port: 3306 },
  { value: "Snowflake", label: "Snowflake", port: 443 },
  { value: "Google BigQuery", label: "Google BigQuery", port: 443 },
] as const;

export const PROVIDER_VALUES = PROVIDERS.map((p) => p.value) as [(typeof PROVIDERS)[number]["value"], ...(typeof PROVIDERS)[number]["value"][]];
