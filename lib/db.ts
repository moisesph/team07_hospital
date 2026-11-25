import "server-only";

import { neon } from "@neondatabase/serverless";

interface DatabaseClient {
  query<Row = Record<string, unknown>>(
    statement: string,
    parameters?: unknown[],
  ): Promise<Row[]>;
}

let client: DatabaseClient | undefined;

export function getDb(): DatabaseClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is required. Configure it in your local environment or Vercel project settings.",
    );
  }

  if (!client) {
    const neonClient = neon(connectionString);
    client = {
      async query<Row>(
        statement: string,
        parameters?: unknown[],
      ): Promise<Row[]> {
        return (await neonClient.query(statement, parameters)) as Row[];
      },
    };
    return client;
  }

  return client;
}
