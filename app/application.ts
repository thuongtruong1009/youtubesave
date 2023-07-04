import { Server, IncomingMessage, ServerResponse } from "http";
import fastify, { FastifyInstance } from "fastify";
import registerMiddleware from "../middlewares";
import path from "node:path";
import * as fs from "node:fs";
import { EnvConf } from "../configs/env";
import { loggerFormat } from "../configs/logger";
import routes from "../routes";
import crypto from "node:crypto";

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> | any =
  fastify({
    http2: true,
    https: {
      allowHTTP1: true,
      // key: fs.readFileSync(path.join(__dirname, "../private.pem"), "utf8"),
      // cert: fs.readFileSync(path.join(__dirname, "../public.pem")),
      // passphrase: EnvConf.PASSPHRASE,

      key: fs.readFileSync(path.join(__dirname, "..", "private.key")),
      cert: fs.readFileSync(path.join(__dirname, "..", "certificate.crt")),
    },
    logger: loggerFormat[EnvConf.NODE_ENV] ?? true,
  });

export default function application() {
  registerMiddleware(server);
  routes(server);

  return server;
}
