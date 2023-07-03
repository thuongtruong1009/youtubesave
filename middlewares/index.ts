import { FastifyInstance } from "fastify";
import path from "node:path";
import fastifyStatic from "@fastify/static";
import { loggerPlugin } from "./logger";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";

export default async function registerMiddleware(fastify: FastifyInstance) {
  fastify.register(cors, (instance: any) => {
    return (
      req: { headers: { origin: string } },
      callback: (arg0: null, arg1: { origin: boolean }) => void
    ) => {
      const corsOptions = {
        origin: true,
      };

      // do not include CORS headers for requests from localhost
      if (/^localhost$/m.test(req.headers.origin)) {
        corsOptions.origin = false;
      }

      callback(null, corsOptions);
    };
  });

  fastify.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  fastify.register(loggerPlugin);

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../public"),
  });
}
