import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ytdl from "ytdl-core";

export default function (fastify: FastifyInstance) {
  fastify.get(
    "/download",
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.header("Content-Type", "application/json").code(200);
      const query = request.query as unknown as {
        videoURL: string;
        itag: number;
        format: string;
      };
      const videoURL = query.videoURL;
      const itag = query.itag;
      const format = query.format;

      reply.header(
        "Content-Disposition",
        `attachment; filename="video.${format}"`
      );

      ytdl(videoURL, {
        filter: (format) => format.itag === itag,
      }).pipe(reply.raw);

      reply.send({ message: "Hello World" });
    }
  );
}
