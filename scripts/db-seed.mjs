import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { executeSqlFile } from "./db-utils.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const seedPath = resolve(scriptDirectory, "../db/seeds/001_synthetic_data.sql");

await executeSqlFile(seedPath);
console.log("Synthetic development records are seeded.");
