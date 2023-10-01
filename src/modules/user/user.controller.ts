import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Db } from "../../db/database";

async function getAllUser(req: FastifyRequest, reply: FastifyReply, db: Db) {
  const query = db.selectFrom("users").select(["id", "first_name"]);
  const data = await query.execute();
  return data;
}

async function getUserById(req: FastifyRequest, reply: FastifyReply, db: Db) {
  const id = (req.params as any).id as string;
  const query = db
    .selectFrom("users")
    .select(["id", "first_name"])
    .where("id", "=", id);
  const data = await query.execute();
  return data;
}

async function addNewUser(req: FastifyRequest, reply: FastifyReply, db: Db) {
  const query = db.insertInto("users").values({ first_name: "hello" });
  const data = await query.execute();
  return data;
}
export function attach(instance: FastifyInstance, db: Db) {
  instance.get("/api/users", (req, reply) => getAllUser(req, reply, db));
  instance.get("/api/users/:id", (req, reply) => getUserById(req, reply, db));
  instance.get("/api/users/add", (req, reply) => addNewUser(req, reply, db));
}
