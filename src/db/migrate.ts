import * as path from "path";
import { Pool } from "pg";
import { promises as fs } from "fs";
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from "kysely";
import { Database } from "./database";
import minimist from "minimist";

async function migrateToLatest() {
  const db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: "127.0.0.1",
        database: "test",
        user: "test",
        password: "test",
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, "/migrations"),
    }),
  });

  const args = minimist(process.argv) as unknown as {
    type?: "latest" | "down";
  };

  if (!args.type) {
    throw new Error("Specify migration type");
  }
  if (!["latest", "down"].includes(args.type)) {
    throw new Error("Incorrect migration type");
  }

  if (args.type === "latest") {
    const { error, results } = await migrator.migrateToLatest();

    results?.forEach((it) => {
      if (it.status === "Success") {
        console.log(
          `migration "${it.migrationName}" was executed successfully`
        );
      } else if (it.status === "Error") {
        console.error(`failed to execute migration "${it.migrationName}"`);
      }
    });

    if (error) {
      console.error("failed to migrate");
      console.error(error);
      process.exit(1);
    }

    await db.destroy();
  }
  if (args.type === "down") {
    const { error, results } = await migrator.migrateDown();

    results?.forEach((it) => {
      if (it.status === "Success") {
        console.log(
          `migration "${it.migrationName}" was removed successfully`
        );
      } else if (it.status === "Error") {
        console.error(`failed to remove migration "${it.migrationName}"`);
      }
    });

    if (error) {
      console.error("failed to migrate");
      console.error(error);
      process.exit(1);
    }

    await db.destroy();
  }
}

migrateToLatest();
