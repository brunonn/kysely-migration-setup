import { Kysely, sql } from "kysely";
const ON_UPDATE_TIMESTAMP_FUNCTION = sql`
  CREATE OR REPLACE FUNCTION on_update_timestamp()
  RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
$$ language 'plpgsql';
`;

const DROP_ON_UPDATE_TIMESTAMP_FUNCTION = sql`DROP FUNCTION on_update_timestamp`;

const extension = sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

export async function up(db: Kysely<any>): Promise<void> {
  await extension.execute(db);

  await ON_UPDATE_TIMESTAMP_FUNCTION.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await DROP_ON_UPDATE_TIMESTAMP_FUNCTION.execute(db);
}
