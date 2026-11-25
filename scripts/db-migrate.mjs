import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { executeSqlFile, listSqlFiles, sql } from "./db-utils.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const migrationsDirectory = resolve(scriptDirectory, "../db/migrations");

await sql.query(`
  CREATE TABLE IF NOT EXISTS schema_migrations (
    name text PRIMARY KEY,
    applied_at timestamptz NOT NULL DEFAULT now()
  )
`);

for (const migrationPath of await listSqlFiles(migrationsDirectory)) {
  const name = basename(migrationPath);
  const applied = await sql.query(
    "SELECT 1 FROM schema_migrations WHERE name = $1 LIMIT 1",
    [name],
  );

  if (applied.length > 0) {
    console.log(`Skipping applied migration ${name}`);
    continue;
  }

  await executeSqlFile(migrationPath);
  await sql.query("INSERT INTO schema_migrations (name) VALUES ($1)", [name]);
  console.log(`Applied migration ${name}`);
}
