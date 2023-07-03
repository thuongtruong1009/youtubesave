import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { opts } from "../schemas/response";

export default function (fastify: FastifyInstance) {
  fastify.get(
    "/test",
    opts,
    async (
      request: FastifyRequest,
      reply: FastifyReply & { sendFile: (arg0: string) => void }
    ) => {
      reply.header("Content-Type", "application/json").code(200);
      reply.send({ hello: "world" });
    }
  );
}
