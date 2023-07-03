import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyPluginOptions,
} from "fastify";

export const loggerPlugin: FastifyPluginCallback = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: () => void
) => {
  fastify.addHook("onRequest", (req, res, done) => {
    fastify.log.info(`${req.method} ${req.url}`);
    done();
  });
  next();
};
