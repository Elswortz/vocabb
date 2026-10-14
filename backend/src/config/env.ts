import "dotenv/config";

const getEnv = (key: string): string => {
  const value = process.env[key];

  if (!value || !value.trim()) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

const getPort = (): number => {
  const value = process.env.PORT ?? "3000";
  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  return port;
};

export const env = {
  port: getPort(),
  supabaseUrl: getEnv("SUPABASE_URL"),
  supabaseKey: getEnv("SUPABASE_KEY"),
  supabaseServiceRoleKey: getEnv("SUPABASE_SERVICE_ROLE_KEY"),
};
