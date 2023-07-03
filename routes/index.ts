import { FastifyInstance } from "fastify";
import defaultRoute from "./default";
import homeRoute from "./home";
import videoInfoRoute from "./info";
import downloadRoute from "./download";

export default function routes(fastify: FastifyInstance) {
  defaultRoute(fastify);
  homeRoute(fastify);
  videoInfoRoute(fastify);
  downloadRoute(fastify);
}
