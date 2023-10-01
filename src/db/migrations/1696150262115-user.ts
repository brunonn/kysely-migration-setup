import { Kysely } from "kysely";
import { addDefaultColumns, createUpdateTrigger } from "../migration.utils";

export async function up(db: Kysely<any>): Promise<void> {
  let query = db.schema.createTable("users");
  query = addDefaultColumns(query);

  query = query.addColumn("first_name", "varchar(127)");

  const trigger = createUpdateTrigger("users");
  await query.execute();
  await trigger.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  const query = db.schema.dropTable("users");
  await query.execute();
}
