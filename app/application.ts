import { Server, IncomingMessage, ServerResponse } from "http";
import fastify, { FastifyInstance } from "fastify";
import registerMiddleware from "../middlewares";
import path from "node:path";
import * as fs from "node:fs";
import { EnvConf } from "../configs/env";
import { loggerFormat } from "../configs/logger";
import routes from "../routes";

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> | any =
  fastify({
    http2: true,
    https: {
      allowHTTP1: true,
      key: fs.readFileSync(path.join(__dirname, "../ssl/key.pem"), "utf8"),
      cert: fs.readFileSync(path.join(__dirname, "../ssl/cert.pem")),
      passphrase: EnvConf.PASSPHRASE,
    },
    logger: loggerFormat[EnvConf.NODE_ENV] ?? true,
  });

export default function application() {
  registerMiddleware(server);
  routes(server);

  return server;
}
