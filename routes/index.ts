import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.get("/ping", () => {
    return "Pong";
  });
}
