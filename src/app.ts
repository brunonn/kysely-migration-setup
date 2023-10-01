import fastify from "fastify";
import { Kysely } from "kysely";
import { Database } from "./db/database";
import { attach } from "./modules/user/user.controller";
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
export function build(db: Kysely<Database>) {
  const app = fastify({ logger: true });

  attach(app, db);

  return app;
}
