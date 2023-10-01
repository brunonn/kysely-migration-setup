import { Kysely, PostgresDialect } from "kysely";
import { build } from "./src/app";
import { Pool } from "pg";
import type { Database } from "./src/db/database";

async function run() {
  const dialect = new PostgresDialect({
    pool: new Pool({
      database: "test",
      host: "localhost",
      user: "test",
      password: "test",
      port: 5432,
      max: 10,
    }),
  });
  const db = new Kysely<Database>({
    dialect,
  });
  const server = build(db);

  try {
    await server.listen({ port: 8081 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

run();
