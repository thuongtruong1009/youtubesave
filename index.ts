import { EnvConf } from "./configs/env";
import application from "./app/application";

const server = application();

const startServer = async () => {
  try {
    await server.listen({
      port: EnvConf.APP_PORT,
      host: EnvConf.APP_HOST,
    });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

startServer();
