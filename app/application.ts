import { Server, IncomingMessage, ServerResponse } from "http";
import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import registerMiddleware from "../plugins/register";
import path from "node:path";
import * as fs from "node:fs";
import { EnvConf } from "../configs/env";
import { opts } from "../schemas/response";
import { loggerFormat } from "../configs/logger";

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> | any =
  fastify({
    http2: true,
    https: {
      key: fs.readFileSync(path.join(__dirname, "../ssl/key.pem"), "utf8"),
      cert: fs.readFileSync(path.join(__dirname, "../ssl/cert.pem")),
      passphrase: EnvConf.PASSPHRASE,
    },
    logger: loggerFormat[EnvConf.NODE_ENV] ?? true,
  });

export default function application() {
  registerMiddleware(server);

  server.get(
    "/",
    // opts,
    async (
      request: FastifyRequest,
      reply: FastifyReply & { sendFile: (arg0: string) => void }
    ) => {
      reply.header("Content-Type", "application/json").code(200);
      // reply.send({ hello: "world" });
      reply.sendFile("index.html");
    }
  );

  return server;
}
