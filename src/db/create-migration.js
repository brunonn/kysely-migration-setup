const minimist = require("minimist");
const fs = require("fs");

function createMigration() {
  const args = minimist(process.argv.slice(2));

  if (typeof args.name !== "string") {
    throw new Error("Required name, pass --name=your-migration-name to script");
  }

  const fullPath =
    __dirname +
    "/migrations/" +
    new Date().getTime() +
    "-" +
    args.name +
    ".ts";
  const data = `
  import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {



}

export async function down(db: Kysely<any>): Promise<void> {
 
}


  `;
  fs.writeFileSync(fullPath, data);
}

createMigration();
