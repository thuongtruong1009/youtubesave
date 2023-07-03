import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default function (fastify: FastifyInstance) {
  fastify.get(
    "/",
    async (
      request: FastifyRequest,
      reply: FastifyReply & { sendFile: (arg0: string) => void }
    ) => {
      reply.header("Content-Type", "application/json").code(200);
      reply.sendFile("index.html");
    }
  );
}
