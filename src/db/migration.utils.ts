import { CreateTableBuilder, sql } from "kysely";

export function addDefaultColumns<TB extends string, C extends string>(
  query: CreateTableBuilder<TB, C>
) {
  return query
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("deleted_at", "timestamp")
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    );
}

export function createUpdateTrigger(tableName: string) {
  const updateQ = sql`
    CREATE TRIGGER ${sql.raw(tableName)}_updated_at
    BEFORE UPDATE ON ${sql.raw(tableName)}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();`;
  return updateQ;
}
