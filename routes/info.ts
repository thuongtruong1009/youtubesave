import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ytdl from "ytdl-core";

export default function (fastify: FastifyInstance) {
  fastify.get(
    "/videoInfo",
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.header("Content-Type", "application/json").code(200);
      const query = request.query as any;
      const info = await ytdl.getInfo(query.videoURL as string);
      reply.send(info);
    }
  );
}
