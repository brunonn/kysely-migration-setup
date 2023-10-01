import {
  ColumnType,
  Generated,
  Insertable,
  Kysely,
  Selectable,
  Updateable,
} from "kysely";
// import { DB } from "kysely-codegen";

interface BaseTable {
  id: Generated<string>;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
  deleted_at: ColumnType<Date | null, string | undefined, Date>;
}

export interface UsersTable extends BaseTable {
  first_name: string | null;
}

// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
export type User = Selectable<UsersTable>;
export type UserNew = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;

export type Database = {
  users: UsersTable;
};

export type Db = Kysely<Database>;
